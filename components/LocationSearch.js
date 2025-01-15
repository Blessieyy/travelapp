import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { FOURSQUARE_API_KEY } from '@env';

const LocationSearch = ({ onLocationSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchLocations = async (query) => {
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.foursquare.com/v3/places/search?query=${encodeURIComponent(query)}&limit=50`,
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
      setSearchResults(data.results || []);
    } catch (err) {
      setError('Error fetching locations. Please try again.');
      console.error('Foursquare API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const timeoutId = setTimeout(() => {
      searchLocations(text);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a destination anywhere in the world..."
        value={searchQuery}
        onChangeText={handleSearch}
        placeholderTextColor="#666"
      />

      {loading && (
        <ActivityIndicator style={styles.loader} size="small" color="#4A90E2" />
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      {searchResults.length > 0 && (
        <FlatList
          style={styles.resultsList}
          data={searchResults}
          keyExtractor={(item) => item.fsq_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => onLocationSelect(item)}
            >
              <Text style={styles.locationName}>{item.name}</Text>
              <Text style={styles.locationAddress}>
                {item.location?.formatted_address || 'No address available'}
              </Text>
              <Text style={styles.locationCategory}>
                {item.categories?.[0]?.name || 'No category available'}
              </Text>
              {item.description && (
                <Text style={styles.locationDescription}>
                  {item.description}
                </Text>
              )}
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  resultsList: {
    maxHeight: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: 10,
  },
  resultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  locationCategory: {
    fontSize: 14,
    color: '#4A90E2',
    marginTop: 5,
  },
  locationDescription: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  loader: {
    marginTop: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default LocationSearch;
