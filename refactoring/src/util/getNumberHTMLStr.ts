export default function getNumerHTMLStr(number) {
  const secondNums = ('000' + number).slice(-3).split('')

  return `
        <img src="./img/d${secondNums[0]}.bmp" alt="">
        <img src="./img/d${secondNums[1]}.bmp" alt="">
        <img src="./img/d${secondNums[2]}.bmp" alt="">
    `
}
