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
        dialog.showErrorBox("打开文件错误", err.message)
    } else {
        filePath = filePaths[0]; //暂时只实现打开一个文件的功能
        fs.readFile(filePath, 'utf-8', (err, fileData) => {
            // 打开文件错误
            if (err) {
                dialog.showErrorBox("打开文件错误", err.message)
            } else {
                // 更新界面
                var fileName = fileNameFromPath(filePath);
                editWindow.openFile({
                    "fileName": fileName,
                    "fileData": fileData
                });
            }
        });
    }
}
function openFolder() { }
function setting() { }

function fileNameFromPath(str) {
    // 从文件路径中提取文件名
    var arr = [];
    if (str.indexOf('\\') !== -1)
        arr = str.split('\\');
    else
        arr = str.split('\/');
    return arr[arr.length - 1];
}

module.exports.createFile = createFile;
module.exports.openFile = openFile;
module.exports.openFolder = openFolder;
module.exports.setting = setting;