// components/ItemCard.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ItemCard({ item, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text>Quantidade: {item.quantidade}</Text>
      <Text>Preço: R$ {item.preco}</Text>
      <View style={styles.botoes}>
        <Button title="Editar" onPress={onEdit} color="green" />
        <Button title="Excluir" color="red" onPress={onDelete} />
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
});
