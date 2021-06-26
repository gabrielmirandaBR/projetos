import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function useAuth() {
  const value = useContext(AuthContext); // hook para utilizar o contexto criado https://pt-br.reactjs.org/docs/hooks-reference.html#usecontext

  return value;
}
