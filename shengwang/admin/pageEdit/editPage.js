
function editPageFunction(id,name){
//    $("#boxDiv").css("height", document.documentElement.clientHeight * 0.94);
//    $("#canvas").css("height", document.documentElement.clientHeight * 0.94);
//    $("#propertiesDiv").css("height", document.documentElement.clientHeight * 0.94);
    var modelId = 18;
    var modelName = "";
    if (name == "") {
        return;
    } else {
        modelId = id.replace("#", "");
        modelName = name;
    }
//    try {
//        var theurl = window.location.href;
//        var queryStr = theurl.split('?')[1];
//        var idStr = queryStr.split("&")[0];
//        modelId = idStr.split('=')[1];
//        modelId = modelId.replace("#", "");
//        var nameStr = queryStr.split("&")[1];
//        modelName = nameStr.split('=')[1];
//    }
//    catch (e) {
//        return;
//    }
    $(document).bind("contextmenu", function(e) {
        return false;
    });
    $("#reback").bind("click", function() {
        $(window.parent.document).find("div[id='pageEditDiv']").css("display", "none");
        $(window.parent.document).find("div[id='setPowerDiv']").css("display", "block");
    });
    //    $("#propertiesDiv").tabs({ activate: function(event, ui) {

    //    }
    //    });

    $("#canvas").html("");
    var pageDiv = new HBSJsPageDiv();
    $.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "getModelJson", modelId: escape(modelId), modelName: escape(modelName) },
        success: function(data) {
            if (data.IsSuccess) {
                pageDiv.Json = data.Data;
                pageDiv.Json.name = unescape(pageDiv.Json.name);
                pageDiv.createElement();
                pageDiv.createPropertiesDiv();
                
            }
            else {
                alert(data.Message);
            }
        },
        error: function(e) {
            alert(e.status);
        }
    });
    flotGetPageDiv = pageDiv;
    
    
}

function getAllControls(pageDiv) {
    var flag = [];

            var labels = pageDiv.Json.labels;
            for (var i = 0; i < labels.length; i++) {
                flag.push(labels[i].name);
            }


        var texts = pageDiv.Json.texts;
        for (var i = 0; i < texts.length; i++) {
            flag.push(texts[i].name);
        }
 
            var checkboxs = pageDiv.Json.checkboxs;
            for (var i = 0; i < checkboxs.length; i++) {
                flag.push(checkboxs[i].name);
            }

            var radios = pageDiv.Json.radios;
            for (var i = 0; i < radios.length; i++) {
                flag.push(radios[i].name);
            }


        var selects = pageDiv.Json.selects;
        for (var i = 0; i < selects.length; i++) {
            flag.push(selects[i].name);
        }


        var images = pageDiv.Json.images;
        for (var i = 0; i < images.length; i++) {
            flag.push(images[i].name);
        }


        var dates = pageDiv.Json.dates;
        for (var i = 0; i < dates.length; i++) {
            flag.push(dates[i].name);
        }

        var listTables = pageDiv.Json.listTables;
        for (var i = 0; i < listTables.length; i++) {
            flag.push(listTables[i].name);
        }


        var trees = pageDiv.Json.trees;
        for (var i = 0; i < trees.length; i++) {
            flag.push(trees[i].name);
        }


        var matrixRpts = pageDiv.Json.matrixRpts;
        for (var i = 0; i < matrixRpts.length; i++) {
            flag.push(matrixRpts[i].name);
        }


        var iframes = pageDiv.Json.iframes;
        for (var i = 0; i < iframes.length; i++) {
            flag.push(iframes[i].name);
        }


        var apeakTrees = pageDiv.Json.apeakTrees;
        for (var i = 0; i < apeakTrees.length; i++) {
            flag.push(apeakTrees[i].name);
        }


        var planeTrees = pageDiv.Json.planeTrees;
        for (var i = 0; i < planeTrees.length; i++) {
            flag.push(planeTrees[i].name);
        }


        var flots = pageDiv.Json.flots;
        for (var i = 0; i < flots.length; i++) {
            flag.push(flots[i].name);
        }


        var froms = pageDiv.Json.froms;
        for (var i = 0; i < froms.length; i++) {
            flag.push(froms[i].name);
        }


        var uploadFiles = pageDiv.Json.uploadFiles;
        for (var i = 0; i < uploadFiles.length; i++) {
            flag.push(uploadFiles[i].name);
        }


        var replys = pageDiv.Json.replys;
        for (var i = 0; i < replys.length; i++) {
            flag.push(replys[i].name);
        }


        var orderNos = pageDiv.Json.orderNos;
        for (var i = 0; i < orderNos.length; i++) {
            flag.push(orderNos[i].name);
        }



        var moneys = pageDiv.Json.moneys;
        for (var i = 0; i < moneys.length; i++) {
            flag.push(moneys[i].name);
        }

        var uploadFiles = pageDiv.Json.uploadFiles
        for (var i = 0; i < uploadFiles.length; i++) {
            flag.push(uploadFiles[i].name);
        }
        var fileListings = pageDiv.Json.fileListings;
        for (var i = 0; i < fileListings.length; i++) {
            flag.push(fileListings[i].name);
        }
        
        return flag;
    }
    function fuzhigeiImageSrc(a) {
        //alert($(a).prop("imageSrc"));
        flotGetPageDiv.currentControl.changeImageSrc($(a).prop("imageSrc"));
        $("#imageSrcInputMenu").remove();
    }