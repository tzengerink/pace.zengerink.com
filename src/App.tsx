import React from 'react'
import Calculator from './Calculator'
import './App.css'

interface AppProps {}

interface AppState {}

export default class App extends React.Component<AppProps, AppState> {
  render() {
    return (
      <div className="app">
        <Calculator />
      </div>
    )
  }
}