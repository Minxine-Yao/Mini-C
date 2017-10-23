(()=>{
    var fileData = sessionStorage.getItem("content");
    var editor = document.getElementsByClassName("editor")[0];
    var inputArea = editor.getElementsByClassName("code-input")[0];
    // 添加观察器以实现行号动态添加和代码高亮
    inputArea.contentEditable = "true";
    var observer = new MutationObserver(onEditorMutate);
    observer.observe(inputArea, {childList: true});
    // 显示文件内容
    inputArea.innerHTML = initHighlight(fileData); 
})()

/**
 * 对单行内容做词法分析进行标记以呈现出高亮样式
 * 
 * @param {string} content 
 */
function highlight(content) {}

/**
 * 对多行内容做词法分析进行标记以呈现出高亮样式
 * 
 * @param {string} fileData 
 */
function initHighlight(fileData) {
    return fileData;
}

/**
 * 在编辑器有新行加入或者删除的时候进行处理
 * 
 * @param {Array of MutationRecord} mutations 
 * @param {MutationObserver} observer 
 */
function onEditorMutate(mutations, observer) {
    mutations.forEach((mutation) => {
        if(mutation.type !== "childList") {
            return;
        }
        var newLines = mutation.addedNodes;
        var lineNumberBox = document.getElementsByClassName("line-number")[0];
        var lineNumbers = lineNumberBox.getElementsByTagName('span');
        // 为每个新行添加行号和用于代码高亮的Observer
        newLines.forEach((lineDiv) => {
            // 添加的是文本节点则退出
            console.log(lineDiv.nodeType);
            if(lineDiv.nodeType === Node.TEXT_NODE) {
                return;
            }
            // 添加新行号
            var lineNumber = parseInt(lineNumbers[lineNumbers.length - 1].innerHTML) + 1;
            var span = document.createElement("span");
            span.innerHTML = lineNumber;
            lineNumberBox.appendChild(span);
            // 添加Observer
            var observer = new MutationObserver(onSingleLineChange);
            observer.observe(lineDiv, {
                characterData: true,
                subtree: true
            });
        });
        // 删除对应行号
        var removedLines = mutation.removedNodes;
        removedLines.forEach((lineDiv) => {
            if(lineNumbers.length > 1) {
                lineNumberBox.removeChild(lineNumberBox.lastChild);
            }
        });
    })
}
/**
 * 在单行文本有改变时进行处理
 * 
 * @param {Array of MutationRecord} mutations 
 * @param {MutationObserver} observer 
 */
function onSingleLineChange(mutations, observer) {}