import { Component, PropTypes, Children } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeFile } from '../ducks/fileSystem'
import MemoryFileSystem from 'memory-fs'

class FileSystem extends Component {
  constructor(props, context) {
    super(props, context)
    this.fs = props.fs || (new MemoryFileSystem())

    this.state = {
      fileSystemVersion: props.fileSystemVersion,
    }
  }

  getChildContext() {
    return {
      fs: this.fs,
      path: this.props.basePath || '/',
    }
  }

  componentWillUmount() {
    this.watcher.close()
    // stops emitting events and closes all watchers
  }

  render() {
    console.log('Rendering File System')
    return Children.only(this.props.children)
  }
}

FileSystem.childContextTypes = {
  fs: PropTypes.object,
  path: PropTypes.string,
}

FileSystem.propTypes = {
  fs: PropTypes.object,
  fileSystemVersion: PropTypes.number,
  changeFile: PropTypes.func,
  basePath: PropTypes.string,
  sourcePath: PropTypes.string,
  children: PropTypes.any,
}

function mapStateToProps(state) {
  return {
    fileSystemVersion: state.fileSystem.version,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeFile: bindActionCreators(changeFile, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileSystem)
