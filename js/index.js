var mine = {
    minemap: [],        //存放二维数组
    col: 0,             //行数
    row: 0,             //列数
    dommap: null,       //存储地图btn的dom
    btnFace: null,      //存储笑脸btn的dom
    domFlagNum: null,   //存储左边旗子的计数器dom
    domTimer: null,     //存储右边计时器的dom
    mineProbability: 0.165, //生成雷的概率默认是0.165
    palyTime: 0,       //游戏时间
    palyTimeTimer: null,   //游戏时间定时器
    mineNums: 0,        //雷的数量
    correctFindNum : 0, //旗子与雷对应的数量
    failed : false, //是否失败
    //定义旗子数的 get 与 set
    _flagNum: 99,
    get flagNum() {
        return this._flagNum;
    },
    set flagNum(value) {
        this.numberToPic(this.domFlagNum, value);
        this._flagNum = value;
    },

    //函数入口
    init: function (difficul) {
        if(difficul){
            this.col = difficul.col;
            this.row = difficul.row;
        }
        this.palyTime = 0;
        this.mineNums=0;
        this.correctFindNum = 0;
        this.numberToPic(this.domTimer, 0);
        this.flagNum = 99;
        this.mineProbability = 0.165;
        this.createmines();      //生成二维数组
        this.createDom(this.dommap);     //生成dom
        this.failed = false;
        this.bindEvent();   //绑定事件
        clearInterval(this.palyTimeTimer);
        this.btnFace.innerHTML = '<img src="./img/face_normal.bmp" alt="">';
    },
    //绑定事件
    bindEvent: function () {
        var self = this;
        //点击笑脸事件
        this.btnFace.onmouseup = function (e) {
            
            self.init();
        }
        
        var self = this;
        //左键点击地图块事件
        var isTheFirstClick = true;
        this.dommap.onclick = function (e) {
            var target = e.target;
            if (target.getAttribute('class') == 'block') {
                if (isTheFirstClick) {  //开始计时
                    isTheFirstClick = false;
                    self.palyTimeTimer = setInterval(function () {
                        self.numberToPic(self.domTimer, ++self.palyTime);
                    }, 1000);
                }
                if(!self.failed){
                    self.touch(target);
                }
            }
            stopBubble(e);
            return false;
        }
        //右键点击地图块事件
        this.dommap.oncontextmenu = function (e) {
            stopBubble(e);
            if(self.failed){
                return false;
            }
            var target = e.target;
            if (target.tagName.toLowerCase() == 'img') {
                target = target.parentElement;
            }
            if (target.getAttribute('class') == 'block') {
                var y = target.getAttribute('y'),
                    x = target.getAttribute('x');
                if (self.flagNum > 0 && (target.getAttribute('flagStyle') == null || target.getAttribute('flagStyle') == "")) {   //是空就放旗子🚩
                    target.setAttribute('flagStyle', 'flag');
                    target.innerHTML = '<img src="./img/flag.bmp" alt="">';
                    self.flagNum--; 
                    if(self.minemap[y][x] == 10){
                        self.correctFindNum++;
                    }
                } else if (target.getAttribute('flagStyle') == 'flag') {    //是旗子就放问号
                    target.setAttribute('flagStyle', 'ask');
                    target.innerHTML = '<img src="./img/ask.bmp" alt="">';
                    if(self.minemap[y][x] == 10){
                        self.correctFindNum--;
                    }
                    self.flagNum++;
                } else if (target.getAttribute('flagStyle') == 'ask') {     //是问号就还原
                    target.setAttribute('flagStyle', '');
                    target.innerHTML = "";
                }
                //找到了所有的雷
                if(self.correctFindNum == self.mineNums){
                    self.winGame();
                }
            }
            return false;
        }

        /**
         * 阻止时间冒泡
         * @param {*} event 事件
         */
        function stopBubble(event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        }
    },
    //将这个格子代表的值给展示出来
    touch: function (target) {
        if (!target) {
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
        } else if (value == 10) {   //踩到雷了
            this.btnFace.innerHTML = '<img src="./img/face_fail.bmp" alt="">';
            clearInterval(this.palyTimeTimer);
            this.failGame(y, x);
        } else {
            target.setAttribute('class', 'block number');
            target.innerHTML = '<span class="point' + value + '">' + value + '</span>';
        }
    },
    //生成雷区地图的二维数组
    createmines: function () {
        var mineProbability = this.mineProbability;
        var col = this.col,
            row = this.row;
        var map = this.minemap;
        //先生成空地图
        for (let y = 0; y < col; y++) {
            map[y] = new Array(row);
            for(let x = 0; x < row; x++){
                map[y][x] = 0;
            }
        }

        //对空地图进行随机放雷和标记周围值
        for (let y = 0; y < col; y++) { //y 为纵向坐标
            for (let x = 0; x < row; x++) { //x 为横向坐标
                //随机数范围0~1，如果随机数值大于 1-雷出现概率值，那么确定这个地方有雷，用10来表示这个点有雷
                
                var isMine = Math.round(Math.random() > 1 - mineProbability);
                map[y][x] = isMine ? 10 : map[y][x];
                if (isMine === 1) {
                    this.mineNums++;
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
        this.dommap = colUl;    //绑定dom
        wrapper.innerHTML = "";
        wrapper.appendChild(fragment);
    },
    winGame: function(){
        alert("恭喜你找出了所有的雷");
        this.init();
    },
    //展示出所有的雷
    failGame: function (boomY, boomX) {
        this.failed = true;
        var dommap = this.dommap;
        var col = this.col,
            row = this.row;
        var minemap = this.minemap;
        //如果炸弹被引爆，将所有的炸弹都展示出来
        for (let y = 0; y < col; y++) { //y 为纵向坐标
            var domcol = dommap.children[y];
            domcol = domcol.getElementsByClassName('row')[0];
            for (let x = 0; x < row; x++) { //x 为横向坐标
                if(y == boomY && x == boomX){
                    domcol.children[x].innerHTML = '<img src="./img/error.bmp" alt="">';
                }else if (minemap[y][x] == 10) {
                    domcol.children[x].innerHTML = '<img src="./img/blood.bmp" alt="">';
                }
            }
        }
    },
    //获取坐标对应dom
    getdom: function (y, x) {
        var dommap = this.dommap,
            minemap = this.minemap;
        var col = this.col,
            row = this.row;
        var domcol = dommap.children[y];
        domcol = domcol.getElementsByClassName('row')[0];
        //这里做了一件事就是让他只能查找一次
        if (minemap[y][x] > 10) {
            return null;
        } else {
            minemap[y][x] = 100;
            return domcol.children[x];
        }
    },
    numberToPic: function (dom, number) {
        var number = ("000" + number).slice(-3).split('');
        dom.innerHTML = '<img src="./img/d' + number[0] + '.bmp" alt="">\
                        <img src="./img/d' + number[1] + '.bmp" alt="">\
                        <img src="./img/d' + number[2] + '.bmp" alt="">';
    }
}

// 难易程度参数
var difficul = [
	{
		level : 'easy',
		row : 9,
		col : 9,
	},
	{
		level : 'common',
		row : 18,
		col : 14,
	},
	{
        level : 'hard',
        row : 30,
		col : 16,
	}
];

//为地雷对象添加操作的dom元素
mine.dommap = document.getElementsByClassName('mines')[0];
mine.btnFace = document.getElementsByClassName('face')[0];
mine.domFlagNum = document.getElementsByClassName('flagsNum')[0];
mine.domTimer = document.getElementsByClassName('timer')[0];

var domDiffical = document.getElementsByClassName('difficul')[0];

domDiffical.onclick = function(e){
    if(e.target.value != undefined){
        mine.init(difficul[e.target.value]);
    }
}
window.onload=function(){
    mine.init(difficul[2]);
}

