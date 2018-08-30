<template>
  <div class="Box ">
    <div class="logoImg"></div>
    <div class="IDtell">
      <span>请选择语言</span><br>
      <span>Select language</span>
    </div>
    <div class="sure">
      <button @click="changLan('中文')">中文</button>
      <button @click="changLan('English')">English</button>
    </div>
  </div>
</template>
<script type="text/javascript">
import ChangeLanguage from '../language/changeLanguage.js' //引用模块进来
export default {
  data() {
    return {
      language: '',
      selectRemember: 0,
    }
  },
  props: {

  },
  computed: {

  },
  wacth: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    //语言切换
    changLan(v) {
       this.$store.commit('updatelanguageStatus', v);
      if (v == '中文') {
        this.language = ChangeLanguage.ChinesesLa;
      } else if (v == 'English') {
        this.language = ChangeLanguage.EnglishLa;
      }
      this.$emit('childMethod');
    }

  },
  components: {

  }
}

</script>
<style scoped>
.Box {
  width: 345px;
  height: 320px;
  background: #fff;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.5);
}

.logoImg {
  width: 305px;
  height: 32px;
  background-size: 100%;
  background-image: url(../assets/img/DFD.png);
  margin: 20px 20px
}

.IDtell {
  color: #5E6D82;
  font-size: 14px;
  margin-top: 30px;
  margin-left: 23px;
}

.sure {
  text-align: center;
}

.sure button {
  width: 300px;
  height: 44px;
  background: #FFFFFF;
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSC-Semibold;
  color: #4675A8;
  border: none;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.3);
  margin-top: 20px
}

</style>
