import React, { ReactNode, createContext, useReducer, Dispatch, useContext } from 'react';

const Store = (initial_state: any, reducer: (state: any, action: any) => any) => {
  const storeCtx = createContext<any>(initial_state);
  const dispatchCtx = createContext<Dispatch<any>>(() => null);

  const Provider = ({ children }: { children: ReactNode }) => {
    const [store, dispatch] = useReducer(reducer, initial_state);

    return (
      <dispatchCtx.Provider value={dispatch}>
        <storeCtx.Provider value={store}>{children}</storeCtx.Provider>
      </dispatchCtx.Provider>
    );
  };

  const useStore = () => useContext(storeCtx);
  const useDispatch = () => useContext(dispatchCtx);

  if (!useStore || !useDispatch) {
    throw new Error('can not call a context outside the provider');
  }

  return { useDispatch, useStore, Provider, Consumer: storeCtx.Consumer };
};

export default Store;
