import classFactory from './ClassFactory'

const initDifficulty = 'Easy'

try {
  window['difficulty'] = initDifficulty
  const director = classFactory(`Director${initDifficulty}`)
  director.construct('app')
} catch (e) {
  console.error(e)
}

/**
 * TODO
 *
 * 当旗子用完自动变成 '?'
 * 展示难度
 */
