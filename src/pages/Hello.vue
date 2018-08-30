<template>
  <div>
    <Layout style='text-align: center;' :has_return="false" :title="language.title_userCore" footer_active="userCore" :bottom_nav="bottom_nav">
    </Layout>
    <!-- navbar -->
    <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="1">选项一</mt-tab-item>
      <mt-tab-item id="2">选项二</mt-tab-item>
      <mt-tab-item id="3">选项三</mt-tab-item>
    </mt-navbar>
    <div>
      <mt-cell class="page-part" title="当前选中">{{ selected }}</mt-cell>
    </div>
    <!-- tabcontainer -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <mt-cell :key="n" v-for="n in 10" :title="'内容 ' + n" />
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-cell :key="n" v-for="n in 4" :title="'测试 ' + n" />
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <mt-cell :key="n" v-for="n in 6" :title="'选项 ' + n" />
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import ChangeLanguage from '../language/changeLanguage.js' //引用模块进来
import Layout from '@/components/Layout';
export default {
  name: 'page-navbar',

  data() {
    return {
      selected: '1',
      language: ChangeLanguage.ChinesesLa,
      bottom_nav: '',
    };
  },

  created() {
    this.tellLan();
  },

  methods: {
    //判断语言
    tellLan() {
      if (this.$store.state.languageType == '中文') {
        this.language = ChangeLanguage.ChinesesLa;
      } else if (this.$store.state.languageType == 'English') {
        this.language = ChangeLanguage.EnglishLa;
      }
    },
  },
  //增加控件
  components: {
    Layout
  }
};

</script>
