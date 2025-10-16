import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function AddScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const api = 'https://68f0e5fa0b966ad500349e54.mockapi.io/ListaCompras';

  const salvar = async () => {
    await fetch(api, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, quantidade, preco }),
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nome do produto" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Quantidade" value={quantidade} onChangeText={setQuantidade} style={styles.input} />
      <TextInput placeholder="Preço" value={preco} onChangeText={setPreco} style={styles.input} />
      <Button title="Salvar" onPress={salvar} color="green" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 8 },
});
