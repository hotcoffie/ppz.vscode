const system = require('../model/system')
const Collection = require('../model/collection/index')
const initTreeview = require('../view/treeview')
const initCommand = require('../command')
const { noty } = require('../utils')

async function init() {
  // 注册命令
  initCommand()

  if(system.newInstall()) {
    console.log('first install')
    await system.save({
      version: '0.0.0'
    })
  }
  
  // 检查数据
  Collection.instances.forEach(ins => {
    const data = ins.getAllData()
    try {
      ins.validate(data)
    } catch(e) {
      noty.error('数据校验失败')
      console.error('数据校验失败', data)
      throw e
    }
  })

  const systemInfo = system.getAllData()
  console.log('system info', systemInfo)

  // 左侧的 treeview
  initTreeview()
}

module.exports = init