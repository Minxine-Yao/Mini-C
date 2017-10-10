var fs = require('fs');
var editWindow = require('../index/index.js');
const { dialog } = require('electron').remote;

let openedFileWindows = []; //保存所有已打开文件窗口的引用

function createFile() { }

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
        dialog.showErrorBox("打开文件错误", "获取文件路径错误")
    } else {
        filePath = filePaths[0]; //暂时只实现打开一个文件的功能
        fs.readFile(filePath, 'utf-8', (err, content) => {
            // 打开文件错误
            if (err) {
                dialog.showErrorBox("打开文件错误", err.message);
            } else {
                // 更新界面
                editWindow.openFile({
                    "path": filePath,
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

module.exports.createFile = createFile;
module.exports.openFile = openFile;
module.exports.openFolder = openFolder;
module.exports.saveFile = saveFile;
module.exports.setting = setting;