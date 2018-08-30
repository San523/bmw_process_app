<!-- 选择人员页面 -->
<template>
  <div class="background">
    <Layout style='text-align: center;' :has_return="true" :bottom_nav="bottom_nav" :title="language.chooseUserTitle" :has_footer="false">
    </Layout>
    <div class="br"></div>
    <div class="company" v-for="item in companyMeg" :key="item.companyid">
      <div class="company_name" @click="item.ifopen=!item.ifopen">
        <div>
          <img src="@/assets/img/company.png">
          <span>{{item.companyname}}</span>
        </div>
        <img class="arrow" :class="item.ifopen?'imgrotate':''" src="@/assets/img/arrow_icon2.svg">
      </div>
      <div class="company_user" v-for="vv in item.users" :key="vv.userid" v-if="item.ifopen" @click="chooseemployee(item,vv)">
        <div>{{vv.username}}</div>
      </div>
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
      title: '审批', //页面标题,
      bottom_nav: [], //底部栏信息
      openPeople: false, //默认不展开人员
      parentMsg: this.$route.query,
      /*公司人员信息*/
      companyMeg: [{
        companyname: "华晨宝马沈阳工厂",
        companyid: "dsgewrrgweg",
        ifopen: false,
        users: [{
          username: "赵一一",
          userid: "dsgergwergki",
        }, {
          username: "钱二二",
          userid: "grhrthytj",
        }, {
          username: "孙三三",
          userid: "grhrewtqtj",
        }, {
          username: "李思思",
          userid: "3t3rggsfes",
        }, {
          username: "周武武",
          userid: "3t3rggsfes11",
        }, {
          username: "吴溜溜",
          userid: "3t3rggsfasdas",
        }, ]
      }, {
        companyname: "东风设计研究院",
        companyid: "fegrthytjyt",
        ifopen: false,
        users: [{
          username: "吴迪",
          userid: "dsgerergki",
        }, {
          username: "饶靖雯",
          userid: "grhrthyj",
        }, {
          username: "黄灿",
          userid: "grrewtqtj",
        }]
      }, {
        companyname: "中信设计研究院",
        companyid: "fegrtsfwtjyt",
        ifopen: false,
        employee: []
      }, {
        companyname: "东智通机电设备有限公司",
        companyid: "fdgrgrt",
        ifopen: false,
        users: [{
          username: "郑七七",
          userid: "dgewrhweg",
        }, {
          username: "王爸爸",
          userid: "grhertwhyj",
        }, {
          username: "冯久久",
          userid: "g4312ewtqtj",
        }, {
          username: "程时时",
          userid: "g43ferewtqtj",
        }]
      }, ]

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
    this.getProjectCompaninesAndUsers()
  },
  //进入页面执行的函数å
  mounted() {
    //console.log(this.parentMsg.ProjectID);
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

    //展开人员
    openProjecter() {
      this.openPeople = !this.openPeople
    },

    //带回人员
    chooseemployee(pro, v) {
      console.log(v);
      pro.username = v.username;
      pro.userid = v.userid;
      this.$store.commit('updatetransferringMeg', pro);
      //pro.
      // pro=pro.concat(v);
      this.$router.go(-1);
      //this.$router.push({ name: 'Transferring', query: pro });
    },

    getProjectCompaninesAndUsers() {
      this.$indicator.open();
      let params = new URLSearchParams();
      params.append('projectid', this.parentMsg.ProjectID); //项目id
      this.$store.dispatch('getProjectCompaninesAndUsers', params).then((response) => {
        let res = response.data;
        if (response.statusText === 'OK' && response.status === 200) {
          if (res.status == "success") {
            let data =res.ret;
            for (var i = data.length - 1; i >= 0; i--) {
              data[i].ifopen=false
            }
             this.companyMeg=data
             this.$indicator.close();
          }else{
            this.$indicator.close();
            this.$toast("后台错误");
          }
        } else {
          this.$indicator.close();
          this.$toast("网络错误");
        }
      }).catch((err) => {
        this.$indicator.close();
        this.$toast("网络连接错误");
      });
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

.br {
  height: 8px;
  border-bottom: 1px solid #DDDEDE;
  width: 100%
}

.company_name {
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
  border-bottom: 1px solid #DDDEDE;
}

.company_name div img {
  vertical-align: middle;
  width: 20px;
  height: 20px;
}

.company_name div span {
  color: #475669;
  font-size: 16px;
  margin-left: 10px
}

.imgrotate {
  -webkit-transform: rotate(180deg);
  transform: rotateX(180deg);
}

.company_user div {
  padding: 10px 55px;
  border-bottom: 1px solid #DDDEDE;
}

.arrow {

  float: right;
}

</style>
