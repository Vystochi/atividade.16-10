import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Pressable, Animated, Text } from 'react-native';

// Componente EditScreen, usado para editar um item existente
export default function EditScreen({ route, navigation }) {
  // Recebe o item enviado pela tela anterior via route.params
  const { item } = route.params;

  // Estados para armazenar os valores do item
  // Se algum valor não existir, usa valores padrões ('' para nome, 0 para números)
  const [nome, setNome] = useState(item.nome ?? '');
  const [quantidade, setQuantidade] = useState(item.quantidade ?? 0);
  const [preco, setPreco] = useState(item.preco ?? 0);

  // URL da API Mock
  const api = 'https://68f0e5fa0b966ad500349e54.mockapi.io/ListaCompras';

  // Referência para animação do botão
  const scale = useRef(new Animated.Value(1)).current;

  // Função para animar o botão ao pressionar e soltar
  const animarPress = (para) => {
    Animated.spring(scale, {
      toValue: para, // valor final da escala (ex: 0.92 ou 1)
      useNativeDriver: true, // melhor performance usando driver nativo
      speed: 20, // velocidade da animação
      bounciness: 5, // efeito "mola"
    }).start();
  };

  // Função para atualizar o item na API
  const atualizar = async () => {
    await fetch(`${api}/${item.id}`, { // usa o id do item para atualizar
      method: 'PUT', // método PUT para atualizar
      headers: { 'Content-Type': 'application/json' }, // tipo de conteúdo
      body: JSON.stringify({ nome, quantidade, preco }), // converte dados para JSON
    });
    navigation.goBack(); // volta para a tela anterior
  };

  return (
    <View style={styles.container}>
      {/* Input para editar o nome do produto */}
      <TextInput
        placeholder="Nome do produto"
        value={nome} // valor do input
        onChangeText={setNome} // atualiza estado ao digitar
        style={styles.input}
      />

      {/* Input para editar a quantidade */}
      <TextInput
        placeholder="Quantidade"
        value={quantidade.toString()} // converte número para string
        onChangeText={(text) => setQuantidade(Number(text))} // converte input de volta para número
        style={styles.input}
        keyboardType="numeric" // teclado numérico
      />

      {/* Input para editar o preço */}
      <TextInput
        placeholder="Preço"
        value={preco.toString()}
        onChangeText={(text) => setPreco(Number(text))}
        style={styles.input}
        keyboardType="numeric"
      />

      {/* Botão Atualizar com animação de pressão */}
      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable
          onPressIn={() => animarPress(0.92)} // reduz escala ao pressionar
          onPressOut={() => animarPress(1)} // volta escala ao soltar
          onPress={atualizar} // chama função atualizar
          style={styles.botao}
        >
          <Text style={styles.textoBotao}>Atualizar</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 }, // ocupa tela toda + padding
  input: {
    borderWidth: 1, // borda do input
    borderColor: '#ccc', // cor da borda
    padding: 10, // espaçamento interno
    marginBottom: 8, // espaço entre inputs
    borderRadius: 8, // cantos arredondados
  },
  botao: {
    backgroundColor: 'green', // cor do botão
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center', // centraliza texto
    marginTop: 10,
  },
  textoBotao: {
    color: '#fff', // texto branco
    fontSize: 18, // tamanho da fonte
    fontWeight: 'bold', // negrito
  },
});
