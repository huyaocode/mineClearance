var mine = {
    minemap: [],
    col: 0,
    row: 0,
    dommap: null,
    numberStyle: [],
    btnFace: null,
    init: function (domwarpper, row, col, mineProbability) {
        //默认30列，6行
        this.col = col || 16;
        this.row = row || 30;
        mineProbability = mineProbability || 0.2;   //生成雷的概率默认是0.1        

        this.createmines(mineProbability);      //生成二维数组
        console.log(this.minemap)

        this.createDom(domwarpper);     //生成dom

        // this.showmine(this.dommap);     //展示地雷
        this.bindEvent();
    },
    //绑定事件
    bindEvent: function () {
        var self = this;
        //点击笑脸事件
        this.btnFace = document.getElementsByClassName('face')[0];

        this.btnFace.onmouseup = function(e){
            this.innerHTML = '<img src="./img/face_normal.bmp" alt="">';
            self.init(domwarpper);
        }
        //左键点击地图块事件
        this.dommap.onclick = function (e) {
            var target = e.target;
            if (target.getAttribute('class') == 'block') {
                self.touch(target);
            }
            stopBubble(e)
            return false;
        }
        //右键点击地图块事件
        this.dommap.oncontextmenu = function(e) {
            var target = e.target;
            if(target.tagName.toLowerCase() == 'img'){
                target = target.parentElement;
            }
            if (target.getAttribute('class') == 'block') {
                console.log(target.getAttribute('flagStyle'))
                if(target.getAttribute('flagStyle') == null || target.getAttribute('flagStyle') == ""){
                    target.setAttribute('flagStyle', 'flag');
                    target.innerHTML = '<img src="./img/flag.bmp" alt="">';
                } else if(target.getAttribute('flagStyle') == 'flag'){
                    target.setAttribute('flagStyle', 'ask');
                    target.innerHTML = '<img src="./img/ask.bmp" alt="">';
                } else if (target.getAttribute('flagStyle') == 'ask'){
                    target.setAttribute('flagStyle', '');
                    target.innerHTML = "";
                }
            }
            stopBubble(e);
            return false;
        }
    },
    touch: function (target) {
        if(!target){
            return;
        }
        var value = target.getAttribute('value'),
            y = target.getAttribute('y'),
            x = target.getAttribute('x');
            y = +y;
            x = +x;
        var col = this.col,
            row = this.row;
        if (value == 0) {    //空地，需要拓展开来
            target.innerHTML = '<span></span>';
            (y > 0) && this.touch(this.getdom(y - 1, x));  //上方
            (x < row - 1) && this.touch(this.getdom(y, x + 1)); //右方
            (y < col - 1) && this.touch(this.getdom(y + 1, x));  //下方
            (x > 0) && this.touch(this.getdom(y, x - 1));  //左方
            (x > 0 && y > 0) && this.touch(this.getdom(y - 1, x - 1));   //左上方
            (x < row - 1 && y > 0) && this.touch(this.getdom(y - 1, x + 1)); // 右上方
            (x > 0 && y < col - 1) && this.touch(this.getdom(y + 1, x - 1));   //左下方
            (x < row - 1 && y < col - 1) && this.touch(this.getdom(y + 1, x + 1)); //右下方
        } else if (value == 10) {
            this.btnFace.innerHTML = '<img src="./img/face_fail.bmp" alt="">';
            this.showmine();
        } else {
            target.setAttribute('class', 'block number');
            target.innerHTML = '<span class="point' + value + '">' + value + '</span>';
        }
    },
    //生成雷区地图的二维数组
    createmines: function (mineProbability) {
        var col = this.col,
            row = this.row;
        map = this.minemap;
        //先生成空地图
        for (let y = 0; y < col; y++) {
            map[y] = new Array(row);
            map[y].fill(0);
        }

        //对空地图进行随机放雷和标记周围值
        for (let y = 0; y < col; y++) { //y 为纵向坐标
            for (let x = 0; x < row; x++) { //x 为横向坐标
                //随机数范围0~1，如果随机数值大于 1-雷出现概率值，那么确定这个地方有雷，用10来表示这个点有雷
                var isMine = Math.round(Math.random() > 1 - mineProbability);
                map[y][x] = isMine ? 10 : map[y][x];
                if (isMine) {
                    //雷周围的数值要加一, 当不越界并且不是雷的时候，说明这个地方要将值加一
                    (y > 0) && map[y - 1][x] != 10 && map[y - 1][x]++;  //上方
                    (y < col - 1) && map[y + 1][x] != 10 && map[y + 1][x]++;  //下方
                    (x > 0) && map[y][x - 1] != 10 && map[y][x - 1]++;  //左方
                    (x < row - 1) && (map[y][x + 1] != 10) && (map[y][x + 1]++); //右方
                    (x > 0 && y > 0) && map[y - 1][x - 1] != 10 && map[y - 1][x - 1]++;   //左上方
                    (x < row - 1 && y > 0) && map[y - 1][x + 1] != 10 && map[y - 1][x + 1]++; // 右上方
                    (x > 0 && y < col - 1) && map[y + 1][x - 1] != 10 && map[y + 1][x - 1]++;   //左下方
                    (x < row - 1 && y < col - 1) && map[y + 1][x + 1] != 10 && map[y + 1][x + 1]++; //右下方
                }
            }
        }
    },

    //创建雷区dom
    createDom: function (wrapper) {
        //创建 ul.col > li * col > ul.row > li * row的结构
        var col = this.col,
            row = this.row;
        var fragment = document.createDocumentFragment();
        //创建最大的ul.col， 包裹的所有行
        var colUl = document.createElement('ul');
        colUl.className = "col";
        //创建col个行
        for (let y = 0; y < col; y++) { //y 为纵向坐标
            //每一行都包在一个li中
            var colLi = document.createElement('li');
            colUl.appendChild(colLi);
            //创建每一行中的每一个小块的父级
            var rowUl = document.createElement('ul');
            rowUl.className = "row";
            for (let x = 0; x < row; x++) { //x 为横向坐标
                //创建每一个块
                var rowLi = document.createElement('li');
                rowLi.setAttribute('y', y);
                rowLi.setAttribute('x', x);
                rowLi.setAttribute('value', this.minemap[y][x]);
                rowLi.setAttribute('class', 'block')
                rowUl.appendChild(rowLi);
            }
            colLi.appendChild(rowUl);
        }
        fragment.appendChild(colUl);
        this.dommap = colUl;
        wrapper.innerHTML = "";
        wrapper.appendChild(fragment);
    },

    //展示出所有的雷
    showmine: function () {
        var dommap = this.dommap;
        var col = this.col,
            row = this.row;
        var minemap = this.minemap;
        //如果炸弹被引爆，将所有的炸弹都展示出来
        for (let y = 0; y < col; y++) { //y 为纵向坐标
            var domcol = dommap.children[y];
            domcol = domcol.getElementsByClassName('row')[0];
            for (let x = 0; x < row; x++) { //x 为横向坐标
                if (minemap[y][x] == 10) {
                    domcol.children[x].innerHTML = '<img src="./img/blood.bmp" alt="">';
                }
            }
        }
    },
    //获取坐标对应dom
    getdom(y, x) {
        var dommap = this.dommap,
            minemap = this.minemap;
        var col = this.col,
            row = this.row;
        var domcol = dommap.children[y];
        domcol = domcol.getElementsByClassName('row')[0];
        if(minemap[y][x] > 10 ){
            return null;
        } else {
            minemap[y][x]  = 100;
            return domcol.children[x];
        }
    }
}

var domwarpper = document.getElementsByClassName('mines')[0];

mine.init(domwarpper);

/**
 * 阻止时间冒泡
 * @param {*} event 事件
 */
function stopBubble(event){
	if(event.stopPropagation){
		event.stopPropagation();
	} else {
		event.cancelBubble = true;
	}
}
