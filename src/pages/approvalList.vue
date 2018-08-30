<!-- 审批列表页面 -->
<template>
  <div class="background">
    <Layout :has_select="false" :has_return="true" :bottom_nav="bottom_nav" :title="title" :has_footer="false">
    </Layout>
    <!--  <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :max-distance="150" ref="loadmore"> -->
    <div class="group" @touchstart="closeProjectList">
      <div id="search" ref='search'>
        <input type="text" v-model="searchTx" @keyup.enter="search" :placeholder="language.search_placeholder">
      </div>
      <mt-tab-item class="selecte" id="3">
        <div ref='selecte3'>
          <div class='list' v-for="ele in approvallistContent" @click="toMyapplicationDetail(ele,'selecte1')">
            <div class="applyNum">
              <div class="Nfds">
                <span>{{ele.applyNum}}</span>
                <span v-if="ele.ifRed" class="span"><i class="tip"></i></span>
              </div>
              <div class="button_type" :class="ele.processType">
                <span v-show="ele.processType=='approvaling'">{{language.approvaling}}</span>
                <span v-show="ele.processType=='stoped'">{{language.stoped}}</span>
                <span v-show="ele.processType=='passed'">{{language.passed}}</span>
                <span v-show="ele.processType=='backed'">{{language.backed}}</span>
                <span v-show="ele.processType=='Urgeing'">{{language.Urgeing}}</span>
              </div>
            </div>
            <div class="list_apply">
              <span>{{language.project}}：{{ele.project}}</span>
              <span>{{language.applocant}}：{{ele.applocant}}</span>
              <span>{{language.application_time}}：{{ele.time}}</span>
            </div>
          </div>
        </div>
        <div v-if="noneData" class="noneData">
          <img src="@/assets/img/noneData.png">
        </div>
      </mt-tab-item>
    </div>
    <div class="bottomLine" v-if="allLoaded">-----我是有底线的-----</div>
    <!-- <div style="height: 22px"></div>  -->
    <!--  </mt-loadmore> -->
  </div>
</template>
<script type="text/javascript">
import ApiCloud from '@/assets/js/api.min.js'; //导入apicloud的JS代码
import ChangeLanguage from '../language/changeLanguage.js' //引用模块进来
import "@/assets/css/public.css";
import Layout from '@/components/Layout';

export default {
  //该页面的控制数据
  data() {
    return {
      selectRemember: 0,
      language: ChangeLanguage.ChinesesLa,
      title: this.$route.query.title + '列表', //页面标题,
      bottom_nav: [], //底部栏信息
      groupHeight: 0,
      allLoaded: false, //是否加载完
      noneData: false, //是否无数据
      searchTx: "", //搜索框内容
      loadmore: 1, //下拉次数
      /*每页显示数*/
      loadingNum: this.$store.state.loadingNum,

      /*审批列表 */
      approvallistContent: [],
      approvallistCount: 50, //列表总数
      approvallistContent1: [{
          applyNum: "001-DMN-HV-060001-DMN-HV", //申请单号
          project: "BMW 19.89", //所属项目
          applocant: "Windy", //申请人
          time: "2018-05-20", //申请日期
          processType: "approvaling", //所属状态
          ifRed: false, //是否已读
          detailType: "DMN", //跳转详情类型
          id: "5b1e353ff15969078c7a859e"
        },
        {
          applyNum: "001-DMN-HV-060001-DMN1", //申请单号
          project: "BMW 19.89", //所属项目
          applocant: "San", //申请人
          time: "2018-05-20", //申请日期
          processType: "passed", //所属状态
          ifRed: true, //是否已读
          detailType: "RFI", //跳转详情类型
          id: "5b1e353ff15969078c7a85"
        },
        {
          applyNum: "001-DMN-HV-060001-DMN2", //申请单号
          project: "BMW 19.89", //所属项目
          applocant: "San", //申请人
          time: "2018-05-20", //申请日期
          processType: "backed", //所属状态
          ifRed: true, //是否已读
          detailType: "DMN", //跳转详情类型
          id: "5b1e353ff15969078c7a"
        },
        {
          applyNum: "001-DMN-HV-060001-DMN1", //申请单号
          project: "BMW 19.89", //所属项目
          applocant: "San", //申请人
          time: "2018-05-20", //申请日期
          processType: "passed", //所属状态
          ifRed: true, //是否已读
          detailType: "RFI", //跳转详情类型
          id: "5b1e353ff159678c7a85"
        },
        {
          applyNum: "001-DMN-HV-060001-DMN2", //申请单号
          project: "BMW 19.89", //所属项目
          applocant: "San", //申请人
          time: "2018-05-20", //申请日期
          processType: "backed", //所属状态
          ifRed: true, //是否已读
          detailType: "DMN", //跳转详情类型
          id: "5b1e353ff159690"
        },
        {
          applyNum: "001-DMN-HV-060001-DMN1", //申请单号
          project: "BMW 19.89", //所属项目
          applocant: "San", //申请人
          time: "2018-05-20", //申请日期
          processType: "passed", //所属状态
          ifRed: true, //是否已读
          detailType: "RFI", //跳转详情类型
          id: "5b1e353f169078c7a85"
        },
        {
          applyNum: "001-DMN-HV-060001-DMN2", //申请单号
          project: "BMW 19.89", //所属项目
          applocant: "San", //申请人
          time: "2018-05-20", //申请日期
          processType: "backed", //所属状态
          ifRed: true, //是否已读
          detailType: "DMN", //跳转详情类型
          id: "5b1e35f15969078c7a"
        }
      ],
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
    //window.scrollTo(0, 0);
  },
  //进入页面执行的函数å
  mounted() {
    this.$children[0].project = this.$route.query.project;
    this.getlistContent();
    //this.$children[0].SelectPro = this.$route.query.SelectPro;
    //document.addEventListener('click', this.test)
  },
  //定义函数
  methods: {
    //关闭顶部项目弹窗
    closeProjectList() {
      this.$children[0].show_projectList = false;
    },
    //判断标题名称
    changtitel() {
      this.title = this.language[this.$route.query.title];
      //console.log(this.title);
    },
    //判断系统语言
    tellLan() {
      if (this.$store.state.languageType == '中文') {
        this.language = ChangeLanguage.ChinesesLa;
      } else if (this.$store.state.languageType == 'English') {
        this.language = ChangeLanguage.EnglishLa;
      }
      this.changtitel();
    },


    //获取列表内容
    getlistContent() {
      this.$indicator.open();
      let params = new URLSearchParams();
      params.append('projectid', this.$route.query.projectidAarry); //项目号
      //params.append('page', this.loadmore); //下拉次数
      params.append('string', this.searchTx); //搜索字段
      //params.append('number', this.loadingNum); //每页显示数 
      switch (this.$route.query.title) {
        case "approvalListTitle": //审批中
          params.append('type', "approved");
          break;
        case "rejectListTitle": //已驳回
          params.append('type', "rejected");
          break;
        case "endListTitle": //已终止
          params.append('type', "stopped");
          break;
        case "finishedListTitle": //已完成
          params.append('type', "completed");
          break;
      }

      //审批单列表  this.approvallistContent
      this.$store.dispatch('getAuditingByType', params).then((response) => {
        let res = response.data;
        if (response.statusText === 'OK' && response.status === 200) {
          if (res.status == "success") {
            //console.log(res.ret);
            this.approvallistContent = res.ret
            let arr = []
            for (var i = res.ret.length - 1; i >= 0; i--) {
              if (res.ret[i].processType == 'Urgeing') {
                arr.push(res.ret[i])
                this.approvallistContent.splice(i, 1);
              }
            }
            for (var i = arr.length - 1; i >= 0; i--) {
              this.approvallistContent.unshift(arr[i])
            }
            this.approvallistCount = res.ret.length
            if (this.approvallistCount == 0) {
              //console.log(this.approvallistContent)
              this.noneData = true
            }
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
    },
    //上拉加载
    loadBottom() { // 加载更多数据的操作
      //this.$toast((this.loadmore).toString());
      var self = this;
      setTimeout(function() {
        if (self.loadmore * self.loadingNum > self.approvallistCount) {
          self.allLoaded = true;
        }
        self.loadmore = ++self.loadmore;
        self.getlistContent();
        self.$refs.loadmore.onBottomLoaded();
      }, 1500);
    },

    //搜索栏函数
    search(e) {
      //alert(this.searchTx);
      this.approvallistContent = [];
      this.getlistContent();
    },

    //进入我的审批细节
    toMyapplicationDetail(ele, item) {
      ele.item = item;
      console.log(ele);
      if (ele.detailType == "DMN") {
        this.$router.push({ name: 'ApplicationDetailsDMN', query: ele });
      } else if (ele.detailType == "RFI") {
        this.$router.push({ name: 'ApplicationDetailsRFI', query: ele });
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
.noneData {
  text-align: center;
  margin-top: 100px
}

.noneData img {
  width: 50%;
}

.bottomLine {
  height: 44px;
  line-height: 44px;
  background: #FAFAFA;
  text-align: center;
  color: #C0CCDA;
  font-size: 12px
}

.backgroud {
  background-color: #FAFAFA
}

.selecte {
  border-top: 1px solid #E1E1E1;
}

.list {
  border: 1px solid #E1E1E1;
  padding: 10px 10px;
  background: #fff;
  border-top: none
}

.list_apply {
  margin-top: 5px;
}

.list_apply span {
  display: block;
  margin-top: 5px;
  word-break: normal;
  width: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
  font-size: 14px;
  color: #99A9BF;
  margin-top: 5px;
}

.button_type {
  padding: 2px 10px;
  text-align: center;
  width: auto;
  font-size: 14px;
  border-radius: 2px;
  height: 24px;
  line-height: 24px;
  word-break: break-word;
}

.approvaling {
  border: 1px solid #20A0FF;
  color: rgba(32, 160, 255, 1);
}

.passed {
  border: 1px solid #13CE66;
  color: #13CE66;
}

.backed {
  border: 1px solid #F7BA2A;
  color: #F7BA2A;
}

.stoped {
  border: 1px solid #FF4949;
  color: #FF4949;
}

.Urgeing {
  border: 1px solid #FF4949;
  color: #FF4949;
}

.applyNum {
  min-height: 24px;
  display: flex;
  justify-content: space-between;
  vertical-align: center;
}

.Nfds {
  display: flex;
  font-size: 16px;
  color: #475669
}

.Nfds:first-child {
  word-break: normal;
  width: 230px;
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
}

.page-navbar {
  margin: 10px
}

.is-selected {
  margin-bottom: 0px!important;
}

.group {
  background: rgba(250, 250, 250, 1);
}

#search {
  height: 50px;
  background-color: rgba(242, 242, 242, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

#search input[type="text"] {
  background: url('../assets/img/search.png') no-repeat 12px 11px #fff;
  background-size: 14px 14px;
  border: 0 none;
  font: normal 14px "microsoft yahei", Arial, sans-serif;
  color: #99A9BF;
  padding: 0 15px 0 35px;
  border-radius: 4px;
  width: 95%;
  height: 32px;
}

#search input[type="text"]:focus {}

.tabtitle {
  font-size: 14px
}

.tip {
  display: block;
  background: #f00;
  border-radius: 50%;
  width: 6px;
  height: 6px;
  top: 8px;
  left: 10px;
  position: absolute;
}

.span {
  position: relative;
}

.badge {
  position: relative;
  padding: 5px;
}

.badge i {
  display: block;
  background: #FF4949;
  border-radius: 8px;
  width: 20px;
  height: 16px;
  top: 4px;
  left: 3px;
  position: absolute;
  color: #FFFFFF;
  font-size: 10px;
  text-align: center;
  font-style: normal;
  line-height: 16px
}

</style>
