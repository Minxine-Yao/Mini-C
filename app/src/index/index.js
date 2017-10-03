// 初始化菜单
var initMenu = require('../modules/initMenu.js').initMenu;
initMenu('index');
// 为主页上的链接按钮添加事件处理函数
var file = require('../modules/file');
document.getElementById("open-file").onclick = () => {file.openFile()};
document.getElementById("create-file").onclick = () => {file.createFile()};