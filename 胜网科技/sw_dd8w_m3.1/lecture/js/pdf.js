var pdfurl = null;
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
var pdffile=['12.pdf'];
pdfurl="/public/pdf/"+GetQueryString("file")+".pdf";
console.log(pdfurl);
if(pdfurl==null)pdfurl = '/public/pdf/compressed.pdf';
//pdfurl="http://192.168.0.21:8000/group1/M00/00/4E/wKgAFVmaeraABMBxAAFEqA3skcE170.pdf";
var pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    pdfscale = 1,
    pdfcanvas = document.getElementById('the-canvas'),
    pdfctx = pdfcanvas.getContext('2d');
PDFJS.workerSrc = '/public/part/pdf/generic/build/pdf.worker.js';
function renderPage(num) {
    pageRendering = true;
    pdfDoc.getPage(num).then(function(page) {
        var viewport = page.getViewport(pdfscale);
        pdfcanvas.height = viewport.height;
        pdfcanvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
            canvasContext: pdfctx,
            viewport: viewport
        };
        var renderTask = page.render(renderContext);

        // Wait for rendering to finish
        renderTask.promise.then(function () {
            pageRendering = false;
            if (pageNumPending !== null) {
                // New page rendering is pending
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });

    // Update page counters
    document.getElementById('page_num').textContent = pageNum;
}

function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

/**
 * Displays previous page.
 */
function onPrevPage() {
    if (pageNum <= 1) {
        return;
    }
    pageNum--;
    queueRenderPage(pageNum);
}
function onPdfadd() {
    pdfscale+=0.1;
    renderPage(pageNum);
}
function onPdfdec() {
    pdfscale-=0.1;
    renderPage(pageNum);
}
/**
 * Displays next page.
 */
function onNextPage() {
    if (pageNum >= pdfDoc.numPages) {
        return;
    }
    pageNum++;
    queueRenderPage(pageNum);
}
function aabb(){
    // document.getElementById('next').addEventListener('click', onNextPage);
    // document.getElementById('prev').addEventListener('click', onPrevPage);
    PDFJS.getDocument(pdfurl).then(function (pdfDoc_) {
        pdfDoc = pdfDoc_;
        document.getElementById('page_count').textContent = pdfDoc.numPages;
        renderPage(pageNum);
    });
}
aabb();
$(document).on('click', '#fontadd', function(){
    console.log('fontadd');
    if($("#the-canvas").length>0){
        onPdfadd();
    }
});
$(document).on('click', '#fontdec', function(){
    console.log('fontdec');
    if($("#the-canvas").length>0){
        onPdfdec();
    }
});
$(document).on('click', '.pdfup', function(){
    if($("#the-canvas").length>0){
        onPrevPage();
    }
});
$(document).on('click', '.pdfnext', function(){
    if($("#the-canvas").length>0){
        onNextPage();
    }
});