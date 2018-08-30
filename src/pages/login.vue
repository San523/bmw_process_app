<template>
  <div class="bgImg">
    <transition name="loginBox">
      <login-box v-on:childMethod="changeActive(2)" v-if="active==1"></login-box>
    </transition>
    <transition name="settingBox">
      <setting-box v-on:childMethod="changeActive(3)" v-if="active==2"></setting-box>
    </transition>
    <transition name="selectproBox">
      <selectpro-box v-if="active==3"></selectpro-box>
    </transition>
  </div>
</template>
<script type="text/javascript">
import loginBox from '@/components/loginBox'; //登陆栏
import settingBox from '@/components/settingBox'; //设置语言栏
import selectproBox from '@/components/selectproBox'; //选择项目栏
import ChangeLanguage from '../language/changeLanguage.js' //引用模块进来

export default {
  data() {
    return {
      author: false,
      language: ChangeLanguage.ChinesesLa, //系统选择语言
      active: 1
    }
  },
  props: {

  },

  computed: {

  },
  wacth: {

  },
  created() {
    document.setTitle('登录');
    this.tellLan();
  },
  mounted() {

  },
  methods: {
    //进入网络设置页面，将Vuex里面的active设置为2
    joinSetting() {
      this.$store.commit('updateActive', 2)
    },
    //进入登录页面，将Vuex里面的active设置为1
    joinLogin() {
      this.$store.commit('updateActive', 1)
    },

    //判断系统语言
    tellLan() {
      if (this.$store.state.languageType == '中文') {
        this.language = ChangeLanguage.ChinesesLa;
      } else if (this.$store.state.languageType == 'English') {
        this.language = ChangeLanguage.EnglishLa;
      }
      this.bottom_nav = this.language.bottom_nav_processReport;
    },


    //子组件改变弹出框
    changeActive(v) {
      //alert(v);
      this.active = v;
    }
  },
  components: {
    loginBox,
    settingBox,
    selectproBox
  }
}

</script>
<style scoped>
.bgImg {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 100%;
  background-image: url(../assets/img/bg.png);
}

.loginBox {
  z-index: 1;
}

.settingBox {
  width: 520px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  /*justify-content: center;*/
  flex-direction: column;
  align-items: center;
}

.loginBox-enter-active {
  transition: all .5s ease .2s;
}


.loginBox-enter,
.loginBox-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */

{
  transform: translateX(5px);
  opacity: 0;
}

</style>
