const { prompt } = require('enquirer')
const chalk = require('chalk')
const fs = require('fs-extra')
const pathBaseArr = ['api', 'components', 'layout', 'store/modules', 'utils', 'views']
const assetsArr = ['assets', 'icons', 'utils', 'styles']
async function begin() {
  console.log(chalk.green.bold('this operation will cover target directory'))
  const response = await prompt({
    type: 'input',
    name: 'path',
    message: chalk.red.bold('please input target path?')
  })
  pathBaseArr.forEach(item => {
    const srcPath = (`./src/${item}/base/`)
    const dstPath = (`../${response.path}/src/${item}/base/`)
    copy(srcPath, dstPath)
  })
  assetsArr.forEach(item => {
    const srcPath = (`./src/${item}/`)
    const dstPath = (`../${response.path}/src/${item}/`)
    copy(srcPath, dstPath)
  })
  console.log('copy success!')
}

async function copy(src, dest) {
  try {
    await fs.copy(src, dest)
  } catch (err) {
    console.error(err)
  }
}

begin()

