// src/pages/PaginaMensagens.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import firebase from './firebaseConfig';

const PaginaMensagens = ({ navigation }) => {
  const [conversas, setConversas] = useState([]);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      const unsubscribe = firebase.firestore()
        .collection('chats')
        .where('usuarios', 'array-contains', user.uid)
        .onSnapshot(snapshot => {
          const conversasList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setConversas(conversasList);
        });

      return () => unsubscribe();
    }
  }, []);

  const abrirConversa = (conversaId) => {
    navigation.navigate('PaginaBatePapo', { conversaId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Conversas</Text>
      <FlatList
        data={conversas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.conversaItem} onPress={() => abrirConversa(item.id)}>
            <Text style={styles.conversaTitle}>{item.titulo}</Text>
          </TouchableOpacity>
        )}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#213635',
    textAlign: 'center',
    marginBottom: 16,
  },
  conversaItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  conversaTitle: {
    fontSize: 16,
  },
});

export default PaginaMensagens;
