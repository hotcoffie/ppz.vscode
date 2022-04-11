const UpsertConnectionWebview = require('../view/web/upsert-connection')
const openTableWebview = require('../view/web/table')
const service = require('../service/connection')
const { noty } = require('../utils')
const connectionTreeview = require('../view/treeview/connection')

exports.openTable = openTableWebview

exports.addConnection = function() {
  new UpsertConnectionWebview()
}

exports.refreshConnections = connectionTreeview.refreshConnections
exports.refreshConnection = connectionTreeview.refreshConnection
exports.refreshDatabase = connectionTreeview.refreshDatabase

exports.editConnection = async function(el) {
  if(el && el.type == 'connection' && el.options && el.options.id)
    new UpsertConnectionWebview(el.options)
  else
    noty.error('请从左侧 treeview 里选择并更新连接')
}

exports.deleteConnection = async function(el) {
  if(el && el.type == 'connection' && el.options && el.options.id) {
    try {
      await service.drop(el.options.id) // 从数据库删除
      connectionTreeview.drop(el) // 更新 treeview
    } catch(err) {
      const msg = '连接删除时发生意外'
      console.error(msg, err)
      noty.fatal(msg)
    }
  } else {
    noty.error('请从左侧 treeview 里删除连接')
  }
}