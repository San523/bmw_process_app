<!-- 待我审批详情页面 -->
<template>
  <div class="">
    <Layout style='text-align: center;' :has_return="true" :title="title" :has_footer="false">
      <!-- <h1>{{language}}</h1> -->
    </Layout>
    <mt-button type="primary" @click.native="changLan('Chinese')">中文</mt-button>
    <mt-button type="primary" @click.native="changLan('English')">英文</mt-button>
  </div>
</template>
<script type="text/javascript">
import ApiCloud from '@/assets/js/api.min.js'; //导入apicloud的JS代码
import ChangeLanguage from '../language/changeLanguage.js' //引用模块进来
import Layout from '@/components/Layout';
export default {
  //该页面的控制数据
  data() {
    return {
      language: ChangeLanguage.ChinesesLa,
      title: '审批', //页面标题

    };
  },
  //父控件传过来的参数
  props: {

  },

  //计算属性
  computed: {

  },
  //监听函数
  wacth: {

  },
  created() {
    this.tellLan();
  },
  //进入页面执行的函数å
  mounted() {

  },
  //定义函数
  methods: {
    //判断系统语言
    tellLan() {
      if (this.$store.state.languageType == '中文') {
        this.language = ChangeLanguage.ChinesesLa;
      } else if (this.$store.state.languageType == 'English') {
        this.language = ChangeLanguage.EnglishLa;
      }
      this.bottom_nav = this.language.bottom_nav_processReport;
    }

  },
  //增加控件
  components: {
    Layout
  }
}

</script>
<style scoped lang="css">


</style>
