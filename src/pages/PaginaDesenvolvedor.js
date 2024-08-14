import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PaginaDesenvolvedor = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        KAIO ANDRIÃO DALFIOR &copy; 2024 TODOS OS DIREITOS RESERVADOS
      </Text>
      <Text style={styles.subText}>
        "TRABALHO DESENVOLVIDO PARA A MATÉRIA DE PROGRAMAÇÃO PARA DISPOSITIVOS MÓVEIS"
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default PaginaDesenvolvedor;
