import firebase from './firebaseConfig';

export const fazerLogin = async (email, senha) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, senha);
    console.log('Usuário logado com sucesso.');
  } catch (error) {
    console.error('Erro ao fazer login:', error.message);
    throw error;
  }
};

export const criarUsuario = async (email, senha) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, senha);
    console.log('Usuário criado com sucesso.');
  } catch (error) {
    console.error('Erro ao criar usuário:', error.message);
    throw error;
  }
};

export const fazerLogout = async () => {
  try {
    await firebase.auth().signOut();
    console.log('Logout realizado com sucesso!');
  } catch (error) {
    console.error('Erro ao fazer logout:', error.message);
    throw error;
  }
};

export const monitorarEstadoAutenticacao = (callback) => {
  return firebase.auth().onAuthStateChanged(callback);
};
