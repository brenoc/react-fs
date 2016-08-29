import { Component, createElement, PropTypes } from 'react'
import hoistStatics from 'hoist-non-react-statics'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default function connect() {
  return function wrapWithConnect(WrappedComponent) {
    const connectDisplayName = `Connect(${getDisplayName(WrappedComponent)})`

    class Connect extends Component {
      constructor(props, context) {
        super(props, context)
        this.fs = props.fs || context.fs
      }

      render() {
        return (
          createElement(WrappedComponent, {
            ...this.fs,
            ...this.props,
            ref: 'wrappedInstance',
          })
        )
      }
    }

    Connect.displayName = connectDisplayName
    Connect.WrappedComponent = WrappedComponent

    Connect.contextTypes = {
      fs: PropTypes.object,
    }

    Connect.propTypes = {
      fs: PropTypes.object,
    }

    return hoistStatics(Connect, WrappedComponent)
  }
}
