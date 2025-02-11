import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from "react-native";
import { auth } from "../firebase/authConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/authConfig";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'react-native-image-picker';

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
        setProfilePhoto(source);
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
          <TouchableOpacity style={styles.photoButton} onPress={selectProfilePhoto}>
            <Text style={styles.photoButtonText}>Select Profile Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
            <Text style={styles.saveButtonText}>Save Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditing(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
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
          <Text style={styles.infoText}>Full Name: {fullName}</Text>
          <Text style={styles.infoText}>Surname: {surname}</Text>
          <Text style={styles.infoText}>Cell Number: {cellNo}</Text>
          <Text style={styles.infoText}>Email: {email}</Text>
          <Text style={styles.infoText}>Town: {town}</Text>
          <Text style={styles.infoText}>Suburb: {suburb}</Text>
          <Text style={styles.infoText}>House No: {houseNo}</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
    alignSelf: "center",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  photoButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  photoButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  editButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ProfileScreen;