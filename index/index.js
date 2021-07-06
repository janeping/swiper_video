const app = getApp()

Page({
  data: {// banner 轮播图 
          proKVlist: [{
            "kvImg": "http://vjs.zencdn.net/v/oceans.mp4",
            "kvRule": "brand=可乐",
            "kvIndex": 1,
            "kvType": 2
          }, {
            "kvImg": "https://media.w3.org/2010/05/sintel/trailer.mp4",
            "kvRule": "brand=雪碧",
            "kvIndex": 2,
            "kvType": 2
          }, {
            "kvImg": "https://api-hmugo-web.itheima.net/pyg/pic_floor01_3@2x.png",
            "kvType": 1,
            "kvIndex": 3,
            "kvRule": "category=衣服&brand=盗版"
          }, {
            "kvImg": "https://api-hmugo-web.itheima.net/pyg/pic_floor01_4@2x.png",
            "kvType": 1,
            "kvIndex": 4,
            "kvRule": "category=衣服&brand=名牌"
          }, {
            "kvImg": "https://api-hmugo-web.itheima.net/pyg/pic_floor01_2@2x.png",
            "kvType": 1,
            "kvIndex": 5,
            "kvRule": "category=人物&brand=杂牌"
          }, {
            "kvImg": "https://api-hmugo-web.itheima.net/pyg/pic_floor01_3@2x.png",
            "kvType": 1,
            "kvIndex": 6,
            "kvRule": "category=衣服&brand=杂牌"
          }],
          "newArticles": [],
          "hotArticles": [],
          "status": 200,
          true: true,
          false: false,
          interval: 5000, //轮播时间
          duration: 400, // 滑动速度越大越慢
          beforeColor: "lightgray", //指示点颜色
          afterColor: "red", //当前选中的指示点颜色
          controls: true,// 是否显示默认播放控件（播放/暂停按钮、播放进度、时间
          videoAutoplay: false,// 视频是否自动播放
          current: 0,
          swiperAutoplay: true// 是否自动轮播图片和视频
  },
     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
        if(this.data.proKVlist[0].kvType == 2){
          this.setData({
            swiperAutoplay: false,// 就是不是WiFi环境播放当前视频了，也不自动轮播\
          })
        }
       this.getWifiEnv()
        
     },
     /**
      * 生命周期函数--监听页面初次渲染完成
      */
     onReady: function () {
     },
   // 播放
   videoPlay: function(e) {
     console.log("开始播放")
     var videoplay = wx.createVideoContext("video");
     videoplay.play()
     this.setData({
       controls: true,
     });
     var that = this
     that.setData({
       coverImageClass: 'hide',
       videoClass: 'show',
       coverVideoSrc: that.data.video_url
     }, function() {
       that.videoContext.play()
     })
   },
   getWifiEnv: function () {
     var that = this
     wx.getNetworkType({
       success: function (res) {
         if (res.networkType == 'wifi') {// 判断当前环境是否是WiFi
           that.setData({
             videoAutoplay: true// 如果是就自动播放视频
           })
         }
       }
     })
   },
   swiperChange(e) {
       console.log(e.detail.current)
       let current = e.detail.current;// 获取当前的current
       let source = e.detail.source;// 获取当前的source
       let that = this
        let dataList = this.data.proKVlist;
        for(let i = 0;i < dataList.length;i++){
          if((i != current) && (dataList[i].kvType == 2)) {
            let videoContextPrev = wx.createVideoContext("video" + i)
            videoContextPrev.stop();
          }
        }
       if (dataList[current].kvType == 1) {// 判断data中的数组proKVlist里面的元素类型1图片2视频
         that.setData({
           swiperAutoplay: true// 如果当前是图片，将自动轮播
         })
       }else{
            that.setData({
              swiperAutoplay: false,// 播放当前视频时，不自动轮播
            })
          console.log(current)
          wx.getNetworkType({
           success: function (res) {
            console.log(res)
            if (res.networkType == 'wifi') {// 如果是WiFi环境，将自动播放
                let videoContextCurrent = wx.createVideoContext("video" + current)
                videoContextCurrent.play();
            }
         }
       })
      }
    },
    videoPlayend(){
      console.log('播放完成')
      this.setData({
        swiperAutoplay:true,//播放完成自动切换下一个
      })
    }
})
