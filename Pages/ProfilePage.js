import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from "react-native";
import { auth } from "../firebase/authConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/authConfig";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'react-native-image-picker';
import { Buffer } from 'buffer';

const ProfileScreen = () => {
  const [fullName, setFullName] = useState("");
  const [surname, setSurname] = useState("");
  const [cellNo, setCellNo] = useState("");
  const [email, setEmail] = useState("");
  const [town, setTown] = useState("");
  const [suburb, setSuburb] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserProfile(user.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const docRef = doc(db, "profiles", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userProfile = docSnap.data();
        setFullName(userProfile.fullName || "");
        setSurname(userProfile.surname || "");
        setCellNo(userProfile.cellNo || "");
        setEmail(userProfile.email || "");
        setTown(userProfile.town || "");
        setSuburb(userProfile.suburb || "");
        setHouseNo(userProfile.houseNo || "");
        setProfilePhoto(userProfile.profilePhoto || null);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      Alert.alert("Error fetching profile", error.message);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) {
      Alert.alert("User not authenticated");
      return;
    }

    try {
      await setDoc(doc(db, "profiles", user.uid), {
        fullName,
        surname,
        cellNo,
        email,
        town,
        suburb,
        houseNo,
        profilePhoto
      });
      setIsEditing(false); // Hide input fields after saving
      Alert.alert("Profile saved successfully");
    } catch (error) {
      Alert.alert("Error saving profile", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error logging out", error.message);
    }
  };

  const selectProfilePhoto = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = response.assets[0].uri;
        // Convert image to base64 string
        ImagePicker.readAsDataURL(source)
          .then((base64) => setProfilePhoto(base64))
          .catch((error) => console.error("Error converting to base64: ", error));
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {isEditing ? (
        <>
          <TextInput
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
          />
          <TextInput
            placeholder="Surname"
            value={surname}
            onChangeText={setSurname}
            style={styles.input}
          />
          <TextInput
            placeholder="Cell Number"
            value={cellNo}
            onChangeText={setCellNo}
            style={styles.input}
            keyboardType="phone-pad"
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Town"
            value={town}
            onChangeText={setTown}
            style={styles.input}
          />
          <TextInput
            placeholder="Suburb"
            value={suburb}
            onChangeText={setSuburb}
            style={styles.input}
          />
          <TextInput
            placeholder="House No"
            value={houseNo}
            onChangeText={setHouseNo}
            style={styles.input}
          />
       
          
          <Button title="Save Profile" onPress={handleSaveProfile} />
          <Button title="Cancel" onPress={() => setIsEditing(false)} color="grey" />
        </>
      ) : (
        <>
          <Text style={styles.greeting}>Hi, {fullName}!</Text>
          {profilePhoto && (
            <Image
              source={{ uri: profilePhoto }}
              style={styles.profilePhoto}
            />
          )}
          <Text>Full Name: {fullName}</Text>
          <Text>Surname: {surname}</Text>
          <Text>Cell Number: {cellNo}</Text>
          <Text>Email: {email}</Text>
          <Text>Town: {town}</Text>
          <Text>Suburb: {suburb}</Text>
          <Text>House No: {houseNo}</Text>
          <Button title="Edit Profile" onPress={() => setIsEditing(true)} />
        </>
      )}
      <Button title="Logout" onPress={handleLogout} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default ProfileScreen;
