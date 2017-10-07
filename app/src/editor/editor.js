(()=>{
    var fileData = sessionStorage.getItem("fileData");
    var textarea = document.getElementsByTagName("textarea")[0];
    textarea.value = fileData;
})()

