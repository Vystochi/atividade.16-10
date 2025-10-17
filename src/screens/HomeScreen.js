import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ItemCard from '../components/ItemCard'; // Componente que mostra cada item da lista

// Componente HomeScreen, tela principal que lista produtos
export default function HomeScreen({ navigation }) {
  // Estado que armazena a lista de produtos
  const [produtos, setProdutos] = useState([]);

  // URL da API Mock
  const api = 'https://68f0e5fa0b966ad500349e54.mockapi.io/ListaCompras';

  // Função para carregar produtos da API
  const carregarProdutos = async () => {
    try {
      const response = await fetch(api); // busca dados da API
      const data = await response.json(); // converte resposta em JSON
      setProdutos(data); // atualiza o estado com os produtos
    } catch (error) {
      console.error('Erro ao carregar produtos:', error); // mostra erro no console
    }
  };

  // Função para deletar um produto
  const deletarProduto = async (id) => {
    await fetch(`${api}/${id}`, { method: 'DELETE' }); // faz DELETE na API
    carregarProdutos(); // recarrega a lista após deletar
  };

  // useEffect para recarregar produtos quando a tela recebe foco
  useEffect(() => {
    // adiciona listener para o evento 'focus' da navegação
    const unsubscribe = navigation.addListener('focus', carregarProdutos);
    return unsubscribe; // remove listener quando o componente é desmontado
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Botão para navegar para a tela de adicionar produto */}
      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => navigation.navigate('Adicionar Produto')}
      >
        <Text style={styles.textoBotao}>Adicionar Produto</Text>
      </TouchableOpacity>

      {/* FlatList para renderizar a lista de produtos */}
      <FlatList
        data={produtos} // array de produtos
        keyExtractor={(item) => item.id} // chave única para cada item
        renderItem={({ item }) => (
          <ItemCard
            item={item} // passa os dados do item
            onEdit={() => navigation.navigate('Editar Produto', { item })} // navega para edição
            onDelete={() => deletarProduto(item.id)} // deleta item
          />
        )}
      />
    </View>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' }, // container principal
  botaoAdicionar: {
    backgroundColor: '#007bff', // azul
    borderRadius: 15, // cantos arredondados
    paddingVertical: 12, // altura do botão
    alignItems: 'center', // centraliza texto
    marginBottom: 15, // espaço abaixo do botão
  },
  textoBotao: {
    color: '#fff', // texto branco
    fontSize: 18,
    fontWeight: 'bold',
  },
});
