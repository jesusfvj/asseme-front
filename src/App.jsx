import React from 'react'
import Router from './Router';
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './Context/UserContext/UserContext'
import { Layout } from './Components/BaseComponents/Layout';

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
