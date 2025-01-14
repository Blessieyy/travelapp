import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { Rating } from 'react-native-ratings';



const DetailsPage = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Hotel name</Text>
      </View>

      {/* Hotel Image */}
      <Image
        source={{
          'https://via.placeholder.com/400x200', 
        }}
        style={styles.hotelImage}
      />

      {/* Hotel Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.hotelName}>Hotel Alpha</Text>
        <Text style={styles.hotelLocation}>City Center, USA</Text>
        <View style={styles.ratingContainer}>
          <Rating readonly startingValue={4.5} imageSize={20} />
          <Text style={styles.reviewCount}>(1204 Reviews)</Text>
        </View>
        <Text style={styles.description}>
details about the hotel
        </Text>
      </View>

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
    width: '100%',
    height: 200,
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
