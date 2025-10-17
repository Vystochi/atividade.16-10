import React, { useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';

// Componente ItemCard recebe props: item (objeto com dados), onEdit (função de editar), onDelete (função de excluir)
export default function ItemCard({ item, onEdit, onDelete }) {
  // useRef cria referências para valores animados. Inicialmente, a escala é 1 (tamanho normal)
  const scaleEditar = useRef(new Animated.Value(1)).current;
  const scaleExcluir = useRef(new Animated.Value(1)).current;

  // Função para animar o "pressionar" dos botões usando spring (mola)
  // anim: referência do Animated.Value, para: valor final da animação (ex: 0.92)
  const animarPress = (anim, para) => {
    Animated.spring(anim, {
      toValue: para, // valor final da escala
      useNativeDriver: true, // utiliza driver nativo para performance melhor
      speed: 20, // velocidade da animação
      bounciness: 5, // "elasticidade" da mola
    }).start(); // inicia a animação
  };

  return (
    // Card do item
    <View style={styles.card}>
        {/* Nome do produto */}
        <Text style={styles.nome}>{item.nome}</Text>
        {/* Quantidade do produto */}
        <Text>Quantidade: {item.quantidade}</Text>
        {/* Preço do produto */}
        <Text>Preço: R$ {item.preco}</Text>

      {/* Área dos botões */}
      <View style={styles.botoes}>
        {/* Botão Editar com animação */}
        <Animated.View style={{ transform: [{ scale: scaleEditar }] }}>
          <Pressable
            onPressIn={() => animarPress(scaleEditar, 0.92)} // ao pressionar, reduz a escala
            onPressOut={() => animarPress(scaleEditar, 1)} // ao soltar, retorna à escala normal
            onPress={onEdit} // chama função passada como prop
            style={[styles.botao, styles.editar]} // aplica estilos do botão + cor verde
          >
            <Text style={styles.textoBotao}>Editar</Text>
          </Pressable>
        </Animated.View>

        {/* Botão Excluir com animação */}
        <Animated.View style={{ transform: [{ scale: scaleExcluir }] }}>
          <Pressable
            onPressIn={() => animarPress(scaleExcluir, 0.92)} // ao pressionar, reduz a escala
            onPressOut={() => animarPress(scaleExcluir, 1)} // ao soltar, retorna à escala normal
            onPress={onDelete} // chama função passada como prop
            style={[styles.botao, styles.excluir]} // aplica estilos do botão + cor vermelha
          >
            <Text style={styles.textoBotao}>Excluir</Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f5', // cor de fundo clara
    padding: 15, // espaço interno
    marginVertical: 8, // espaçamento vertical entre cards
    borderRadius: 10, // cantos arredondados
    shadowColor: '#000', // sombra (iOS)
    shadowOpacity: 0.1, // opacidade da sombra
    shadowRadius: 4, // raio da sombra
    elevation: 2, // sombra (Android)
  },
  nome: {
    fontSize: 18, // tamanho da fonte
    fontWeight: 'bold', // negrito
    marginBottom: 5, // margem abaixo do nome
  },
  botoes: {
    flexDirection: 'row', // organiza botões em linha
    justifyContent: 'space-between', // espaço entre os botões
    marginTop: 10, // margem acima dos botões
  },
  botao: {
    width: 100, // largura do botão
    alignItems: 'center', // centraliza texto horizontalmente
    paddingVertical: 10, // espaçamento vertical interno
    borderRadius: 10, // cantos arredondados
  },
  editar: {
    backgroundColor: 'green', // cor verde para editar
  },
  excluir: {
    backgroundColor: 'red', // cor vermelha para excluir
  },
  textoBotao: {
    color: '#fff', // texto branco
    fontWeight: 'bold', // negrito
  },
});
