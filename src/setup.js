import { jsdom } from 'jsdom'

const exposedProperties = ['window', 'navigator', 'document']

global.document = jsdom('<!doctype html><html><body><div id="app"></div></body></html>')
global.window = document.defaultView

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property)
    global[property] = document.defaultView[property]
  }
})

global.navigator = {
  userAgent: 'node.js',
}
