import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { FOURSQUARE_API_KEY, OPENWEATHER_API_KEY } from '@env';

const { width } = Dimensions.get('window');

const DetailsScreen = ({ route }) => {
  const { selectedLocation } = route.params;
  const [resorts, setResorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  useEffect(() => {
    fetchNearbyResorts();
    fetchWeather();
  }, []);

  const fetchNearbyResorts = async () => {
    try {
      const response = await fetch(
        `https://api.foursquare.com/v3/places/search?query=resort&ll=${selectedLocation.geocodes.main.latitude},${selectedLocation.geocodes.main.longitude}&radius=5000&limit=5&sort=DISTANCE`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: FOURSQUARE_API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResorts(data.results || []);
    } catch (err) {
      setError('Error fetching resorts. Please try again.');
      console.error('Foursquare API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async () => {
    try {
      if (!selectedLocation?.geocodes?.main?.latitude || !selectedLocation?.geocodes?.main?.longitude) {
        throw new Error('Invalid location coordinates');
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${selectedLocation.geocodes.main.latitude}&lon=${selectedLocation.geocodes.main.longitude}&units=metric&appid=${OPENWEATHER_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`Weather data fetch failed: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.list) {
        throw new Error('Weather data is not in the expected format');
      }

      setWeather(data.list.slice(0, 7)); // 7-day forecast
    } catch (err) {
      console.error('OpenWeather API Error:', err.message);
    } finally {
      setWeatherLoading(false);
    }
  };  

  const WeatherForecast = () => {
    if (weatherLoading) {
      return <ActivityIndicator size="large" color="#4A90E2" />;
    }

    if (!weather || weather.length === 0) {
      return <Text style={styles.error}>Weather data unavailable</Text>;
    }

    return (
      <View style={styles.weatherSection}>
        <Text style={styles.sectionTitle}>7-Day Weather Forecast</Text>
        {weather.map((day, index) => (
          <View key={index} style={styles.weatherCard}>
            <Text style={styles.weatherDate}>
              {new Date(day.dt * 1000).toLocaleDateString()}
            </Text>
            <Text style={styles.weatherTemp}>
              Temp: {day.main.temp.toFixed(1)}°C
            </Text>
            <Text style={styles.weatherDesc}>{day.weather[0].description}</Text>
          </View>
        ))}
      </View>
    );
  };

  const LocationHeader = () => (
    <View style={styles.locationHeader}>
      <Text style={styles.locationName}>{selectedLocation.name}</Text>
      <Text style={styles.locationAddress}>
        {selectedLocation.location?.formatted_address}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <LocationHeader />

      <View style={styles.mapContainer}>
        <Text style={styles.sectionTitle}>Location Map</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: selectedLocation.geocodes.main.latitude,
            longitude: selectedLocation.geocodes.main.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: selectedLocation.geocodes.main.latitude,
              longitude: selectedLocation.geocodes.main.longitude,
            }}
            title={selectedLocation.name}
          />
        </MapView>
      </View>

      <WeatherForecast />

      <View style={styles.resortsSection}>
        <Text style={styles.sectionTitle}>Nearby Resorts</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#4A90E2" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : resorts.length === 0 ? (
          <Text style={styles.noResults}>No resorts found nearby</Text>
        ) : (
          <View style={styles.resortsList}>
            {resorts.map(resort => (
              <TouchableOpacity
                key={resort.fsq_id}
                style={styles.resortCard}
                onPress={() => {}}
              >
                <Text style={styles.resortName}>{resort.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  locationHeader: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  locationName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  locationAddress: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  mapContainer: {
    margin: 20,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    height: 300, 
  },
  map: {
    width: '100%',
    height: '100%', 
  },
  weatherSection: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
  },
  weatherCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  weatherDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  weatherTemp: {
    fontSize: 14,
  },
  weatherDesc: {
    fontSize: 12,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  error: {
    color: 'red',
    fontSize: 14,
  },
  noResults: {
    fontSize: 16,
    color: '#666',
  },
  resortsList: {
    gap: 15,
  },
  resortCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
});

export default DetailsScreen;
