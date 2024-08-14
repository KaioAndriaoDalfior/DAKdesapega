import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import firebase from './firebaseConfig';

const PaginaLogado = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    firebase.auth().signOut()
      .then(() => {
        navigation.navigate('PaginaLogin');
      })
      .catch((error) => {
        Alert.alert('Erro', error.message);
      });
  };

  const handleLogin = () => {
    navigation.navigate('PaginaLogin');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./logo.png')} style={styles.logo} />
        {!user && (
          <View style={styles.authButtons}>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.loginButton}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PaginaCadastro')}>
              <Text style={styles.cadastrarButton}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Text style={styles.title}>O MELHOR SITE DE DESAPEGA DO BRASIL!</Text>
      <View style={styles.content}>
        {user && (
          <View style={styles.box}>
            <Text style={styles.welcomeText}>Olá {user.email}, o que deseja fazer?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PaginaCadastroProduto')}>
                <Text style={styles.buttonText}>ANUNCIAR NOVO PRODUTO</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PaginaListaProdutos')}>
                <Text style={styles.buttonText}>VER MEUS ANÚNCIOS</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PaginaMensagens')}>
                <Text style={styles.buttonText}>MENSAGENS</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>LOGOUT</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  authButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
  },
  cadastrarButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    backgroundColor: '#ffffff',
    color: '#348e91', 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#213635',
    textAlign: 'center',
    marginBottom: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
  },
  box: {
    padding: 20,
    margin: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#aa00ff',
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#213635',
  },
  buttonContainer: {
    width: '100%',
  },
  loginButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#cccccc', 
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  button: {
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#aa00ff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaginaLogado;
