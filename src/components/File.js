import React, { Component, PropTypes } from 'react'

const SUMMARY_LENGTH = 100
function getDataSummary(data) {
  if (data.length > SUMMARY_LENGTH) {
    return data.slice(0, SUMMARY_LENGTH) + '...'
  }

  return data
}

class File extends Component {
  constructor(props, context) {
    super(props, context)

    this.fs = context.fs
    this.path = context.path + '/' + props.name
  }

  componentWillUmount() {
    this.fs.unlinkSync(this.path)
  }

  render() {
    console.log('File content:', this.props.data)
    this.fs.writeFileSync(this.path, this.props.data, { flag: 'w' })

    return (
      <li>{this.props.name}: {getDataSummary(this.props.data)}</li>
    )
  }
}

File.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  options: PropTypes.object,
}

File.contextTypes = {
  fs: PropTypes.object,
  path: PropTypes.string,
}

export default File
