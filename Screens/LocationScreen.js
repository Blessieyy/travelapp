import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';
import LocationSearch from './LocationSearch';

const LocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  const requestLocationPermissions = async () => {
    try {
      if (Platform.OS === 'web') {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            },
            (error) => {
              console.error('Error getting location:', error);
              // Set default location (e.g., New York City)
              setLocation({
                latitude: 40.7128,
                longitude: -74.0060,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            }
          );
        }
      } else {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const currentLocation = await Location.getCurrentPositionAsync({});
          setLocation({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const handleLocationSelect = (selectedPlace) => {
    const newLocation = {
      latitude: selectedPlace.geocodes.main.latitude,
      longitude: selectedPlace.geocodes.main.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    setSelectedLocation({
      ...newLocation,
      title: selectedPlace.name,
      description: selectedPlace.location?.formatted_address,
    });

    // Update map center for web
    if (window.map) {
      window.map.setCenter({
        lat: newLocation.latitude,
        lng: newLocation.longitude
      });
      
      // Update or create marker
      if (window.marker) {
        window.marker.setMap(null);
      }
      window.marker = new window.google.maps.Marker({
        position: { lat: newLocation.latitude, lng: newLocation.longitude },
        map: window.map,
        title: selectedPlace.name
      });
    }
  };

  useEffect(() => {
    if (Platform.OS === 'web') {
      const loadMap = () => {
        window.map = new window.google.maps.Map(document.getElementById('map'), {
          center: { lat: location?.latitude || 40.7128, lng: location?.longitude || -74.0060 },
          zoom: 12,
        });
      };

      
      if (location && window.google) {
        loadMap();
      }
    }
  }, [location]);

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <LocationSearch onLocationSelect={handleLocationSelect} />
        </View>
        <div id="map" style={{ width: '100%', height: '100vh' }} />
      </View>
    );
  }

  // Return original native implementation
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <LocationSearch onLocationSelect={handleLocationSelect} />
      </View>
      
      {location && (
        <MapView
          ref={(ref) => setMapRef(ref)}
          style={styles.map}
          initialRegion={location}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {selectedLocation && (
            <Marker
              coordinate={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
              }}
              title={selectedLocation.title}
              description={selectedLocation.description}
            />
          )}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default LocationScreen;