(()=>{
    // 初始化CodeMirror
    var fileData = sessionStorage.getItem("content");
    var textarea = document.getElementsByClassName("editor")[0];
    var editor = CodeMirror.fromTextArea(textarea,{
        value: fileData,
        mode: "text/x-csrc",
        theme: "material",
        lineNumbers: true
    });
    editor.setValue(fileData);
    document.editor = editor;

    // 绑定编辑的快捷键
    bindEditorKeymaps(editor)
})()

function bindEditorKeymaps(editor) {
    editor.setOption("extraKeys", {
        "Shift-Ctrl-K": (cm) => {
            // 删除当前行
            cm.execCommand("deleteLine");
        },
        "Ctrl-Enter": (cm) => {
            // 在当前行和下一行之间插入新行并编辑
            cm.execCommand("goLineEnd");
            cm.execCommand("newlineAndIndent");
        },
        "Shift-Ctrl-Enter": (cm) => {
            // 在当前行和上一行之间插入新行并编辑
            cm.execCommand("goLineUp");
            cm.execCommand("goLineEnd");
            cm.execCommand("newlineAndIndent");
        },
        "Shift-Ctrl-Up": (cm) => {
            // 将当前行和上一行交换位置
            var pos = editor.getCursor()
            if(pos['line'] - 1 <= 0) {
                return;
            }
            // 交换两行的内容
            var content_cur = editor.getLine(pos['line']);
            var content_las = editor.getLine(pos['line'] - 1);
            editor.setSelection({line: pos['line'], ch: 0},{line: pos['line'], ch: content_cur.length});
            editor.replaceSelection(content_las);
            editor.setSelection({line: pos['line']-1, ch: 0},{line: pos['line']-1, ch: content_cur.length});
            editor.replaceSelection(content_cur);
            // 重新设置Cursor的位置
            editor.setCursor({line: pos['line']-1, ch:pos['ch']});
        },
        "Shift-Ctrl-Down": (cm) => {
            // 将当前行和下一行交换位置
            var pos = editor.getCursor()
            if(pos['line'] - 1 <= 0) {
                return;
            }
            // 交换两行的内容
            var content_cur = editor.getLine(pos['line']);
            var content_las = editor.getLine(pos['line'] + 1);
            editor.setSelection({line: pos['line'], ch: 0},{line: pos['line'], ch: content_cur.length});
            editor.replaceSelection(content_las);
            editor.setSelection({line: pos['line']+1, ch: 0},{line: pos['line']+1, ch: content_cur.length});
            editor.replaceSelection(content_cur);
            // 重新设置Cursor的位置
            editor.setCursor({line: pos['line']+1, ch:pos['ch']});
        },
        "Ctrl-Up": (cm) => {
            // 增大字号
            var lines = document.querySelectorAll(".CodeMirror");
            lines.forEach((line) => {
                var originSize = parseInt(line.style.fontSize);
                var originSize = isNaN(originSize) ? 17 : parseInt(originSize);
                line.style.fontSize = (originSize+1) + "px";
            });
        },
        "Ctrl-Down": (cm) => {
            // 减小字号
            var lines = document.querySelectorAll(".CodeMirror");
            lines.forEach((line) => {
                var originSize = parseInt(line.style.fontSize);
                var originSize = isNaN(originSize) ? 17 : parseInt(originSize);
                line.style.fontSize = (originSize-1) + "px";
            });
        },
        "Ctrl-G": (cm) => {
            // 跳转到行
            // var input = document.createElement("input");
            // input.type = "number";
            // input.className = "temp-input";
            // document.body.appendChild(input);
            // input.focus();
            // input.onkeydown = (evt) => {
            //     if(evt.code === "Enter" || evt.code === "NumpadEnter") {
            //         // Get the line number inputted
            //         var input = document.getElementsByClassName("temp-input")[0];
            //         var lineNumber = parseInt(input.value);
            //         // Remove input element
            //         input.parentNode.removeChild(input);
            //         // Focus on the editor and go to line start
            //         document.editor.focus();
            //         document.editor.setCursor({line: lineNumber - 1, ch: 0});
            //     }
            // }
        },
        "Shift-Ctrl-P": (cm) => {
            // 更换主题
            var input = document.createElement("input");
            input.type = "text";
            input.className = "temp-input";
            input.placeholder = "seti,dracula,eclipse,material,midnight,solarized,tomorrow-night-bright..."
            document.body.appendChild(input);
            input.focus();
            (() => {
                var codemirror = cm;
                input.onkeydown = (evt) => {
                    if(evt.code === "Enter" || evt.code === "NumpadEnter") {
                        // 获取主题名
                        var input = document.getElementsByClassName("temp-input")[0];
                        var themeName = input.value;
                        input.parentNode.removeChild(input);
                        // 判断是否已经引入该主题文件
                        var imported = false;
                        var src = `../codemirror/theme/${themeName}.css`;
                        var links = document.getElementsByTagName("link");
                        for(let n=0; n<links.lenth; n++) {
                            if(links[0].src === src) {
                                imported = true;
                                break;
                            }
                        }
                        // 未引入主题文件则引入
                        if(!imported) {
                            var link = document.createElement("link");
                            link.rel = "stylesheet";
                            link.href = src;
                            document.getElementsByTagName("head")[0].appendChild(link);
                        }
                        // 设置编辑器主题
                        codemirror.setOption("theme", themeName);
                        document.editor.focus();
                    }
                }
            })()
        }
    });
}
