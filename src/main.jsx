import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GameProvider } from "./context/game/GameContext.jsx";
import { ChakraProvider } from '@chakra-ui/react'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
      <GameProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </GameProvider>
 // </React.StrictMode>,
)
