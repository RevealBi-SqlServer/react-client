import { createContext, Dispatch, useContext, useEffect, useState } from 'react';

export const GlobalContext = createContext<{globalState: GlobalStateInterface, 
      setGlobalState: Dispatch<React.SetStateAction<GlobalStateInterface>>}>(undefined as any);
export const useGlobalContext = () => useContext(GlobalContext);

export const useGlobalState = () => {
  const initialState = {
  } as GlobalStateInterface;

  const [globalState, setGlobalState] = useState<GlobalStateInterface>(initialState);

  useEffect(() => { 
  }, [globalState.revealServer]);

  return { globalState, setGlobalState };
};

interface GlobalStateInterface {
  revealServer: string;
}
