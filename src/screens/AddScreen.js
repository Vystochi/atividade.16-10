import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text, Animated } from 'react-native';

export default function AddScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const api = 'https://68f0e5fa0b966ad500349e54.mockapi.io/ListaCompras';

  const scale = useRef(new Animated.Value(1)).current;

  const animarPress = (para) => {
    Animated.spring(scale, {
      toValue: para,
      useNativeDriver: true,
      speed: 20,
      bounciness: 5,
    }).start();
  };

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

      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable
          onPressIn={() => animarPress(0.92)}
          onPressOut={() => animarPress(1)}
          onPress={salvar}
          style={styles.botao}
        >
          <Text style={styles.textoBotao}>Salvar</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  botao: {
    backgroundColor: 'green',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
