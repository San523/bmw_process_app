<template>
  <div>
    <Layout style='text-align: center;' :has_footer='false' :title="language.title_setting" :bottom_nav="[]">
    </Layout>
    <span class="lititle">{{language.language_select}}</span>
    <!-- 单选框 -->
    <div>
      <div class="selectBox" @click="changLan('select1')">
        <div class="flex">
          <span class="selectBtn" :class="select1">
          </span>中文
        </div>
      </div>
      <div class="selectBox2" @click="changLan('select2')">
        <div class="flex">
          <span class="selectBtn" :class="select2">
          </span>English
        </div>
      </div>
    </div>
    <!-- 单选框 -->
    <!-- <mt-radio v-model="value" :options="['中文','English']" @click.native="changLan()">
    </mt-radio> -->
  </div>
</template>
<script type="text/javascript">
import ApiCloud from '@/assets/js/api.min.js' //导入apicloud的JS代码
import ChangeLanguage from '../language/changeLanguage.js' //引用模块进来
import Layout from '@/components/Layout';
export default {
  //该页面的控制数据
  data() {
    return {
      language: '设置',
      has_return: false,
      value: '',
      select1: "",
      select2: "",
    }
  },
  //父控件传过来的参数
  props: {

  },
  //监听函数
  wacth: {
    select1: function(val, oldval) {
      this.changLan();
    },
  },
  created() {
    this.tellLan();
  },
  //进入页面执行的函数å
  mounted() {

  },
  //定义函数
  methods: {
    //判断语言
    tellLan() {
      //this.value = this.$store.state.languageType;
      if (this.$store.state.languageType == '中文') {
        this.select1 = "select";
        this.select2=""
        this.language = ChangeLanguage.ChinesesLa;
      } else if (this.$store.state.languageType == 'English') {
        this.select2 = "select"
        this.select1=""
        this.language = ChangeLanguage.EnglishLa;
      }
      this.bottom_nav = this.language.bottom_nav_userCore;
    },

    //语言切换
    changLan(v) {
      if (v == "select1") {
        this.select1 = "select";
        this.select2=""
        this.$store.commit('updatelanguageStatus', "中文");
        this.language = ChangeLanguage.ChinesesLa;
        //this.$store.commit('updatelanguageStatus', 'Chinese');
      } else if (v =="select2") {
        this.select2 = "select"
        this.select1=""
        this.$store.commit('updatelanguageStatus', "English");
        this.language = ChangeLanguage.EnglishLa;
        //this.$store.commit('updatelanguageStatus', 'Chinese');
      }
    },
  },
  //增加控件
  components: {
    Layout
  }
}

</script>
<style scoped lang="css">
.lititle {
  display: block;
  margin: 10px 10px;
  font-size: 12px;
  color: #8492A6
}

.selectBox {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #E0E6ED;
  border-bottom: 1px solid #E0E6ED;
  margin-top: 10px
}

.selectBox2 {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #E0E6ED;
}


.selectBtn {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 12px;
  margin: 0 10px;
}

.select {
  display: inline-block;
  width: 10px;
  height: 10px;
  border: 6px solid #20A0FF;
  border-radius: 12px;
  margin: 0 10px;
}

.flex {
  display: flex;
}

</style>
