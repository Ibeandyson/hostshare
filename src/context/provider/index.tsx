import React, { ReactNode, FC } from 'react';
import { Provider as PropertyProvider } from '../reducers/propertyReducer';

interface Props {
  children: ReactNode;
}

const GlobalProvider: FC<Props> = ({ children }) => {
  return (
    <>
      <PropertyProvider>{children}</PropertyProvider>
    </>
  );
};

export default GlobalProvider;
