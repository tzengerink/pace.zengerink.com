import React, { ReactElement } from 'react'
import Calculator from './features/Calculator/Calculator'
import './App.scss'

const App = (): ReactElement => {
  return (
    <div className="app">
      <Calculator />
    </div>
  )
}

export default App
