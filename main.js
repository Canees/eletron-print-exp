const {
  app, BrowserWindow, Menu, ipcMain
} = require('electron')// 引入electron
// ----------------窗口init-------------
let win = null
let loadingWin = null
let print = null
Menu.setApplicationMenu(null) // 去掉菜单栏
app.commandLine.appendSwitch('wm-window-animations-disabled') // 拖动闪屏
// 创建loading 窗口
const showLoading = () => {
  loadingWin = new BrowserWindow({
    frame: false, // 无边框（窗口、工具栏等），只包含网页内容
    width: 200,
    height: 200,
    resizable: false,
    center: true,
    alwaysOnTop: true,
    transparent: true // 窗口是否支持透明，如果想做高级效果最好为true
  })
  loadingWin.loadFile('loading/index.html')
  loadingWin.on('close', () => {
    loadingWin = null
  })
}
// 创建主程序 窗口
const createWindow = () => {
  win = new BrowserWindow({
    maxWidth: 1920,
    maxHeight: 1080,
    minWidth: 1620,
    minHeight: 900,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false // 去掉跨越
    },
    show: false
  })// 创建一个窗口
  // 在窗口内要展示的内容index.html 就是打包生成的index.html
  win.loadFile('dist/index.html')
  // 开启调试工具
  win.webContents.openDevTools()
  // 事件监听
  win.on('close', () => {
    // 回收BrowserWindow对象
    win = null
    print = null
  })
}
// 创建打印窗口=>宽高根据主窗口宽高80%定
const createPrint = () => {
  // 获取主窗口宽高
  // const winWH = win.getBounds()
  // const winWidth = 0
  // const winHeight = 0

  // console.log(6666, winWH)
  print = new BrowserWindow({
    width: 1310,
    height: 860,
    frame: false,
    resizable: false,
    center: true,
    transparent: true,
    show: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false
    }
  })// 创建一个窗口
  print.loadFile('dist/print.html')
  // print.webContents.openDevTools()
  print.on('close', () => {
    // 回收BrowserWindow对象
    print = null
  })
}

//  --------------事件监听fn-------------
// 事件监听
app.on('ready', async () => {
  showLoading()
  createWindow()
  createPrint()
  // 监听渲染进行
  ipcMain.once('close-loading', () => {
    loadingWin.close()
    win.show()
  })

  // 监听打开print
  ipcMain.on('openPrint', (event, data) => {
    // TODO: 页面数据生成PDF

    // TODO: 数据回传打印组件

    // 显示打印组件
    print.show()

    console.log('open', data)
  })

  // 监听关闭print
  ipcMain.on('closePrint', (event, data) => {
    console.log('close', data)
    // 显示打印组件
    print.hide()
  })
})

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (win == null) {
    createWindow()
  }
})