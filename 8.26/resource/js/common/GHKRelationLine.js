var GHKRelationLine = function(r, selectTablesDiv, vJson) {
    try {
        var t1 = r.Table1;
        var t2 = r.Table2;
        var linkCanvas = document.createElement("div");
        linkCanvas.id = getLineCanvasId(r);
        var beginX = r.Left1;
        var beginY = r.Top1;
        var endX = r.Left2;
        var endY = r.Top2;

        $(linkCanvas).addClass(t1 + "Relation");
        $(linkCanvas).addClass(t2 + "Relation");
        var width = Math.abs(beginX - endX);
        var height = Math.abs(beginY - endY);
        linkCanvas.style.width = width + "px";
        linkCanvas.style.height = height + "px";
        linkCanvas.style.zIndex = 9999;
        $(linkCanvas).addClass("linkCanvas");
        linkCanvas.style.position = "absolute";
        selectTablesDiv.appendChild(linkCanvas);
        var rel = this;
        var left, top;
        if (parseInt(beginX) >= parseInt(endX)) {
            left = endX;
        }
        else {
            left = beginX;
        }
        if (parseInt(beginY) >= parseInt(endY)) {
            top = endY;
        }
        else {
            top = beginY;
        }
        linkCanvas.style.left = left + "px";
        linkCanvas.style.top = top + "px";
        if (beginX == endX) {
            linkCanvas.style.width = 30 + "px";
            linkCanvas.style.border = "1px solid black";
            if (beginX == 225) {
                linkCanvas.style.borderLeft = "0px solid black";
            }
            else {
                linkCanvas.style.left = "360";
                linkCanvas.style.borderRight = "0px solid black";
            }
        }
        else {
            var pointStr = "";
            if (parseInt(beginY) >= parseInt(endY) && parseInt(beginX) >= parseInt(endX)) {
                graphics({
                    coordinate: [width, height, 0, 0],
                    position: [0, 0, 0, 0],
                    parentObj: linkCanvas,
                    arrowSize: { 'height': 10, 'width': 1 },
                    cutArrowLen: [0, 0],
                    color: "red",
                    type: "line"
                });
            }
            else if (parseInt(beginY) <= parseInt(endY) && parseInt(beginX) >= parseInt(endX)) {
                graphics({
                    coordinate: [width, 0, 0, height],
                    position: [0, 0, 0, 0],
                    parentObj: linkCanvas,
                    arrowSize: { 'height': 10, 'width': 1 },
                    cutArrowLen: [0, 0],
                    color: "red",
                    type: "line"
                });
            }
            else if (parseInt(beginY) >= parseInt(endY) && parseInt(beginX) <= parseInt(endX)) {
                graphics({
                    coordinate: [0, height, width, 0],
                    position: [0, 0, 0, 0],
                    parentObj: linkCanvas,
                    arrowSize: { 'height': 10, 'width': 1 },
                    cutArrowLen: [0, 0],
                    color: "red",
                    type: "line"
                });
            }
            else if (parseInt(beginY) <= parseInt(endY) && parseInt(beginX) <= parseInt(endX)) {
                pointStr = +"0,0," + width.toString() + "," + height.toString();
                graphics({
                    coordinate: [0, 0, width, height],
                    position: [0, 0, 0, 0],
                    parentObj: linkCanvas,
                    arrowSize: { 'height': 10, 'width': 1 },
                    cutArrowLen: [0, 0],
                    color: "red",
                    type: "line"
                });
            }
        }
        $(linkCanvas).bind("keydown", function(event) {
            if (event.keyCode == "46") {
                selectTablesDiv.removeChild(linkCanvas);
                for (var i = 0; i < vJson.Relations.length; i++) {
                    if (vJson.Relations[i] == r) {
                        vJson.Relations.splice(i, 1);
                    }
                }
            }
        });
    }
    catch (e) {
        //alert(e.message);
        //window.status = e.message;
        return e;
    }
}
function getLineCanvasId(r) 
{
    var id = "";
     for (var i = 0; ; i++) {
         id = "LineCanvas" + i;
         var lineCanvas = document.getElementById(id);
         if (lineCanvas == null) {
             break;
         }
     }
     return id;
 }