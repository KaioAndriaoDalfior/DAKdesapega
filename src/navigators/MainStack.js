import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PaginaPrincipal from '../pages/PaginaPrincipal';
import PaginaLogin from '../pages/PaginaLogin';
import PaginaCadastro from '../pages/PaginaCadastro';
import PaginaLogado from '../pages/PaginaLogado';
import PaginaCadastroProduto from '../pages/PaginaCadastroProduto';
import PaginaListaProdutos from '../pages/PaginaListaProdutos';
import PaginaExcluirProduto from '../pages/PaginaExcluirProduto';
import PaginaDesenvolvedor from '../pages/PaginaDesenvolvedor';
import PaginaMensagens from '../pages/PaginaMensagens';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="PaginaPrincipal">
      <Stack.Screen
        name="PaginaPrincipal"
        component={PaginaPrincipal}
        options={{ title: 'Página Principal' }}
      />
      <Stack.Screen
        name="PaginaLogin"
        component={PaginaLogin}
        options={{ title: 'Login' }}
      />
      <Stack.Screen
        name="PaginaCadastro"
        component={PaginaCadastro}
        options={{ title: 'Cadastro' }}
      />
      <Stack.Screen
        name="PaginaLogado"
        component={PaginaLogado}
        options={{ title: 'Bem-vindo' }}
      />
      <Stack.Screen
        name="PaginaListaProdutos"
        component={PaginaListaProdutos}
        options={{ title: 'Lista de Produtos' }}
      />
      <Stack.Screen
        name="PaginaCadastroProduto"
        component={PaginaCadastroProduto}
        options={{ title: 'Cadastrar Produto' }}
      />
      <Stack.Screen
        name="PaginaExcluirProduto"
        component={PaginaExcluirProduto}
        options={{ title: 'Excluir Produtos' }}
      />
      <Stack.Screen
        name="PaginaDesenvolvedor"
        component={PaginaDesenvolvedor}
        options={{ title: 'Desenvolvedor' }}
      />
      <Stack.Screen
        name="PaginaMensagens"
        component={PaginaMensagens}
        options={{ title: 'Mensagens' }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
