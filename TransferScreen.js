import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const TransferScreen = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const makeTransfer = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/transfer', { recipient, amount });
      if (response.data.success) {
        alert('Transfer successful');
      } else {
        alert('Transfer failed: ' + response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Recipient:</Text>
      <TextInput
        placeholder="Enter recipient's email"
        value={recipient}
        onChangeText={setRecipient}
        style={{ borderWidth: 1, marginBottom: 20 }}
      />
      <Text>Amount:</Text>
      <TextInput
        placeholder="Enter amount"
        value={amount}
        onChangeText={setAmount}
        style={{ borderWidth: 1, marginBottom: 20 }}
      />
      <Button title="Transfer" onPress={makeTransfer} />
    </View>
  );
};

export default TransferScreen;
