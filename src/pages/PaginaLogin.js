import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { fazerLogin } from './firebaseConfig';

const PaginaLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const handleLogin = () => {
    fazerLogin(email, senha)
      .then(() => {
        navigation.navigate('PaginaLogado');
      })
      .catch((error) => {
        setMensagemErro(error.message);
      });
  };

  const CadastreSe = () => {
    navigation.navigate('PaginaCadastro');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={CadastreSe}>
          <Text style={styles.cadastrarButton}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>O MELHOR SITE DE DESAPEGA DO BRASIL!</Text>
      <View style={styles.box}>
        <Text style={styles.titleConta}>ACESSE SUA CONTA</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCompleteType="email"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        {mensagemErro ? <Text style={styles.errorMessage}>{mensagemErro}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
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
  cadastrarButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    backgroundColor: '#ffffff',
    color: 'black',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 16,
  },
  box: {
    padding: 20,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#aa00ff',
  },
  titleConta: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ffaa00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PaginaLogin;
