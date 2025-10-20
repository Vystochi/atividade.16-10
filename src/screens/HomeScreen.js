import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ItemCard from '../components/ItemCard';

export default function HomeScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const api = 'https://68f0e5fa0b966ad500349e54.mockapi.io/ListaCompras';

  const carregarProdutos = async () => {
    try {
      const response = await fetch(api);
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  const deletarProduto = async (id) => {
    await fetch(`${api}/${id}`, { method: 'DELETE' });
    carregarProdutos();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarProdutos);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => navigation.navigate('Adicionar Produto')}
      >
        <Text style={styles.textoBotao}>Adicionar Produto</Text>
      </TouchableOpacity>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            onEdit={() => navigation.navigate('Editar Produto', { item })}
            onDelete={() => deletarProduto(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  botaoAdicionar: {
    backgroundColor: '#007bff',
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
