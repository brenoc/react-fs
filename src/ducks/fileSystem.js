import watch from '../components/watcher'
import walk from 'fs-walk'
import path from 'path'

function getFilesAndDirectories(sourcePath) {
  const result = { files: [], directories: [] }
  walk.walkSync(sourcePath, function(basedir, filename, stat) {
    let perm = path.join(basedir, filename)
    if (stat.isDirectory()) {
      result.directories.push(perm)
    } else {
      result.files.push(perm)
    }
  })

  return result
}

// Actions
const namespace = 'react-fs/fileSystem/'
const CHANGE_FILE = namespace + 'CHANGE_FILE'
const WATCH_DIR = namespace + 'WATCH_DIR'

// Action Creators
export function watchDir(directory) {
  return (dispatch, getState) => {
    const state = getState()

    if (state.watcher) {
      state.watcher.close()
    }

    const { files, directories } = getFilesAndDirectories(directory)
    const watcher = watch(files, directories)
    watcher.on('change', changeFile)
    watcher.on('aggregated', changeFile)

    dispatch({
      type: WATCH_DIR,
      watcher,
    })
  }
}

export function changeFile(filePath, mtime) {
  return {
    type: CHANGE_FILE,
    filePath,
    mtime,
  }
}

// Reducer
const initialState = {
  version: 0,
}

export default function fileSystem(state = initialState, action) {
  switch (action.type) {
    case WATCH_DIR:
      return {
        watcher: action.watcher,
      }

    case CHANGE_FILE:
      return {
        version: state.version + 1,
      }

    default:
      return state
  }
}
