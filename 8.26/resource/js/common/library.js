function getTop(e) {
    var offset = e.offsetTop;
    if (e.offsetParent != null) offset += getTop(e.offsetParent);
    return offset;
}
function getLeft(e) {
    var offset = e.offsetLeft;
    if (e.offsetParent != null) offset += getLeft(e.offsetParent);
    return offset;
}
function getEvent() {
    if (document.all) return window.event;
    func = getEvent.caller;
    while (func != null) {
        var arg0 = func.arguments[0];
        if (arg0) {
            if ((arg0.constructor == Event || arg0.constructor == MouseEvent) || (typeof (arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
                return arg0;
            }
        }
        func = func.caller;
    }
    return null;
}
function getJson(json, id) {
    var theJ = null;
    for (var i = 0; i < json.Children.length; i++) {
        if (theJ == null) {
            var j = json.Children[i];
            if (j.TargetObj.Id == id) {
                theJ = j;
                break;
            }
            else {
                if (j.Children.length > 0) {
                    theJ = getJson(j, id);
                }
            }
        }
    }
    return theJ;
}
var GHKPopDiv = function(l, t, w, h, id) {
    var popDiv = document.getElementById(id);
    if (popDiv != null) {
        $(popDiv).remove();
    }
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.id = id;
    this.element.style.overflow = "hidden";
    this.element.className = "popDiv";
    $(this.element).css("left", parseInt(l) + "px");
    $(this.element).css("top", parseInt(t) + "px");
    $(this.element).css("width", parseInt(w) + "px");
    $(this.element).css("height", parseInt(h) + "px");
    $(this.element).css("background-color", "gray");
    document.body.appendChild(this.element);
    var iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.top = "0px";
    iframe.style.left = "0px";
    iframe.style.width = "106%";
    iframe.style.height = "100%";
    iframe.style.zIndex = -1;
    $(this.element).append(iframe);
    var obj = this;
    $(this.element).dblclick(function(event) {
        var src = event.target;
        document.body.removeChild(obj.element);
    });
}
var HBSJsNormalField = function() {
    this.name = "";
    this.domType = "text";
    this.dataType = "nvarchar";
    this.dataLength = 100;
    this.text = "";
    this.value = "";
}
var HBSJsRuntimePage = function() {
    this.pageId = 0;
    this.pageName = "";
    this.opType = "add";
    this.signField = "id";
    this.tableName = "";
    this.records = [];
    this.inputParameters = [];
    this.outputParameters = [];
    this.totleRecord = 0;
    this.filterCount = 0;
    this.showRecords = new HBSJsShoweRecord();
    this.filterRecords = [];
    this.currentRecord = new HBSJsRecord();
}
var HBSJsShoweRecord = function() {
    this.begin = 0;
    this.end = 0;
    this.records = [];
}
var HBSJsRecord = function() {
    this.signFieldValue = "";
    this.normalFields = [];
    this.listTableFields = [];
}
var HBSJsBaseParameter = function() {
    this.PType = "valueParameter";
}
var HBSJsExpress = function() {
    this.PType = "expressParameter";
    this.Parameters = [];
    this.ValueType = "string";
    this.Prefix = "";
    this.Method = "getValue";
}
var HBSJsValueParameter = function() {
    this.PType = "valueParameter";
    this.Name = "";
    this.ParameterType = "const";
    this.Expression = "";
    this.Format = "#,##0.00";
    this.ValueType = "string";
}
var HBSJsWhere = function() {
    this.limited = new HBSJsExpress();
    this.opSymbol = "=";
    this.value = new HBSJsExpress();
    this.connectSymbol = "and";
}
var HBSJsDataview = function() {
    this.id = -1;
    this.name = "";
    this.isGroup = false;
    this.tables = [];
    this.connects = [];
    this.conditions = [];
    this.orderbys = [];
}
var HBSJsTableView = function() {
    this.Left = 50;
    this.Top = 50;
    this.PageId = -1;
    this.PageName = "";
    this.SignField = "id";
    this.Fields = [];
    this.Listtables = "";
    this.DbName = "";
}
var HBSJsViewField = function() {
    this.Name = "";
    this.IsOutput = "";
    this.Alias = "";
    this.GetValueMethod = "value";
}
var HBSJsOrderby = function() {
    this.Name = "";
    this.Asc = true;
}
var HBSJsConnect = function() {
    this.IsChildConnect = false;
    this.SourceField = "";
    this.OpSymbol = "";
    this.TargetField = "";
}
var HBSJsOpField = function() {
    this.selected = true;
    this.name = "";
    this.logicOp = "=";
    this.express = new HBSJsExpress();
}
var HBSJsFieldRange = function() {
    this.FieldName = "";
    this.DomType = "textbox";
    this.DataType = "nvarchar";
    this.IsCheck = false;
    this.OpType = "=";
    this.Express = new HBSJsExpress();
}
var HBSAddRecord = function() {
    this.Flag = false;
    this.FieldRanges = [];
}
var HBSDelRecord = function() {
    this.Flag = false;
    this.conditions = [];
}
var HBSUpdateRecord = function() {
    this.Flag = false;
    this.FieldRanges = [];
    this.conditions = [];
}
var HBSSearchRecord = function() {
    this.Flag = false;
    this.conditions = [];
}
var HBSDetailPower = function() {
    this.modelId = -1;
    this.roles = [];
    this.pageEdit = false;
    this.addRecord = new HBSAddRecord();
    this.delRecord = new HBSDelRecord();
    this.updateRecord = new HBSUpdateRecord();
    this.searchRecord = new HBSSearchRecord();
    this.limitRecordOfUpdate = false;
    this.limitRecordOfDel = false;
    this.limitRecordOfSearch = false;
}
var HBSTreeIcon = function(datatype, openIcon, closeIcon, leafIcon) {
    this.dataType = datatype;
    this.addIcon = openIcon;
    this.subIcon = closeIcon;
    this.leafIcon = leafIcon;
}
var HBSJsItem = function(text, value) {
    this.text = text;
    this.value = value;
}
var HBSJsDic = function(id,name) {
    this.id = id;
    this.name = name;
}
var HBSJsParameter = function(name, value) {
    this.name =name;
    var v = new HBSJsValueParameter();
    v.Expression = value;
    this.value = new HBSJsExpress();
    this.value.Parameters.push(v);
}