import React from 'react'
import Calculator from './components/Calculator/Calculator'

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="app">
        <Calculator />
      </div>
    )
  }
}
