function setSize(){
    var size=document.documentElement.clientWidth / 7.5;
    if(size>70){
        size=70;
    }
    document.documentElement.style.fontSize = size + 'px';
}
setSize();
window.addEventListener("resize", function () {
    setSize();
}, false);