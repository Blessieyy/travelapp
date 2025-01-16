import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView } from 'react-native';
import LocationSearch from '../Components/LocationSearch';

// Sample data with images for places
const places = [
  { name: 'Gauteng', image: require('../assets/Images/pine.jpg') },
  { name: 'North West', image: require('../assets/Images/kingdom.jpg') },
  { name: 'Western Cape', image: require('../assets/Images/tula.jpg') },
  { name: 'Kwa-Zulu Natal', image: require('../assets/Images/nambiti-plains-private.jpg') },
];

const recommendations = [
  {
    name: 'The Kingdom Resort',
    location: 'Pilanesberg National Park, North West',
    image: require('../assets/Images/motozi.jpg'),
  },
];

const hotels = [
  { name: 'Pine Valley', location: 'Elandsdrift Rd, Gauteng', image: require('../assets/Images/pine.jpg') },
  { name: 'Emerald Resort & Casino', location: 'Vanderbijlpark, Gauteng', image: require('../assets/Images/emerald.jpg') },
];

const LandingPage = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <LocationSearch />
        

        {/* Places Section */}
        <Text style={styles.heading}>Places</Text>
        <FlatList
          data={places}
          horizontal // Enable horizontal scrolling
          renderItem={({ item }) => (
            <View style={styles.placeItem}>
              <Image source={item.image} style={styles.placeImage} />
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false} // Optional: hide scroll bar
        />

        {/* Recommendations Section */}
        <Text style={styles.heading}>Recommendations</Text>
        <FlatList
          data={recommendations}
          horizontal // Enable horizontal scrolling
          renderItem={({ item }) => (
            <View style={styles.recommendationItem}>
              <Image source={item.image} style={styles.image} />
              <View>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemSubText}>{item.location}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
        />

        {/* Nearby Hotels Section */}
        <Text style={styles.heading}>Nearby Hotels</Text>
        <FlatList
          data={hotels}
          horizontal // Enable horizontal scrolling
          renderItem={({ item }) => (
            <View style={styles.recommendationItem}>
              <Image source={item.image} style={styles.image} />
              <View>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemSubText}>{item.location}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#EAE3D7',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  placeItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  placeImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginBottom: 5,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemSubText: {
    fontSize: 14,
    color: '#666',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
});

export default LandingPage;
