var mine = {
    minemap: [],
    col: 0,
    row: 0,
    dommap: null,
    init: function(domwarpper, row, col, mineProbability){
        //默认30列，6行
        this.col = col || 16;
        this.row = row || 30; 
        mineProbability = mineProbability || 0.1;   //生成雷的概率默认是0.1        

        this.createmines(mineProbability);      //生成二维数组
        console.log(this.minemap)

        this.createDom(domwarpper);     //生成dom

        this.showmine(this.dommap);     //展示地雷
        
    },
    //生成雷区地图的二维数组
    createmines: function (mineProbability) {
        col = this.col;
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
    //展示出所有的雷
    showmine: function (dommap) {
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
    //绑定事件
    bindEvent: function () {
        dommap.onclick = function (e) {
            console.log(e)
        }
    },
    //创建雷区dom
    createDom: function (wrapper) {
        //创建 ul.col > li * col > ul.row > li * row的结构
        col = this.col;
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
                rowUl.appendChild(rowLi);
            }
            colLi.appendChild(rowUl);
        }
        fragment.appendChild(colUl);
        this.dommap = colUl;
        wrapper.innerHTML = "";
        wrapper.appendChild(fragment);
    }
}


var domwarpper = document.getElementsByClassName('mines')[0];

mine.init(domwarpper);