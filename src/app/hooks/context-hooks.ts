import { createContext, Dispatch, useContext, useEffect, useState } from 'react';

declare var $: any;

export const GlobalContext = createContext<{globalState: GlobalStateInterface, 
      setGlobalState: Dispatch<React.SetStateAction<GlobalStateInterface>>}>(undefined as any);
export const useGlobalContext = () => useContext(GlobalContext);

export const useGlobalState = () => {
  const initialState = {
  } as GlobalStateInterface;

  const [globalState, setGlobalState] = useState<GlobalStateInterface>(initialState);

  useEffect(() => {
   // $.ig.RevealSdkSettings.setBaseUrl("http://localhost:5111");
    
  }, [globalState.revealServer]);

  return { globalState, setGlobalState };
};

interface GlobalStateInterface {
  revealServer: string;
}
