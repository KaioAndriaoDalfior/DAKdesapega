import firebase from 'firebase';
import 'firebase/auth'; 
import 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyAe_c1eVNVCXRA1-p4fCCl1xy1hljIDi4o",
  authDomain: "trabalho02-30b4b.firebaseapp.com",
  databaseURL: "https://trabalho02-30b4b-default-rtdb.firebaseio.com",
  projectId: "trabalho02-30b4b",
  storageBucket: "trabalho02-30b4b.appspot.com",
  messagingSenderId: "280855434196",
  appId: "1:280855434196:web:14d5e0981dd2e417cbfc41",
  measurementId: "G-9MB1QCE9D6"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

export const fazerLogin = (email, senha) => {
  return firebase.auth().signInWithEmailAndPassword(email, senha);
};

export const criarUsuario = (email, senha) => {
  return firebase.auth().createUserWithEmailAndPassword(email, senha);
};

export const fazerLogout = () => {
  return firebase.auth().signOut().then(() => {
    console.log("Logout realizado com sucesso!");
  }).catch((error) => {
    console.error("Erro ao fazer logout:", error.message);
    throw error;
  });
};

export const excluirProduto = async (produtoId) => {
  try {
    const user = firebase.auth().currentUser;
    if (!user) {
      throw new Error('Usuário não está autenticado.');
    }
    const produtoRef = firestore.collection('produtos').doc(produtoId);
    const produtoDoc = await produtoRef.get();
    
    if (!produtoDoc.exists) {
      throw new Error('Produto não encontrado.');
    }

    const produtoData = produtoDoc.data();
    if (produtoData.uid !== user.uid) {
      throw new Error('Você não tem permissão para excluir este produto.');
    }

    await produtoRef.delete();
    console.log('Produto excluído com sucesso.');
  } catch (error) {
    console.error('Erro ao excluir produto:', error.message);
    throw error;
  }
};

export { firestore };
export default firebase;