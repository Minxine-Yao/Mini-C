function compile(){
    // 保存当前已编辑的文件
    require('./file.js').saveFile();
    // 调用编译器程序
    var currentFileInfo = require('../index/index.js').getFileInfo();
    var exec = require('child_process').exec;
    exec('src\\modules\\ucl ' + currentFileInfo.path, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error.message}`);
          return;
        }
        const {dialog} = require('electron').remote;
        if (stdout === "Compile successfully"){  // 编译无错误
            dialog.showMessageBox({
                title: `编译成功`,
                message: `asm文件路径：${currentFileInfo.path.slice(0, -2)}.asm`
            });
        } else {  // 编译出错，显示错误信息
            errorCount = parseInt(stderr);
            errorFilePath = currentFileInfo.path.slice(0, -2) + '.err';
            var fs = require('fs');
            fs.readFile(errorFilePath, 'utf-8', (err, content) => {
                if(err) {
                    dialog.showErrorBox("打开文件错误" + errorFilePath, "无法读取编译错误输出信息");
                } else {
                    dialog.showErrorBox("编译错误", content);
                }
            });
            // 删除错误信息
            fs.unlink(errorFilePath, (err) => {
                dialog.showErrorBox("清空错误信息失败", err.message);
            });

        }
    });
}
function assemble(){}

module.exports.compile = compile;
module.exports.assemble = assemble;