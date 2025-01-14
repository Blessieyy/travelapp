import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LocationSearch from '../components/LocationSearch';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLocationSelect = (location) => {
    navigation.navigate('Details', {
      selectedLocation: location
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Find your perfect destination</Text>
      </View>
      <LocationSearch onLocationSelect={handleLocationSelect} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
});

export default HomeScreen;