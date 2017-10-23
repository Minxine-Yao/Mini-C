function initMenu(window) {
    // 根据不同的场景禁用/启用菜单项
    var editEnable = false;
    var runEnable = false;
    switch(window){
        case 'index':
            //do nothing
            break;
        case 'editor':
            editEnable = true;
            runEnable = true;
            break;
        default:
            break;
    }
    // 导入相应的功能模块
    var file = require('./file.js');
    var edit = require('./edit.js');
    var run = require('./run.js');
    // 设置菜单
    const Menu = require('electron').remote.Menu;
    const template = [
        {
            label: '文件',
            submenu: [
                {
                    label: '新建文件',
                    accelerator: 'CmdOrCtrl+N',
                    click: file.createFile
                },
                {
                    label: '打开文件',
                    accelerator: 'CmdOrCtrl+O',
                    click: file.openFile
                },
                {
                    label: '打开文件夹',
                    click: file.openFolder
                },
                {
                    label: '保存文件',
                    accelerator: 'CmdOrCtrl+S',
                    click: file.saveFile
                },
                {
                    label: '设置',
                    click: file.setting
                }
            ]
        },
        {
            label: '编辑',
            submenu: [
                {
                    label: '注释选中行',
                    accelerator: 'CmdOrCtrl+/',
                    enabled: editEnable,
                    click: edit.commentLineSelected
                },
                {
                    label: '跳转到行',
                    accelerator: 'CmdOrCtrl+G',
                    enabled: editEnable,
                    click: edit.goToLine
                },
                {
                    label: '在行前插入',
                    accelerator: 'Shift+CmdOrCtrl+Enter',
                    enabled: editEnable,
                    click: edit.insertBeforeLine
                },
                {
                    label: '在行后插入',
                    accelerator: 'CmdOrCtrl+Enter',
                    enabled: editEnable,
                    click: edit.insertAfterLine
                }
            ]
        },
        {
            label: '调试',
            enabled: false,
            submenu: [
                {
                    label: 'Run Compiler',
                    click: run.compile
                },
                {
                    label: 'Run Assembler',
                    enabled: runEnable,
                    click: run.assemble
                }
            ]
        },
        {
            label: '帮助',
            submenu: [
                {
                    label: '关于',
                    click: ()=>{
                        const {app, dialog} = require('electron').remote;
                        dialog.showMessageBox({
                            title: `Mini-C v${app.getVersion()}`,
                            message: `Node version: ${process.versions.node}\n`+
                                `Chrome version: ${process.versions.chrome}\n`+
                                `Electron version: ${process.versions.electron}\n`+
                                `email: seuhuangziyao@outlook.com`
                        });
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

module.exports.initMenu = initMenu;
