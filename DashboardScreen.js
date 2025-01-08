import React from 'react';
import { View, Text, Button } from 'react-native';

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome to your Banking Dashboard!</Text>
      <Button title="Make a Transfer" onPress={() => navigation.navigate('Transfer')} />
    </View>
  );
};

export default DashboardScreen;
