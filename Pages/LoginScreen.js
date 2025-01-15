import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/authConfig";
import { useNavigation } from "@react-navigation/native";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Always defined
  const navigation = useNavigation();
  const handleLogin = async () => {
    const validationError = validateInputs();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      
      navigation.replace("Landing"); // Navigate to LandingPage on success
    } catch (error) {
      setErrorMessage(error.message || "An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text onPress={() => navigation.navigate("Signup")}>
        Don't have an account? Signup
      </Text>
    </View>
  );
};
export default LoginScreen;