import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
  id: string,
  name: string,
  avatar: string,
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>, // função que retorna uma Promise sem parâmetro
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider (props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>(); // useState irá usar os parâmetros de User, por isso <User>

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( user => {
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

    return () => {  // Para fazer com que o eventListener pare sua função (boa prática)
      unsubscribe();
    }
  }, []) // 1 parametro = qual funcao quer executar | 2 paramentro = quando será executada(sempre um array) vazio, siginifica que a função será executada uma única vez


  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if(result.user) {
      const { displayName, photoURL, uid } = result.user;

      if(!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.');
      } 

      setUser({
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