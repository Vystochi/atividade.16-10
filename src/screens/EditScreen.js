import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Pressable, Animated, Text } from 'react-native';

export default function EditScreen({ route, navigation }) {
  const { item } = route.params;
  const [nome, setNome] = useState(item.nome ?? '');
  const [quantidade, setQuantidade] = useState(item.quantidade ?? 0);
  const [preco, setPreco] = useState(item.preco ?? 0);
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

  const atualizar = async () => {
    await fetch(`${api}/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, quantidade, preco }),
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome do produto"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantidade"
        value={quantidade.toString()}
        onChangeText={(text) => setQuantidade(Number(text))}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Preço"
        value={preco.toString()}
        onChangeText={(text) => setPreco(Number(text))}
        style={styles.input}
        keyboardType="numeric"
      />

      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable
          onPressIn={() => animarPress(0.92)}
          onPressOut={() => animarPress(1)}
          onPress={atualizar}
          style={styles.botao}
        >
          <Text style={styles.textoBotao}>Atualizar</Text>
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
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
