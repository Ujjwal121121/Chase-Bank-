import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      if (response.data.success) {
        navigation.navigate('Dashboard');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 20 }}
      />
      <Text>Password:</Text>
      <TextInput
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 20 }}
      />
      <Button title="Login" onPress={loginUser} />
    </View>
  );
};

export default LoginScreen;
