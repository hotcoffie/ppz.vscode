import $ from '../../script/ppz-query.js'
import Mysql from './connection/mysql.js'
import Sqlite3 from './connection/sqlite3.js'
import Postgresql from './connection/postgresql.js'

export default function Form(state) {
  // 所有连接
  const conns = [
    Mysql,
    Sqlite3,
    Postgresql
  ].map(
    (Connection, index) =>
      Connection(function onSelect(data) {
        state.value = data
        conns[selectedIndex].$selectorOption.classList.remove('selected') // 旧的去除
        conns[selectedIndex].$forms.classList.remove('selected') // 旧的去除
        selectedIndex = index
        conns[selectedIndex].$selectorOption.classList.add('selected') // 新的添加
        conns[selectedIndex].$forms.classList.add('selected') // 新的添加
      })
  )

  // 初始化：当前选中状态
  var selectedIndex = 0
  if(state.value) {
    // 恢复关闭前的状态
    selectedIndex = conns.findIndex(conn => conn.data.client == state.value.client)
    for(const key in state.value)
      conns[selectedIndex].data[key] = state.value[key]
  }

  // 设置初始选中状态
  conns[selectedIndex].select()

  return $.Div('form-container', [
    $.Div('client-selector', conns.map(conn => conn.$selectorOption)),
    ...conns.map(conn => conn.$forms)
  ])
}