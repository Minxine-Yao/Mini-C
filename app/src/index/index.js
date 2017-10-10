let OFID = 0; // 为每个打开的文件分配唯一的ID
let OF_COUNTER = 0; //打开窗口数目
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
    module.exports.getFileInfo = getFileInfo;
})();

// 在文件资源管理器中选择后在编辑窗口打开文件
function openFile(fileInfo) {
    // 将文件内容存储到sessionStorage中以供编辑器初始化
    sessionStorage.setItem("content", fileInfo.content);
    // 将文件的OFID与文件路径存储到sessionStorage中形成映射
    sessionStorage.setItem("OFID-" + OFID, fileInfo.path);
 
    // 根据信息更新界面元素
    var nav = document.getElementById("opened-files");
    var pageContainer = document.getElementById("page-container");
    // 创建导航栏
    var div = document.createElement("div");
    div.className = "opened-file";
    div.id = "nav-" + OFID;
    div.innerHTML = fileNameFromPath(fileInfo.path);
    div.onclick = (e) => {
        console.log("Nav bar click event");
        // 点击导航栏切换页面
        document.getElementsByClassName("focus-page")[0].classList.remove("focus-page");
        document.getElementsByClassName("focus-nav-bar")[0].classList.remove("focus-nav-bar");
        iframe.classList.add("focus-page");
        div.classList.add("focus-nav-bar");
    };
    // 创建导航栏关闭按钮
    var a = document.createElement('a');
    a.className = "opened-file-btn";
    a.innerHTML = "×";
    a.onclick = (e) => {
        // 点击导航栏标签关闭对应页面
        e.stopPropagation();
        var navBar = e.target.parentNode;
        var ofid = parseInt(navBar.id.substr(4));
        var pageFrame = document.getElementById("page-"+ofid);
        navBar.parentNode.removeChild(navBar);
        pageFrame.parentNode.removeChild(pageFrame);
        // 寻找最近打开的文件并focus
        for(let n=ofid; n>=0; n--) {
            var pageFrame = document.getElementById("page-" + n);
            if(pageFrame) {
                // ofid为n的文件未被关闭
                var navBar = document.getElementById("nav-" + n);
                pageFrame.classList.add("focus-page");
                navBar.classList.add("focus-nav-bar");
            }
        }
        if(--OF_COUNTER === 0) {
            // 关闭了所有页面，显示初始页面
            pageContainer.style.display = "none";
            document.getElementById("opened-files").classList.remove("shadow");
        }
    };
    div.appendChild(a);
    nav.appendChild(div);

    // 创建代码编辑页面
    var iframe = document.createElement("iframe");
    iframe.src = "../editor/editor.html";
    iframe.frameBorder = 0;
    iframe.id = "page-" + OFID++;

    // 将创建的元素添加到页面中
    pageContainer.appendChild(iframe);
    // 将该页显示在最顶层
    var oldFocusPage = document.getElementsByClassName("focus-page")[0];
    if(oldFocusPage) {
        oldFocusPage.classList.remove("focus-page");
        document.getElementsByClassName("focus-nav-bar")[0].classList.remove("focus-nav-bar");
    }
    iframe.classList.add("focus-page");
    div.classList.add("focus-nav-bar");
    if(++OF_COUNTER === 1) {
        // 打开第一个页面
        pageContainer.style.display = "block";
        document.getElementById("opened-files").classList.add("shadow");
    }
}

function createFile() {

}

// 返回当前编辑页面的文档内容
function getFileInfo() {
    var iframe = document.getElementsByClassName("focus-page")[0];
    var path = sessionStorage.getItem("OFID-" + iframe.id.substr(5));
    var content = iframe.contentWindow.document.getElementsByTagName("textarea")[0].value;
    return {
        "path": path,
        "content": content
    };
}
// 从文件路径中提取文件名
function fileNameFromPath(str) {
    // 从文件路径中提取文件名
    var arr = [];
    if (str.indexOf('\\') !== -1)
        arr = str.split('\\');
    else
        arr = str.split('\/');
    return arr[arr.length - 1];
}