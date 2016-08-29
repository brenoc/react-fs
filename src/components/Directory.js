import React, { Component, Children, PropTypes } from 'react'

function getPath(props, context) {
  return context.path !== '/' ? context.path + '/' + props.name : '/' + props.name
}

class Directory extends Component {
  constructor(props, context) {
    super(props, context)

    this.fs = context.fs
    this.path = getPath(props, context)
  }

  getChildContext() {
    return { path: this.path }
  }

  componentWillUmount() {
    this.fs.rmdirSync(this.path)
  }

  render() {
    try {
      this.fs.mkdirSync(this.path)
    } catch (e) {
      if (e.code !== 'EEXIST') {
        throw new Error(e)
      }
    }

    return (
      <div>
        {this.path}
        <ul>
          {Children.map(this.props.children, (child) => child)}
        </ul>
      </div>
    )
  }
}

Directory.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
}

Directory.childContextTypes = {
  path: PropTypes.string,
}

Directory.contextTypes = {
  fs: PropTypes.object,
  path: PropTypes.string,
}

export default Directory
