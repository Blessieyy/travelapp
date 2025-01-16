import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/authConfig";
import { useNavigation } from "@react-navigation/native";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  };

  const handleSignup = async () => {
    setErrorMessage("");
    const validationError = validateInputs();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      navigation.navigate("Landing");
    } catch (error) {
      setErrorMessage(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <ImageBackground source={require('../assets/Images/4091164.jpg')} style={styles.backgroundImage}>
      <View style={styles.overlay} />
      <Text style={styles.title}>Hello, Lets Travel</Text>
      <Text style={styles.sub}>Create an account</Text>
      <View style={styles.container}>
        <Text style={styles.head}>Signup</Text>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
        <Text style={styles.loginText} onPress={() => navigation.navigate("Login")}>
          Already have an account? <Text style={styles.loginLink}>Log in</Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    width: '90%',
    padding: 20,
    backgroundColor: "rgba(167, 164, 164, 0.88)",
    borderRadius: 10,
    alignItems: "center",
  },
  title:{
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    bottom: 100,
  },

  sub:{
    fontSize: 20,
    fontWeight: "",
    color: "#fff",
    marginBottom: 20,
    bottom: 100,
  },
  head: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: "#A78258",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  loginText: {
    color: "#333",
    fontSize: 16,
  },
  loginLink: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default SignupScreen;