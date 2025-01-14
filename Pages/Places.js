
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';


const landmarks = [
  {
    name: 'Pine Valley Resort',
    location: 'Gauteng',
    image: require('../assets/Images/pine.jpg'),
  },
  {
    name: 'The Kingdom Resort',
    location: 'North West',
    image: require('../assets/Images/kingdom.jpg'),
  },
  {
    name: 'Namibiti Plains Private Game Lodge',
    location: 'Kwa-Zulu Natal',
    image: require('../assets/Images/nambiti-plains-private.jpg'),
  },
  {
    name: 'Emerald Resort & Casino',
    location: 'Gauteng',
    image: require('../assets/Images/emerald.jpg'),
  },
  {
    name: 'Tula Game Reserve',
    location: 'Western Cape',
    image: require('../assets/Images/tula.jpg'),
  },
];

const App = () => {
    navigation = useNavigation()
    const handleBackPress = () => {
        navigation.navigate('landingPage');
    }
  return (
    <ScrollView>
    <View style={styles.container}>
    <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
      <Text style={styles.back}>Back</Text>
    </TouchableOpacity>
      <Text style={styles.heading}>Select Place</Text>
      <FlatList
        data={landmarks}
        renderItem={({ item }) => (
          <View style={styles.landmarkItem}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.location}>{item.location}</Text>
              <Text style={styles.rating}>Rating: {item.rating} - Reviews: {item.reviews}</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Select Room</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
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

  backButton: {
    marginTop: 5,
    backgroundColor: '#876631',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

    back: {
      
            color: '#fff',
            fontSize: 14,
            alignSelf: 'center',
     
    },
  
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  landmarkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  rating: {
    fontSize: 14,
    color: '#999',
  },
  button: {
    marginTop: 5,
    backgroundColor: '#876631',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    alignSelf: 'center',
  },
});

export default App;
