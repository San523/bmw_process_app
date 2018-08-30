<!-- 转审页面 -->
<template>
  <div class="background">
    <Layout style='text-align: center;' :has_return="true" :bottom_nav="bottom_nav" :title="language.transferTitle" :has_footer="false">
    </Layout>
    <span class="lititle"><span >*</span>{{language.choosePerson}}：</span>
    <div class="transferee" @click="toChooseUser">
      <span>{{language.transferee}}</span>
      <span v-if="!ifHaveUser" class="right">+</span>
      <span class="rightName" v-if="ifHaveUser">{{this.userArray.companyname}}          {{this.userArray.username}}</span>
    </div>
    <!-- 备注 -->
    <span class="lititle">{{language.transfereason}}：</span>
    <div class="remark">
      <textarea :placeholder="language.fileReaon" v-model="transfeReason"> </textarea>
    </div>
    <!-- 备注 -->
    <div class="sure" @click="Confirmation">
      <button>{{language.Confiretransfer}}</button>
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
      language: ChangeLanguage.ChinesesLa,
      bottom_nav: [], //底部栏信息
      idTitle: "", //身份标题
      ifremarkShow: true, //默认是选项后的说明展示
      transfeReason: "", //转审原因
      //是否选择人员
      ifHaveUser: this.$store.state.transferringMeg.length != 0,
      userArray: this.$store.state.transferringMeg,
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
    console.log(this.$store.state.transferringMeg.length != 0);
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
    },
    //选择人员
    toChooseUser() {
      this.$router.push({ name: 'ChooseUser', query: this.parentMsg });
    },

    //判断是否选择人员带回
    ifHaveUserBack() {
      this.$route.query
    },

    //确认转审
    Confirmation() {
      if (!this.ifHaveUser) {
        //this.$toast("还未选择转审人员");
        this.$toast({
          message: '还未选择转审人员',
          position: 'bottom',
          duration: 5000
        });
      } else {
        this.$messagebox({
          title: '提示',
          message: '确定转审?',
          showCancelButton: true
        });
        this.$messagebox.confirm('确定转审?').then(action => {
          if (action == 'confirm') {
            let params = new URLSearchParams();
            params.append('audit', "change"); //审批状态
            params.append('userid', localStorage.getItem("userid")); //用户id
            params.append('id', this.parentMsg.id); //流程id
            params.append('transfer', this.userArray.userid); //人员id
            params.append('remarks', this.transfeReason); //转审原因
            this.$store.dispatch('ApplicationAuditing', params).then((response) => {
              let res = response.data;
              if (response.statusText === 'OK' && response.status === 200) {
                if (res.status == "success") {
                  this.$store.commit('updatetransferringMeg', []); //清空人员信息
                  this.$toast({
                    message: '操作成功',
                    iconClass: 'icon icon-success'
                  });
                  var s = this.parentMsg.item;
                  var num = s.replace(/[^0-9]/ig, "");
                  this.$store.commit('updateprocessManageSelect', num);
                  this.$router.push({ name: 'ProcessManage' });
                  // var self = this;
                  // setTimeout(function() {
                  //   self.$router.push({ name: 'ProcessManage' });
                  // }, 1500);

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



      }

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
  margin: 15px 10px;
  font-size: 14px;
  color: #8492A6
}

.lititle span {
  color: red;
  font-size: 14px;
}


.flex {
  display: flex;
}

.transferee {
  border: 1px solid #E0E6ED;
  padding: 10px 10px;
  color: #475669;
  font-size: 14px
}

.transferee .right {
  color: #D3DCE6;
  float: right;
  font-size: 18px
}

.rightName {
  color: #475669;
  float: right;
  font-size: 14px
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
