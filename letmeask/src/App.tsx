import {createContext, useState} from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { auth, firebase } from './services/firebase';


type User = {
  id: string,
  name: string,
  avatar: string,
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>, // função que retorna uma Promise sem parâmetro
}

export const AuthContext = createContext({} as AuthContextType);


  function App() {
    const [user, setUser] = useState<User>(); // useState irá usar os parâmetros de User, por isso <User>


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
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/rooms/new" component={ NewRoom }/>
        <NewRoom />
      </Switch>
    </AuthContext.Provider>
  );
}

export default App;
