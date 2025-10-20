import React, { useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';

export default function ItemCard({ item, onEdit, onDelete }) {
  const scaleEditar = useRef(new Animated.Value(1)).current;
  const scaleExcluir = useRef(new Animated.Value(1)).current;

  const animarPress = (anim, para) => {
    Animated.spring(anim, {
      toValue: para, 
      useNativeDriver: true,
      speed: 20, 
      bounciness: 5, 
    }).start(); 
  };

  return (
    <View style={styles.card}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text>Quantidade: {item.quantidade}</Text>
        <Text>Preço: R$ {item.preco}</Text>

      <View style={styles.botoes}>
        <Animated.View style={{ transform: [{ scale: scaleEditar }] }}>
          <Pressable
            onPressIn={() => animarPress(scaleEditar, 0.92)} 
            onPressOut={() => animarPress(scaleEditar, 1)} 
            onPress={onEdit} 
            style={[styles.botao, styles.editar]}
          >
            <Text style={styles.textoBotao}>Editar</Text>
          </Pressable>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: scaleExcluir }] }}>
          <Pressable
            onPressIn={() => animarPress(scaleExcluir, 0.92)} 
            onPressOut={() => animarPress(scaleExcluir, 1)} 
            onPress={onDelete}
            style={[styles.botao, styles.excluir]} 
          >
            <Text style={styles.textoBotao}>Excluir</Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginVertical: 8, 
    borderRadius: 10, 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4, 
    elevation: 2, 
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5, 
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginTop: 10, 
  },
  botao: {
    width: 100, 
    alignItems: 'center', 
    paddingVertical: 10,
    borderRadius: 10,
  },
  editar: {
    backgroundColor: 'green',
  },
  excluir: {
    backgroundColor: 'red',
  },
  textoBotao: {
    color: '#fff', 
    fontWeight: 'bold', 
  },
});
