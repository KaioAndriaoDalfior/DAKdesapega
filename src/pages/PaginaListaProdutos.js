import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Button, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from './firebaseConfig';

const PaginaListaProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation(); 

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (!user) {
          setError('Usuário não está autenticado.');
          setLoading(false);
          return;
        }

        const snapshot = await firebase.firestore().collection('produtos').where('uid', '==', user.uid).get();
        const produtosList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setProdutos(produtosList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  const handleExcluir = () => {
    Alert.alert('Atenção', 'Função não programada.');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#348e91" />
        <Text style={styles.loadingText}>Carregando produtos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erro ao carregar produtos: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('PaginaLogado')}>
          <Text style={styles.loginButton}>Voltar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>O MELHOR SITE DE DESAPEGA DO BRASIL!</Text>
      <Text style={styles.subtitle}>Anúncios Publicados:</Text>
      <View style={styles.productsContainer}>
        {produtos.map(produto => (
          <View key={produto.id} style={styles.productBox}>
            <Text style={styles.productText}>Nome: {produto.titulo}</Text>
            <Text style={styles.productText}>Estado: {produto.estado}</Text>
            <Text style={styles.productText}>Preço: {produto.preco}</Text>
            <Text style={styles.productText}>Título: {produto.descricao}</Text>
            <Text style={styles.productText}>Nome do Anunciante: {produto.nomeAnunciante}</Text>
            <Button title="Excluir Anúncio" onPress={handleExcluir} color="#ffaa00"/>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 50,
  },
  loginButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#348e91',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1c5052',
    marginBottom: 10,
    textAlign: 'center',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    color: 'black',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    color: 'red',
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productBox: {
    width: '100%',
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 2,
    borderColor: '#aa00ff',
  },
  productText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#213635',
  },
});

export default PaginaListaProdutos;
