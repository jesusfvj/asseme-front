import React from 'react'
import Router from './Router';
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './Context/UserContext/UserContext'
import { Layout } from './Components/BaseComponents/Layout';
import { UIProvider } from './Context/UI/UIContext';

function App() {

  return (
    <UserProvider>
      <UIProvider>
        <BrowserRouter>
          <Layout>
            <Router />
          </Layout>
        </BrowserRouter>
      </UIProvider>
    </UserProvider>
  )
}

export default App
