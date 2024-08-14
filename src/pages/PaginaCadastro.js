import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { criarUsuario } from './firebaseConfig';

const PaginaCadastro = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const handleCadastro = () => {
    criarUsuario(email, senha)
      .then(() => {
        console.log("Cadastro Bem Sucedido");
        navigation.navigate('PaginaLogin');
      })
      .catch((error) => {
        setMensagemErro(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faça seu Cadastro</Text>
      <View style={styles.box}>
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
        <TextInput
          style={styles.input}
          placeholder="Repetir Senha"
          value={senha}
          secureTextEntry
        />
        {mensagemErro ? <Text style={styles.errorMessage}>{mensagemErro}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('PaginaLogin')}>
          <Text style={styles.linkText}>Já possui uma conta? Faça login aqui</Text>
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
  linkText: {
    marginTop: 20,
    color: '#348e91',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PaginaCadastro;
