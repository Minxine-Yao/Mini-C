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
            // 解禁汇编功能
            require('electron').remote.Menu.getApplicationMenu().items[2].submenu.items[1].enabled = true
            var asmFilePath = currentFileInfo.path.slice(0, -2) + '.asm';
            console.log(asmFilePath);
            sessionStorage.setItem('asmFilePath', asmFilePath);
            dialog.showMessageBox({
                title: `编译成功`,
                message: `asm文件路径：${asmFilePath}`
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
function assemble() {
    var asmFilePath = sessionStorage.getItem('asmFilePath');
    const {spawn} = require('child_process');
    // const res = spawn('ASMF', [asmFilePath]);
    const res = spawn(process.cwd()+'\\src\\modules\\asmf', [asmFilePath]);
    // const res = spawn(process.cwd() + '\\src\\modules\\asmf', [asmFilePath]);
    const {dialog} = require('electron').remote;
    res.on('error', (error) => {
        console.error(error);
    });
    res.stdout.on('data', (stdout) => {
        // 汇编无错误
        dialog.showMessageBox({
            title: `汇编成功`,
            message: `coe文件路径：${asmFilePath.slice(0, -4)}.coe`
        });
    });
    res.stderr.on('data', (stderr) => {
        // errorCount = parseInt(stderr);
        console.log(stderr);
        errorFilePath = asmFilePath.slice(0, -4) + '.asm_err';
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
    });
}

module.exports.compile = compile;
module.exports.assemble = assemble;