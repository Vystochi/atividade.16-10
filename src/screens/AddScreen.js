import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text, Animated } from 'react-native';

// Componente AddScreen, usado para adicionar um item à lista
export default function AddScreen({ navigation }) {
  // Estados para armazenar os valores digitados pelo usuário
  const [nome, setNome] = useState(''); // nome do produto
  const [quantidade, setQuantidade] = useState(''); // quantidade do produto
  const [preco, setPreco] = useState(''); // preço do produto

  // URL da API Mock para salvar os itens
  const api = 'https://68f0e5fa0b966ad500349e54.mockapi.io/ListaCompras';

  // Referência para animação do botão
  const scale = useRef(new Animated.Value(1)).current;

  // Função para animar o botão ao pressionar e soltar
  // para: valor final da escala (ex: 0.92 ao pressionar, 1 ao soltar)
  const animarPress = (para) => {
    Animated.spring(scale, {
      toValue: para, // valor final da escala
      useNativeDriver: true, // melhor performance usando driver nativo
      speed: 20, // velocidade da animação
      bounciness: 5, // efeito "mola" na animação
    }).start(); // inicia a animação
  };

  // Função para salvar o item na API
  const salvar = async () => {
    await fetch(api, {
      method: 'POST', // método POST para criar um novo item
      headers: { 'Content-Type': 'application/json' }, // tipo de conteúdo
      body: JSON.stringify({ nome, quantidade, preco }), // transforma os dados em JSON
    });
    navigation.goBack(); // volta para a tela anterior
  };

  return (
    <View style={styles.container}>
      {/* Input para o nome do produto */}
      <TextInput
        placeholder="Nome do produto"
        value={nome} // valor do input
        onChangeText={setNome} // atualiza estado ao digitar
        style={styles.input}
      />

      {/* Input para a quantidade do produto */}
      <TextInput
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        style={styles.input}
      />

      {/* Input para o preço do produto */}
      <TextInput
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        style={styles.input}
      />

      {/* Botão salvar com animação de escala */}
      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable
          onPressIn={() => animarPress(0.92)} // reduz escala ao pressionar
          onPressOut={() => animarPress(1)} // retorna escala ao soltar
          onPress={salvar} // chama função salvar ao pressionar
          style={styles.botao}
        >
          <Text style={styles.textoBotao}>Salvar</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 }, // ocupa tela toda e adiciona padding
  input: {
    borderWidth: 1, // borda do input
    borderColor: '#ccc', // cor da borda
    padding: 10, // espaçamento interno
    marginBottom: 10, // espaço entre inputs
    borderRadius: 8, // cantos arredondados
  },
  botao: {
    backgroundColor: 'green', // cor do botão
    paddingVertical: 12, // altura do botão
    borderRadius: 8, // cantos arredondados
    alignItems: 'center', // centraliza texto
  },
  textoBotao: {
    color: '#fff', // cor do texto
    fontWeight: 'bold', // negrito
    fontSize: 16, // tamanho da fonte
  },
});
