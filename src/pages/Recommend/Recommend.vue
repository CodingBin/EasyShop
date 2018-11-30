<template>
    <div class="recommend-container" >
      <ul class="recommend" v-if="userInfo.id && recommendshoplist.length > 0">
        <shop-list
          tag="li"
          v-for="(item,index) in recommendshoplist"
          :item = item
          :key="index"
          :clickCellBtn="dealWithCellBtnClick"
        />
      </ul>
      <select-login v-else/>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import ShopList from './../../components/ShopList/ShopList'
  import BScroll from 'better-scroll'
  import {addGoodsToCart} from './../../api/index'
  import SelectLogin from './../Login/SelectLogin'
  //import {Indicator} from 'mint-ui'

    export default {
        name: "Recommend",
        data:function(){
          return{
            page:1,
            count:20,
          }
        },
        mounted:function () {
          //Indicator.open('加载中');
          this.$store.dispatch('reqRecommendShopList',{page:this.page,count:this.count});
        },
        computed:{
          ...mapState(['recommendshoplist','userInfo'])
        },
        components:{
          ShopList,
          SelectLogin
        },
        watch:{
          recommendshoplist(){
            this.$nextTick(()=>{
              //让当前的页码加一
              this.page += 1;
              //初始化
              this._initBScroll();
            })
          }
        },
        methods:{
          _initBScroll:function () {
            //初始化
            this.listScroll= new BScroll('.recommend-container',{
              scrollY:true,
              probeType:3,
            });
            //1.2监听列表滚动
            this.listScroll.on('touchEnd',(pos)=>{
              //1.2.1监听下拉
                if (pos.y >= 50) {
                  console.log('下拉刷新')
                }
              //1.2.2监听上拉
                if (this.listScroll.maxScrollY > pos.y + 20) {
                  console.log(this.page);
                  console.log('上拉加载');
                  this.$store.dispatch('reqRecommendShopList',{page:this.page,count:this.count});
                }
            });
            //1.3监听列表滚动结束
            this.listScroll.on('scrollEnd',()=>{
                this.listScroll.refresh();
            });

          },
          //监听商品点击
          async dealWithCellBtnClick(goods) {
            //1.发送请求
            let result = await addGoodsToCart(this.userInfo.id,goods.goods_id,goods.goods_name,goods.thumb_url,goods.price);
            console.log(result);
          }
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .recommend-container
    background #f5f5f5
    width 100%
    height 100%
    overflow hidden
    .recommend
      display: flex
      flex-direction row
      flex-wrap wrap
      background: #f5f5f5
      padding-bottom 50px
      /*.recommend-item:nth-child(2n-1)*/
        /*margin-right 1%*/
      /*.recommend-item*/
          /*width 49.5%*/
          /*background: #fff*/
          /*padding-bottom 15px*/
          /*margin-bottom 15px*/
          /*.item-title*/
             /*line-height 20px*/
             /*font-size 13px*/
             /*font-weight lighter*/
             /*height:20px*/
             /*overflow hidden*/
             /*margin:5px 0*/
             /*padding:0 5px*/
          /*.item-bottom*/
              /*display flex*/
              /*flex-direction row*/
              /*align-items center*/
              /*padding 0 6px*/
              /*.item-price*/
                  /*flex 2*/
                  /*color red*/
                  /*font-weight  bolder*/
                  /*font-size 12px*/
              /*.item-sales*/
                  /*flex 4*/
                  /*font-size 10px*/
                  /*color #666*/
              /*.item-btn*/
                  /*flex 2*/
                  /*border 1px solid orangered*/
                  /*height 26px*/
                  /*border-radius 5px*/
                  /*font-size 10px*/
                  /*background-color transparent*/
                  /*color red*/
</style>
