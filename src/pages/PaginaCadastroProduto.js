import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { firestore } from './firebaseConfig';
import firebase from 'firebase';

const estadosBrasileiros = [
  { label: 'Todos', value: 'todos' },
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

const PaginaCadastroProduto = ({ navigation }) => {
  const [descricao, setDescricao] = useState('');
  const [estado, setEstado] = useState('');
  const [categoria, setCategoria] = useState('');
  const [preco, setPreco] = useState('');
  const [titulo, setTitulo] = useState('');
  const [nomeAnunciante, setNomeAnunciante] = useState('');

  const handleSubmit = async () => {
    try {
      const user = firebase.auth().currentUser;
      if (!user) {
        Alert.alert('Erro', 'Usuário não está autenticado.');
        return;
      }
      await firestore.collection('produtos').add({
        descricao,
        estado,
        categoria,
        preco,
        titulo,
        nomeAnunciante,
        uid: user.uid,
      });
      Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar o produto.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('PaginaLogado')}>
          <Text style={styles.loginButton}>Voltar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>O MELHOR SITE DE DESAPEGA DO BRASIL!</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={titulo}
        onChangeText={setTitulo}
      />
      <SelectDropdown
        data={estadosBrasileiros}
        onSelect={(selectedItem) => setEstado(selectedItem.value)}
        buttonStyle={styles.dropdownButton}
        buttonTextStyle={styles.dropdownButtonText}
        dropdownStyle={styles.dropdownStyle}
        rowStyle={styles.dropdownRow}
        rowTextStyle={styles.dropdownRowText}
        defaultButtonText="Selecione o Estado"
        renderCustomizedButtonChild={(selectedItem) => {
          return (
            <Text style={styles.dropdownButtonText}>
              {selectedItem ? selectedItem.label : 'Selecione o Estado'}
            </Text>
          );
        }}
        renderCustomizedRowChild={(item) => {
          return (
            <Text style={styles.dropdownRowText}>
              {item.label}
            </Text>
          );
        }}
      />
      <SelectDropdown
        data={categorias}
        onSelect={(selectedItem) => setCategoria(selectedItem.value)}
        buttonStyle={styles.dropdownButton}
        buttonTextStyle={styles.dropdownButtonText}
        dropdownStyle={styles.dropdownStyle}
        rowStyle={styles.dropdownRow}
        rowTextStyle={styles.dropdownRowText}
        defaultButtonText="Selecione a Categoria"
        renderCustomizedButtonChild={(selectedItem) => {
          return (
            <Text style={styles.dropdownButtonText}>
              {selectedItem ? selectedItem.label : 'Selecione a Categoria'}
            </Text>
          );
        }}
        renderCustomizedRowChild={(item) => {
          return (
            <Text style={styles.dropdownRowText}>
              {item.label}
            </Text>
          );
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome do Anunciante"
        value={nomeAnunciante}
        onChangeText={setNomeAnunciante}
      />
      <Button title="Cadastrar Produto" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  loginButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    backgroundColor: '#ffffff',
    color: '#348e91',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dropdownButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#00a8c6',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  dropdownButtonText: {
    color: 'white',
    fontSize: 16,
  },
  dropdownStyle: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  dropdownRow: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownRowText: {
    color: '#333',
    fontSize: 16,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
});

export default PaginaCadastroProduto;
