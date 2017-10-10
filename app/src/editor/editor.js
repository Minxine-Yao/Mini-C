(()=>{
    var fileData = sessionStorage.getItem("content");
    var textarea = document.getElementsByTagName("textarea")[0];
    textarea.value = fileData;
})()

