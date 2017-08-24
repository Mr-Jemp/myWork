var DSGraphics = function() {
    var g = new Graphics();
    for (var e in Graphics.init) {
        g[e] = Graphics.init[e];
    }
    for (var e in option) {
        g[e] = option[e];
    }
    g.execute();
}
var Graphics = function() {
    this.coordinate = [0, 0, 0, 0];
    this.color = '#333';
    this.parentObj = 'arrow';
    this.pointName = 'point' + Graphics.num++;
    this.arrowSize = { 'height': 10, 'width': 1 };
    this.type = 'cutArrow';
    this.cutArrowLen = [30, 30];
    this.position = [0, 0, 0, 0];
    this.click = function(e, name) { };
    this.description = '';
    this.source = ""; 
    this.target = "";
    this.className = "";
}
Graphics.num = 0;
Graphics.init = {};
Graphics.prototype = {
    clickLine: function() {

    },
    drawPoint: function(x, y) {
        var D = document.createElement('div');
        D.style.top = y + 'px';
        D.style.left = x + 'px';
        D.style.position = 'absolute';
        $(D).addClass("lineClass");
        $(D).addClass(this.source);
        $(D).addClass(this.target);
        $(D).addClass(this.className); 
        $(D).css("width", "3px");
        $(D).css("cursor", "pointer");
        $(D).css("height", "3px");
        $(D).css("overflow", "hidden");
        $(D).css("background-color",this.color); 
        D.setAttribute('name', this.pointName);
        var g = this;
//        var D1 = document.createElement('div');
//        D1.style.top = y - 5 + 'px';
//        D1.style.left = x - 5 + 'px';
//        D1.style.position = 'absolute';
//        $(D1).addClass("lineClass");
//        $(D1).addClass(this.source);
//        $(D1).addClass(this.target);
//        $(D1).addClass(this.className);
//        D1.style.width = '3px';
//        D1.style.height = '3px';
        this.parentObj.appendChild(D);
//        this.parentObj.appendChild(D1);
        $(D).bind("click", function() {
            g.clickLine();
        });
//        $(D1).bind("click", function() {
//            g.clickLine();
//        });
        $(D).bind("keydown", function(event) {
            g.keydown(event);
        });
//        $(D1).bind("keydown", function(event) {
//            g.keydown(event);
//        });
        return D;
    },
    point: function() {
        var x1 = this.coordinate[0];
        var y1 = this.coordinate[1];
        this.drawPoint(x1, y1);
    },
    drawLine: function(x1, y1, x2, y2) {
        var x1 = parseInt(x1);
        var y1 = parseInt(y1);
        var x2 = parseInt(x2);
        var y2 = parseInt(y2);
        var maxLen = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
        var x = (x2 - x1) / maxLen;
        var y = (y2 - y1) / maxLen;
        if (maxLen == 0) {
            x = 0;
            y = 0;
        }
        for (var i = 0; i <= maxLen; i++) {
            this.drawPoint(x1 + i * x, y1 + i * y);
        }
    },
    line: function() {
        var x1 = parseInt(this.coordinate[0]) + parseInt(this.position[0]);
        var y1 = parseInt(this.coordinate[1]) + parseInt(this.position[1]);
        var x2 = parseInt(this.coordinate[2]) + parseInt(this.position[2]);
        var y2 = parseInt(this.coordinate[3]) + parseInt(this.position[3]);
        this.drawLine(x1, y1, x2, y2);
    },
    /**
    画箭头的方法（无参数，读取类中的变量）
    */
    arrow: function() {
        var x1 = parseInt(this.coordinate[0]) + parseInt(this.position[0]);
        var y1 = parseInt(this.coordinate[1]) + parseInt(this.position[1]);
        var x2 = parseInt(this.coordinate[2]) + parseInt(this.position[2]);
        var y2 = parseInt(this.coordinate[3]) + parseInt(this.position[3]);
        var len = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        if (len == 0) {
            createPoint(x1, y1, color);
            return;
        }
        var t = (y2 - y1) / (x2 - x1);

        var angle = Math.atan(t);
        var x, y;

        var len1 = Math.min(this.arrowSize.height, len - 2);
        var len2 = Math.min(this.arrowSize.width, len / 2 - 1);

        if (x2 < x1) {
            x = (len1 - len) * Math.cos(angle) + x1;
            y = (len1 - len) * Math.sin(angle) + y1;
        } else if (x2 >= x1) {
            x = (len - len1) * Math.cos(angle) + x1;
            y = (len - len1) * Math.sin(angle) + y1;
        }

        var x3 = x + len2 * Math.sin(angle);
        var y3 = y - len2 * Math.cos(angle);

        var x4 = x - len2 * Math.sin(angle);
        var y4 = y + len2 * Math.cos(angle);

        this.drawLine(x1, y1, x, y);
        this.drawLine(x2, y2, x3, y3);
        this.drawLine(x2, y2, x4, y4);
        this.drawLine(x3, y3, x4, y4)
    },
    /**
    画一个缩小箭头的方法（无参数，读取类中的变量）
    */
    cutArrow: function() {
        var x1 = parseInt(this.coordinate[0]);
        var y1 = parseInt(this.coordinate[1]);
        var x2 = parseInt(this.coordinate[2]);
        var y2 = parseInt(this.coordinate[3]);
        var t = (y2 - y1) / (x2 - x1);
        var angle = Math.atan(t);
        if (x2 < x1) {
            this.coordinate[0] = x1 - this.cutArrowLen[0] * Math.cos(angle);
            this.coordinate[1] = y1 - this.cutArrowLen[0] * Math.sin(angle);
            this.coordinate[2] = x2 + this.cutArrowLen[0] * Math.cos(angle);
            this.coordinate[3] = y2 + this.cutArrowLen[0] * Math.sin(angle);
        } else {
            this.coordinate[0] = x1 + this.cutArrowLen[0] * Math.cos(angle);
            this.coordinate[1] = y1 + this.cutArrowLen[0] * Math.sin(angle);
            this.coordinate[2] = x2 - this.cutArrowLen[0] * Math.cos(angle);
            this.coordinate[3] = y2 - this.cutArrowLen[0] * Math.sin(angle);
        }
        this.arrow();
    },
    execute: function() {
        eval('this.' + this.type + '()')
    }
}
var graphics = function(option) {
    var g = new Graphics();
    for (var e in Graphics.init) {
        g[e] = Graphics.init[e];
    }
    for (var e in option) {
        g[e] = option[e];
    }
    g.execute();
    return g;
}
