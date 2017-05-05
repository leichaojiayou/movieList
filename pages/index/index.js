//index.js
//获取应用实例
var app = getApp()
var defaultData = {
    touchDot: 0, //触摸时的原点
    time: 0, //  时间记录，用于滑动时且时间小于1s则执行左右滑动
    interval: "", // 记录/清理 时间记录
    unReadArr: [
       7797268,7797269
    ],
    likeArr: [],
    unlikeArr: [],
    movieData: {
        7797267: {
            messageId: 7797267,
            picObj: {
                width: 600,
                height: 337,
                url: '../../fine.jpg'
            },
            cnName: '你的名字你的名字你的名字你的名字',
            score: '8.4',
            detail: '在远离大都会的小山村，住着巫女世家出身的高中女孩宫水三叶（上白石萌音 配音）。校园和家庭的原因本就让她充满烦恼，而近一段时间发生的奇怪事件，又让三叶摸不清头脑。不知从何时起，...',
            liked: 0,
            isShow: true
        },
        7797268: {
            detail: "《一条狗的使命》3月3日上映，豆瓣8分。 拉斯·霍尔斯道姆执导，影片讲述了一条狗经历多次重生，在一次次生命的轮回中寻找不同的使命，最后又回到了最初的主人身边的故事。豆瓣热门短评：“催泪型温情片，故事比较俗套但是不影响好看啊。”",
            messageId: 7797268,
            cnName: "一条狗的使命",
            score: 8.0,
            picObj: {
                width: 424,
                height: 600,
                url: "https://cdn.ruguoapp.com/FueNyDQcxhc9o0zeQjtqhTGOXPOd.jpg?imageView2/0/h/1000/interlace/0/q/80"
            },
            liked: 0,
            isShow: false
        },
        7797269: {
            messageId: 7797269,
            picObj: {
                width: 600,
                height: 337,
                url: '../../fine.jpg'
            },
            cnName: '金刚狼3：殊死一战',
            score: '8.3',
            detail: '詹姆斯·曼高德执导，休·杰克曼最后一次饰演金刚狼。该片根据漫威漫画改编，故事背景设定在2029年，讲述迈入暮年的金刚狼渐渐失去了体内的自愈因子，当一个与他能力相似的变种人劳拉出现，金刚狼决定出山保护劳拉的故事。',
            liked: 0,
            isShow: false
        },
    }
}
defaultData.isShowId = defaultData.unReadArr[0];
Page({
    data: defaultData,
    touchStart: function(e) {
        var touchDot = e.touches[0].pageX; // 获取触摸时的原点
        this.setData({
            touchDot
        })
    },
    onLoad: function(option) {
        // 页面初始化 options为页面跳转所带来的参数
        var windowWidth, windowHeight;
        var movieData = this.data.movieData,
            isShowId = this.data.isShowId;
        wx.getSystemInfo({
            success: function(res) {
                windowWidth = res.windowWidth;
                windowHeight = res.windowHeight;
            }
        })
        this.setData({
            windowWidth,
            windowHeight
        })
    },
    // 触摸移动事件
    touchMove: function(e) {
        var touchMove = e.touches[0].pageX,
            time = this.data.time,
            touchDot = this.data.touchDot;
        // console.log("touchMove:" + touchMove + " touchDot:" + touchDot + " diff:" + (touchMove - touchDot));
        // 向左滑动
        if (touchMove - touchDot <= -100 && time < 5) {
            console.log('向左');
            this.likeAction({
                action: "unlike"
            });
            this.markAsRead();
        }
        // 向右滑动
        if (touchMove - touchDot >= 100 && time < 5) {
            console.log('向右');
            this.likeAction({
                action: "like"
            });
            this.markAsRead();
        }
        // touchDot = touchMove; //每移动一次把上一次的点作为原点（好像没啥用）
    },
    // 触摸结束事件
    touchEnd: function(e) {
        var interval = this.data.interval;
        clearInterval(interval); // 清除setInterval
        this.setData({
            time: 0,
            tmpFlag: true // 回复滑动事件
        })

    },
    likeAction: function(params) {
        let id = this.data.isShowId;
        let obj = this.data.movieData;
        let likeArr = [],
            unlikeArr = [];
        if (params.action === 'like') {
            obj[id].liked = 1;
            // let likeData = this.data.likeArr.splice(obj[id], 1);
            likeArr.push(id);
            console.log(likeArr);
        } else if (params.action === 'unlike') {
            obj[id].liked = 2;
            unlikeArr.push(id);
        }
        this.setData({
            movieData: obj,
            likeArr,
            unlikeArr
        })
        console.log(this.data);
    },
    markAsRead: function() {
        let id = this.data.isShowId;
        let movieData = this.data.movieData;
        let unReadArr = this.data.unReadArr;
        let nextId = unReadArr[1],
            nowId = unReadArr[0];
        movieData[nowId].isShow = false;
        movieData[nextId].isShow = true;
        this.setData({
            isShowId: unReadArr[1]
        })
        unReadArr.splice(id, 1);
    }
})