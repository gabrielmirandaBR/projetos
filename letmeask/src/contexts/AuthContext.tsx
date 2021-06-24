import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
  id: string,
  name: string,
  avatar: string,
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>, // função que retorna uma Promise sem retorno
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType); // hook utilizado para criar contexto

export function AuthContextProvider (props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>(); // useState irá usar os parâmetros de User, por isso <User>

  useEffect(() => { // 1 parametro = qual funcao quer executar | 2 paramentro = quando será executada(sempre um array). se for vazio, siginifica que a função será executada uma unica vez, similar ao componentDidMount
    const unsubscribe = auth.onAuthStateChanged( user => { // funcao do firebase - observador para identificar o usuário https://firebase.google.com/docs/auth/web/manage-users
      if(user) {
        const { displayName, photoURL, uid } = user;

        if(!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      };
    });

    return () => {  // Para fazer com que o eventListener pare sua função, ou seja, depois que o componente for desmontado parar de chamar a funcao  (boa prática)
      unsubscribe();
    }
  }, [])


  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider(); // chama as funções do firebase ( faz uma nova requisição )

    const result = await auth.signInWithPopup(provider); // função do firebase que irá abrir um pop-up para realizar um o signIn

    if(result.user) {
      const { displayName, photoURL, uid } = result.user;

      if(!displayName || !photoURL) { // caso não tenha foto ou nome
        throw new Error('Missing information from Google Account.');
      } 

      setUser({ // seta o estado com as informações vindas da função do firebase
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }
  
  return (
    <AuthContext.Provider value={ { user, signInWithGoogle } }>
      { props.children }
    </AuthContext.Provider>

  )
}
