import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/authConfig';
import { useNavigation } from '@react-navigation/native';
const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const handleSignup = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      navigation.navigate('Home'); // Navigate to LoginScreen on success
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{ padding: 20 }}>
      <Text>Signup</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Signup" onPress={handleSignup} />
      <Text onPress={() => navigation.navigate('Login')}>Already have an account? Log in</Text>
    </View>
  );
};
export default SignupScreen;














