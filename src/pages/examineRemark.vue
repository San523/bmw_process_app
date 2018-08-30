<!-- 无身份审批确认页面 -->
<template>
  <div class="backgroud">
    <Layout style='text-align: center;' :has_return="true" :bottom_nav="bottom_nav" :title="language.examineEnsureTitle" :has_footer="false">
    </Layout>
    <!-- 备注 -->
    <span class="lititle">{{language.remark}}：</span>
    <div class="remark">
      <textarea v-model="remark" :placeholder="language.textplaceholder"> </textarea>
    </div>
    <!-- 备注 -->
    <div class="sure">
      <button @click="ApplicationAuditing">{{language.confirm}}</button>
    </div>
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
      selectRemember: 0,
      language: ChangeLanguage.ChinesesLa,
      title: '审批', //页面标题,
      bottom_nav: [], //底部栏信息
      remark: "", //备注
      //选择值
      select1: "select",
      select2: "",
      parentMsg: this.$route.query,
    }
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
    console.log(this.parentMsg.id)
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
    },

    ApplicationAuditing() {
      this.$messagebox({
        title: '提示',
        message: '确定审批?',
        showCancelButton: true
      });
      this.$messagebox.confirm('确定审批?').then(action => {
        if (action == 'confirm') {
          let params = new URLSearchParams();
          params.append('audit', this.parentMsg.audit); //审批状态
          params.append('userid', localStorage.getItem("userid")); //用户id
          params.append('id', this.parentMsg.id); //流程id
          params.append('remarks', this.remark); //备注
          this.$store.dispatch('ApplicationAuditing', params).then((response) => {
            let res = response.data;
            if (response.statusText === 'OK' && response.status === 200) {
              //console.log(res);
              if (res.status == "success") {
                this.$toast({
                  message: '操作成功',
                  iconClass: 'icon icon-success'
                });
                var s = this.parentMsg.item;
                var num = s.replace(/[^0-9]/ig, "");
                this.$store.commit('updateprocessManageSelect', num);
                this.$router.push({ name: 'ProcessManage' });
              } else {
                this.$toast("后台错误");
              }
            } else {
              this.$toast("网络错误");
            }
          }).catch((err) => {
            this.$toast("网络连接错误");
          });
        }
      });


      //this.$router.go(-1);
    }

  },
  //增加控件
  components: {
    Layout
  }
}

</script>
<style scoped lang="css">
.backgroud {
  background-color: #FAFAFA
}

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

.selectBtnRemark {
  color: red;
  float: right;
  font-size: 14px;
  margin-right: 10px
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

.remark {
  height: 140px;
  border: 1px solid #E0E6ED;
  padding: 5px 5px;
}

.remark textarea {
  border: none;
  width: 100%;
  height: 100%;
  font-size: 16px
}

.sure {
  text-align: center;
  margin-top: 30px
}

.sure button {
  width: 335px;
  height: 44px;
  background: rgba(32, 160, 255, 1);
  border-radius: 4px;
  font-size: 16px;
  color: #fff;
  border: none
}

</style>
