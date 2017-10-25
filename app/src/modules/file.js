var fs = require('fs');
var editWindow = require('../index/index.js');
const { dialog } = require('electron').remote;

let openedFileWindows = []; //保存所有已打开文件窗口的引用

function createFile() {
    var path = dialog.showSaveDialog({
        "title": "创建新文件",
        "filters":[{ name: 'Mini-C File', extensions: ['c'] }]
    });
    if(path === undefined) {
        dialog.showErrorBox("Error", "创建新文件失败");
    } else {
        editWindow.openFile({
            "path": path,
            "content": ""
        });
    }
}

function openFile() {
    // 从文件资源管理器中打开文件
    var filePaths = dialog.showOpenDialog({
        // to-do: defalutPath: ,
        filters: [{ name: 'Mini-C File', extensions: ['c'] }],
        properties: [
            'openFile',
            'showHiddenFiles'
        ]
    });
    if(filePaths === undefined) {
        dialog.showErrorBox("Error", "打开文件错误")
    } else {
        filePath = filePaths[0]; //暂时只实现打开一个文件的功能
        fs.readFile(filePath, 'utf-8', (err, content) => {
            // 打开文件错误
            if (err) {
                dialog.showErrorBox("Error", err.message);
            } else {
                // 更新界面
                editWindow.openFile({
                    "path": filePath,
                    // "content": reformatContent(content)
                    "content": content
                });
            }
        });
    }
}
// to-do：打开文件夹功能
function openFolder() { }

// 保存文件
function saveFile() {
    // 获取
    var fileInfo = editWindow.getFileInfo();
    fs.writeFile(fileInfo.path, fileInfo.content, 'utf-8', (err) => {
        if (err) {
            dialog.showErrorBox("保存文件失败", err.message);
        } else {
            // to-do：提示用户文件保存成功
            console.log("save file sucessfully!");
        }
    });
}

function setting() { }

/**
 * 由于'\n'在contentEditable为true的元素中并不被解释为换行，故需要修改为用div元素包裹的形式
 * 
 * @param {any} content 
 */
function reformatContent(content) {
    var lines = content.split('\n');
    var newFormatContent = lines[0];
    for(let n=1; n<lines.length; n++) {
        if(lines[n] === ''){
            newFormatContent += `<div><br></div>`;
            continue;
        }
        newFormatContent += `<div>${lines[n]}</div>`;
    }
    return newFormatContent;
}

module.exports.createFile = createFile;
module.exports.openFile = openFile;
module.exports.openFolder = openFolder;
module.exports.saveFile = saveFile;
module.exports.setting = setting;