import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { firestore } from './firebaseConfig';

const estadosBrasileiros = [
  { label: 'Todos os Estados', value: 'todos' },
  { label: 'Acre', value: 'AC' },
  { label: 'Alagoas', value: 'AL' },
  { label: 'Amapá', value: 'AP' },
  { label: 'Amazonas', value: 'AM' },
  { label: 'Bahia', value: 'BA' },
  { label: 'Ceará', value: 'CE' },
  { label: 'Distrito Federal', value: 'DF' },
  { label: 'Espírito Santo', value: 'ES' },
  { label: 'Goiás', value: 'GO' },
  { label: 'Maranhão', value: 'MA' },
  { label: 'Mato Grosso', value: 'MT' },
  { label: 'Mato Grosso do Sul', value: 'MS' },
  { label: 'Minas Gerais', value: 'MG' },
  { label: 'Pará', value: 'PA' },
  { label: 'Paraíba', value: 'PB' },
  { label: 'Paraná', value: 'PR' },
  { label: 'Pernambuco', value: 'PE' },
  { label: 'Piauí', value: 'PI' },
  { label: 'Rio de Janeiro', value: 'RJ' },
  { label: 'Rio Grande do Norte', value: 'RN' },
  { label: 'Rio Grande do Sul', value: 'RS' },
  { label: 'Rondônia', value: 'RO' },
  { label: 'Roraima', value: 'RR' },
  { label: 'Santa Catarina', value: 'SC' },
  { label: 'São Paulo', value: 'SP' },
  { label: 'Sergipe', value: 'SE' },
  { label: 'Tocantins', value: 'TO' },
];

const categorias = [
  { label: 'Todas as Categorias', value: 'todos' },
  { label: 'Celulares', value: 'Celulares' },
  { label: 'Decoração', value: 'Decoração' },
  { label: 'Automóveis', value: 'Automóveis' },
  { label: 'Imóveis', value: 'Imóveis' },
  { label: 'Eletrodomésticos', value: 'Eletrodomésticos' },
  { label: 'Móveis', value: 'Móveis' },
  { label: 'Esportes', value: 'Esportes' },
  { label: 'Hobbies', value: 'Hobbies' },
  { label: 'Moda', value: 'Moda' },
  { label: 'Infantil', value: 'Infantil' },
  { label: 'Serviços', value: 'Serviços' },
  { label: 'Games', value: 'Games' },
];

const PaginaPrincipal = ({ navigation }) => {
  const [estadoSelecionado, setEstadoSelecionado] = useState('todos');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('todos');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProdutos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = firestore.collection('produtos');

      if (estadoSelecionado !== 'todos') {
        query = query.where('estado', '==', estadoSelecionado);
      }
      if (categoriaSelecionada !== 'todos') {
        query = query.where('categoria', '==', categoriaSelecionada);
      }

      const snapshot = await query.get();
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
  }, [estadoSelecionado, categoriaSelecionada]);

  useEffect(() => {
    fetchProdutos();
  }, [fetchProdutos]);

  const handleLogin = () => {
    navigation.navigate('PaginaLogin');
  };

  const handleBuy = (produto) => {
    console.log("Tente novamente mais tarde");
  };

  const handleChat = (produto) => {
    navigation.navigate('PaginaDesenvolvedor');
  };

  const renderItem = ({ item }) => (
    <View style={styles.productBox}>
      <Text style={styles.productName}>{item.titulo}</Text>
      <Text style={styles.productPrice}>R$: {item.preco}</Text>
      <Text style={styles.productState}>{item.estado}</Text>
      <Text style={styles.productDescription}>{item.descricao}</Text>
      <Text style={styles.productCategory}>{item.categoria}</Text>
      <Text style={styles.productAnunciante}>{item.nomeAnunciante}</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleBuy(item)}>
        <Text style={styles.buttonText}>COMPRAR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.chatButton} onPress={() => handleChat(item)}>
        <Text style={styles.buttonText}>Conversar com Vendedor</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando produtos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Erro ao carregar produtos: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginButton}>Login</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>O MELHOR SITE DE DESAPEGA DO BRASIL!</Text>
      <SelectDropdown
        data={estadosBrasileiros}
        onSelect={(selectedItem) => setEstadoSelecionado(selectedItem.value)}
        buttonTextAfterSelection={(selectedItem) => selectedItem.label}
        rowTextForSelection={(item) => item.label}
        defaultButtonText="Selecione o Estado"
        buttonStyle={styles.dropdownButton}
        buttonTextStyle={styles.dropdownButtonText}
        rowStyle={styles.dropdownRow}
        rowTextStyle={styles.dropdownRowText}
      />
      <SelectDropdown
        data={categorias}
        onSelect={(selectedItem) => setCategoriaSelecionada(selectedItem.value)}
        buttonTextAfterSelection={(selectedItem) => selectedItem.label}
        rowTextForSelection={(item) => item.label}
        defaultButtonText="Selecione a Categoria"
        buttonStyle={styles.dropdownButton}
        buttonTextStyle={styles.dropdownButtonText}
        rowStyle={styles.dropdownRow}
        rowTextStyle={styles.dropdownRowText}
      />
      <FlatList
        data={produtos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.productsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  loginButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  dropdownButton: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginVertical: 8,
  },
  dropdownButtonText: {
    color: 'black',
    textAlign: 'left',
    paddingHorizontal: 8,
  },
  dropdownRow: {
    backgroundColor: 'white',
  },
  dropdownRowText: {
    color: 'black',
    paddingHorizontal: 8,
  },
  productsContainer: {
    paddingTop: 16,
  },
  productBox: {
    backgroundColor: '#ffffff',
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
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  productPrice: {
    fontSize: 14,
    color: 'black',
    marginVertical: 8,
  },
  productState: {
    fontSize: 12,
    color: '#555',
  },
  productDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  productCategory: {
    fontSize: 12,
    color: '#777',
  },
  productAnunciante: {
    fontSize: 12,
    color: '#777',
  },
  button: {
    backgroundColor: '#aa00ff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
  },
  chatButton: {
    backgroundColor: '#ffaa00',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#aa00ff',
  },
});

export default PaginaPrincipal;
