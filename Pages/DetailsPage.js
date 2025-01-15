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

const { width } = Dimensions.get('window');

const DetailsPage = ({ route }) => {
  const {
    hotelName = 'Hotel Alpha',
    hotelLocation = 'City Center, USA',
    imageUrl = '../assets/Images/tula.jpg',
    rating = 4.5,
    reviews = 1204,
    description = 'Details about the hotel.',
    reviewData = [],
  } = route.params || {};

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{hotelName}</Text>
      </View>

      {/* Hotel Image */}
      <Image
        source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
        style={styles.hotelImage}
      />

      {/* Hotel Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.hotelName}>{hotelName}</Text>
        <Text style={styles.hotelLocation}>{hotelLocation}</Text>
        <View style={styles.ratingContainer}>
          <Rating readonly startingValue={rating} imageSize={20} />
          <Text style={styles.reviewCount}>({reviews} Reviews)</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>

      {/* Reviews */}
      {reviewData.length > 0 && (
        <View style={styles.reviewsContainer}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <FlatList
            data={reviewData}
            keyExtractor={(item) => item.id.toString()}
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
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  hotelImage: {
    width: width,
    height: width * 0.5,
  },
  detailsContainer: {
    padding: 16,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  hotelLocation: {
    fontSize: 14,
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
    fontSize: 14,
    marginTop: 8,
    color: '#555',
  },
  reviewsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  reviewItem: {
    flexDirection: 'row',
    marginBottom: 16,
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
