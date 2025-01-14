import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";

const Details = [
  {
    name: "Pine Valley Resort",
    location: "Gauteng",
    image: require("../assets/Images/pine.jpg"),
    rating: 4.5,
    reviews: 120,
  },
];

const DetailsPage = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={Details}
        renderItem={({ item }) => (
        
           
          <View style={styles.placedetailsContainer}>
           
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.location}>{item.location}</Text>
              <Text style={styles.rating}>
                Rating: {item.rating} - Reviews: {item.reviews}
              </Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Select Room</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  landmarkItem: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 16,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 30px rgba(0, 0, 0, 0.6)",
    padding: 10,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DetailsPage;
