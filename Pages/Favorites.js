import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, TouchableOpacity } from "react-native";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { auth } from "../firebase/authConfig"; // Import Firebase auth
import { onAuthStateChanged } from "firebase/auth";
import Icon from 'react-native-vector-icons/Ionicons';

const FavouritesPage = () => {
  const [placeName, setPlaceName] = useState("");
  const [places, setPlaces] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserFavourites(user.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserFavourites = async (userId) => {
    try {
      const q = query(collection(db, "favourites"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const fetchedPlaces = querySnapshot.docs.map((doc) => doc.data());
      setPlaces(fetchedPlaces);
    } catch (error) {
      Alert.alert("Error fetching favourites", error.message);
    }
  };

  const handleAddFavourite = async () => {
    if (placeName.trim() === "") {
      Alert.alert("Please enter a place name");
      return;
    }

    try {
      const newPlace = {
        name: placeName,
        userId: user.uid,
      };
      await addDoc(collection(db, "favourites"), newPlace);
      setPlaces([...places, newPlace]);
      setPlaceName("");
      Alert.alert("Place added to favourites");
    } catch (error) {
      Alert.alert("Error adding favourite", error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
      <TouchableOpacity onPress={() => handleAddFavourite(item.name)}>
        <Icon name="heart" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourite Places</Text>
      <TextInput
        placeholder="Enter place name"
        value={placeName}
        onChangeText={setPlaceName}
        style={styles.input}
      />
      <Button title="Add to Favourites" onPress={handleAddFavourite} />
      <FlatList
        data={places}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
    fontSize: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default FavouritesPage;
