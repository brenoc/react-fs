import React from 'react'
import App from './App'
import { Provider } from 'react-redux'
import configureStore from '../store'
import path from 'path'
import fs from 'fs'
// import MemoryFileSystem from 'memory-fs'
// const fs = new MemoryFileSystem()

const basePath = path.join(__dirname, '..', 'testDir')
const sourcePath = path.join(__dirname)

const store = configureStore()

export default function Container() {
  return (
    <Provider store={store}>
      <App fs={fs} basePath={basePath} sourcePath={sourcePath} />
    </Provider>
  )
}
