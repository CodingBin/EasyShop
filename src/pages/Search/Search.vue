<template>
    <div class="search">
      <!--搜索导航-->
      <search-nav :isShowSearchPanel="isShowSearchPanel"/>
      <!--联动列表-->
      <div class="shop">
        <!--左边-->
        <div class="menu-wrapper">
          <ul>
            <!--current-->
            <li class="menu-item"
                v-for="(goods,index) in searchgoods"
                :key="index"
                :class="{current:index === currentIndex}"
                @click="clickLeftItem(index)"
                ref="menulist"
            >
              <span>{{goods.name}}</span>
            </li>

          </ul>
        </div>

        <!--右边-->
        <div class="shop-wrapper">
          <ul ref="shopsParent">
            <li class="shops-li" v-for="(goods,index1) in searchgoods" :key="index1">
              <div class="shops-title">
                <h4>{{goods.name}}</h4>
                <a href="">查看更多 ></a>
              </div>
              <ul class="shops-items">
                <li v-for="(item,index2) in goods.items" :key="index2" >
                  <img :src="item.icon" alt="">
                  <span>{{item.title}}</span>
                </li>

              </ul>
            </li>
          </ul>
        </div>
      </div>
      <!--搜索面板-->
      <search-panel v-if="isShow" :isShowSearchPanel="isShowSearchPanel"/>
    </div>
</template>

<script>
  import SearchNav from './children/SearchNav'
  import SearchPanel from './children/SearchPanel'
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
    export default {
        name: "Search",
        mounted:function(){
          this.$store.dispatch('reqSearchGoods')
        },
        data:function(){
          return{
            scrollY: 0, // 右侧列表滑动的Y轴坐标(实时更新)
            rightLiTops: [], // 所有分类的头部位置
            isShow:false,//设置搜索面板的显示
          }
        },
        computed:{
          ...mapState(['searchgoods']),
          //1.用于动态决定左侧哪个选项被选中
          currentIndex(){
            //1.1获取数据
              const {scrollY,rightLiTops} = this;
            //1.2取出索引
            return rightLiTops.findIndex((liTop,index)=>{
              this._leftScroll(index);
                return scrollY >= liTop && scrollY < rightLiTops[index + 1];
              })
          },
        },
        components:{
          SearchNav,
          SearchPanel,
        },
        watch:{
          searchgoods(){
            this.$nextTick(()=>{
              //1.1
              this._initBScroll();
              //1.2求出右边所有版块的头部位置
              this._initRightLiTops();
            })
          }
        },
        methods:{
          //1.1初始化
          _initBScroll:function () {
            //1.1左边
            this.leftScroll = new BScroll('.menu-wrapper',{
              click:true
            });
            //1.2右边
            this.rightScroll = new BScroll('.shop-wrapper',{
              probeType:3,
            });
            //1.3监听右侧的滑动事件
            this.rightScroll.on('scroll',(pos)=>{
              this.scrollY = Math.abs(pos.y);
            });


          },
          //1.2求出右边所有版块的头部位置
          _initRightLiTops:function () {
            //1.2.1临时数组
            const tempArr = [];
            //1.2.2定义变量记录高度
            let top = 0;
            tempArr.push(top);
            //1.2.3遍历li标签，取出高度
            let allLis = this.$refs.shopsParent.getElementsByClassName('shops-li');
            Array.prototype.slice.call(allLis).forEach(li=>{
                top += li.clientHeight;
                tempArr.push(top);
            });
            //1.2.4更新数据
            this.rightLiTops = tempArr;

          },
          //1.3点击切换
          clickLeftItem:function (index) {
            this.scrollY = this.rightLiTops[index];
            console.log(111);
            this.rightScroll.scrollTo(0,-this.scrollY,300);
          },
          //1.4左侧联动
          _leftScroll:function (index) {
            let menulists = this.$refs.menulist;
            //console.log(menulists);
            let el = menulists[index];
            this.leftScroll.scrollToElement(el,300,0,-100);
          },
          //1.5设置搜索面板的显示
          isShowSearchPanel:function (flag) {
            this.isShow = flag;
          }
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .search
    background #f5f5f5
    width 100%
    height 100%
    overflow hidden
  .shop
    display flex
    position absolute
    top 60px
    bottom 50px
    width 100%
    background-color: #fff
    overflow hidden
    .menu-wrapper
      background-color #e0e0e0
      width 80px
      flex 0 0 80px
      .menu-item
          width 100%
          height 60px
          background-color #fafafa
          display flex
          justify-content center
          align-items center
          font-weight lighter
          color #666
          position relative
      .current
              color #e02e24
      .current::before
          content :''
          background-color #e02e24
          width 4px
          height 30px
          position absolute
          left 0
    .shop-wrapper
        flex 1
        background-color #fff
        .shops-title
            display flex
            flex-direction row
            padding 0 10px
            height 44px
            align-items center
            justify-content space-between
            color #999
            a
              color #999
              text-decoration none
              font-weight lighter
        .shops-items
            display flex
            flex-wrap wrap
            li
              display flex
              flex-direction column
              width 33.3%
              height 90px
              justify-content center
              align-items center
              color #666
              font-weight lighter
              font-size 14px
              img
                width 60%
                heigth 60%
                margin-bottom 5px
</style>
