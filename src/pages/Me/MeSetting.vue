<template>
    <div class="me-setting">
      <div style="margin-top: 10px">
        <me-common-cell left-icon="itlike-2" left-title="免密支付"/>
        <me-common-cell left-icon="itlike-3" left-title="拼单设置"/>
        <me-common-cell left-icon="itlike-1" left-title="消息接收设置" right-title="接收"/>


      </div>

      <div style="margin-top: 10px">
        <me-common-cell left-icon="itlike-5" left-title="免密支付" :click-cell="dealCellClick"/>
        <me-common-cell left-icon="itlike-4" left-title="免密支付"/>
      </div>

      <div style="margin-top: 10px">
        <me-common-cell left-icon="itlike-1" left-title="免密支付"/>
      </div>

      <div class="logout" @click="dealLogout">退出登录</div>
    </div>
</template>

<script>
  import MeCommonCell from './MeCommonCell'
  import {mapActions} from 'vuex'
  import {Toast, MessageBox} from 'mint-ui';
    export default {
        name: "MeSetting",
        components:{
          MeCommonCell,
        },
        methods:{
          ...mapActions(["logOut"]),
          dealCellClick:function () {
            
          },
          dealLogout:function () {
            MessageBox.confirm('您确定退出登录吗?').then(action => {
              // console.log(action);
              if('confirm' === action){
                // 退出登录
                let result = this.logOut({});
                // console.log(result);
                // 回到主界面
                this.$router.replace('/home');
              }
            });
          }
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .logout
      width 100%
      height 44px
      margin-top 10px
      background-color red
      display flex
      justify-content center
      align-items center
      text-align center


</style>
