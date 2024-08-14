import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { firestore } from './firebaseConfig'; 
import firebase from 'firebase';

const PaginaExcluirProduto = ({ navigation }) => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = firebase.auth().currentUser;

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        if (user) {
          const snapshot = await firestore.collection('produtos').where('uid', '==', user.uid).get();
          const produtosList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setProdutos(produtosList);
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os produtos.');
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await firestore.collection('produtos').doc(id).delete();
      setProdutos(produtos.filter(produto => produto.id !== id));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o produto.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.productBox}>
      <Text style={styles.productName}>{item.descricao}</Text>
      <Text style={styles.productPrice}>R$: {item.preco}</Text>
      <Button title="Excluir" color="red" onPress={() => handleDelete(item.id)} />
    </View>
  );

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Produtos</Text>
      <FlatList
        data={produtos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  listContainer: {
    flexGrow: 1,
  },
  productBox: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#ff6600',
  },
});

export default PaginaExcluirProduto;
