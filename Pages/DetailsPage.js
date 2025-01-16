// filepath: /c:/Users/Blessing/Documents/CodeTribeProjects/React Native/travelapp/Pages/DetailsPage.js
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import { useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const DetailsPage = () => {
  const route = useRoute();
  const {
    name,
    location,
    image,
    rating,
    reviews,
    description,
  } = route.params.place;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{name}</Text>
      </View>

      {/* Hotel Image */}
      <Image
        source={image}
        style={styles.hotelImage}
      />

      {/* Hotel Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.hotelName}>{name}</Text>
        <Text style={styles.hotelLocation}>{location}</Text>
        <View style={styles.ratingContainer}>
          <Rating readonly startingValue={rating} imageSize={20} />
          <Text style={styles.reviewCount}>({reviews} Reviews)</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>

      {/* Reviews */}
      {reviews.length > 0 && (
        <View style={styles.reviewsContainer}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <FlatList
            data={reviews}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.reviewItem}>
                <Image
                  source={{ uri: item.avatar || 'https://via.placeholder.com/40' }}
                  style={styles.avatar}
                />
                <View style={styles.reviewContent}>
                  <Text style={styles.reviewerName}>{item.name}</Text>
                  <Text style={styles.reviewDate}>{item.date}</Text>
                  <Text style={styles.reviewText}>{item.text}</Text>
                </View>
              </View>
            )}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  hotelImage: {
    width: width,
    height: width * 0.6,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  hotelName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  hotelLocation: {
    fontSize: 16,
    color: 'gray',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  reviewCount: {
    marginLeft: 8,
    fontSize: 14,
    color: 'gray',
  },
  description: {
    fontSize: 16,
    marginTop: 8,
    color: '#555',
  },
  reviewsContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  reviewItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewContent: {
    marginLeft: 16,
    flex: 1,
  },
  reviewerName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  reviewDate: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
  },
  reviewText: {
    fontSize: 14,
    marginTop: 4,
    color: '#555',
  },
});

export default DetailsPage;