// import './setup'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './components/App'
import { Provider } from 'react-redux'
import configureStore from './store'
import path from 'path'
import fs from 'fs'
// import MemoryFileSystem from 'memory-fs'
// const fs = new MemoryFileSystem()

export default function init() {
  const basePath = path.join(__dirname, '..', 'testDir')
  const sourcePath = path.join(__dirname)

  const store = configureStore()

  ReactDOMServer.renderToString(
    <Provider store={store}>
      <App fs={fs} basePath={basePath} sourcePath={sourcePath} />
    </Provider>
  )

  const previousVersion = 0
  store.subscribe(() => {
    if (previousVersion !== store.getState().version) {
      const NextApp = require('./components/App').default
      ReactDOMServer.renderToString(
        <Provider store={store}>
          <NextApp />
        </Provider>
      )
    }
  })
}
