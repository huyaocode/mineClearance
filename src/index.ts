import classFactory from './ClassFactory'

const initDifficulty = 'Easy'

try {
  window['difficulty'] = initDifficulty
  const director = classFactory(`Director${initDifficulty}`)
  director.construct('app')
} catch (e) {
  console.error(e)
}
