import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import FileSystem from './FileSystem'
import File from './File'
import Directory from './Directory'

function App({ fs, basePath, sourcePath }) {
  return (
    <FileSystem fs={fs} basePath={basePath} sourcePath={sourcePath}>
      <Directory name={'myTestDir'}>
        <File name={'README.md'} data={'apss?!'} />
      </Directory>
    </FileSystem>
  )
}

App.propTypes = {
  fs: PropTypes.object,
  fileSystemVersion: PropTypes.number,
  basePath: PropTypes.string,
  sourcePath: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    fileSystemVersion: state.fileSystem.version,
  }
}

export default connect(
  mapStateToProps,
)(App)
