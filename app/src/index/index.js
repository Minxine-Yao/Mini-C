// 为每个打开的文件分配唯一的ID
let OFID = 0;
var file = require('../modules/file');
var initMenu = require('../modules/initMenu.js').initMenu;

(()=>{
    // 初始化菜单
    initMenu('index');
    // 为主页上的链接按钮添加事件处理函数
    document.getElementById("open-file").onclick = file.openFile;
    document.getElementById("create-file").onclick = file.createFile;
    module.exports.openFile = openFile;
    module.exports.createFile = createFile;
})();

// 在文件资源管理器中选择后在编辑窗口打开文件
function openFile(fileInfo) {
    console.log(fileInfo);
    // 将文件内容存储到sessionStorage中以供编辑器初始化
    sessionStorage.setItem("fileData", fileInfo.fileData);
    // 根据信息更新界面元素
    var nav = document.getElementById("opened-files");
    var pageContainer = document.getElementById("page-container");
    // 导航栏
    var div = document.createElement("div");
    div.className = "opened-file";
    div.id = "nav-" + OFID;
    div.innerHTML = fileInfo.fileName;
    // 导航栏关闭按钮
    var a = document.createElement('a');
    a.className = "opened-file-btn";
    a.innerHTML = "×";
    a.onclick = (e) => {
        // 点击导航栏标签关闭对应页面
        var navBar = e.target.parentNode;
        var pageFrame = document.getElementById("page-"+navBar.id.substr(4));
        navBar.parentNode.removeChild(navBar);
        pageFrame.parentNode.removeChild(pageFrame);
    };
    div.appendChild(a);
    nav.appendChild(div);
    // 代码编辑页面
    var iframe = document.createElement("iframe");
    iframe.src = "../editor/editor.html";
    iframe.frameBorder = 0;
    iframe.id = "page-" + OFID++;
    // iframe.style.zIndex = 50 + OFID++;
    pageContainer.appendChild(iframe);
}

function createFile() {

}