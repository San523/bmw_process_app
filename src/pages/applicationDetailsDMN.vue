<!-- 我的DMN申请详情页面 -->
<template>
  <div class="">
    <Layout style='text-align: center;' :has_return="true" :bottom_nav="bottom_nav" :title="language.applicationDetails" :has_footer="false">
      <!-- <h1>我的申请详情页面</h1> -->
    </Layout>
    <div class="group">
      <mt-loadmore :top-method="loadTop" :max-distance="150" ref="loadmore">
        <div ref="loadmorediv">
          <div class='list' ref='list'>
            <div class="applyNum">
              <div class="Nfds">
                <span>{{parentMsg.applyNum}}</span>
              </div>
              <div class="button_type" :class="parentMsg.processType">
                <span v-show="parentMsg.processType=='approvaling'">{{this.language.approvaling}}</span>
                <span v-show="parentMsg.processType=='stoped'">{{this.language.stoped}}</span>
                <span v-show="parentMsg.processType=='passed'">{{this.language.passed}}</span>
                <span v-show="parentMsg.processType=='backed'">{{this.language.backed}}</span>
                <span v-show="parentMsg.processType=='Urgeing'">{{this.language.Urgeing}}</span>
              </div>
            </div>
            <div class="list_apply">
              <div>
                <span>{{this.language.applocant}}：</span>
                <span class="right">{{this.detailMsg.ApplocantName}}</span>
              </div>
              <div>
                <span>{{this.language.Changecontenttheme}}：</span>
                <span class="right">{{this.detailMsg.Form.Subject}}</span>
              </div>
              <div>
                <span>{{this.language.Fileapplied}}：</span>
                <span class="right">{{detailMsg.Form.CausedFileType}}</span>
              </div>
              <div>
                <span>{{this.language.Changenumber}}：</span>
                <span class="right">{{detailMsg.Form.CausedFileNum}}</span>
              </div>
              <div>
                <span>{{this.language.Changemajor}}：</span>
                <span class="right">{{detailMsg.Form.Discipline}}</span>
              </div>
              <div>
                <span>{{this.language.ChangeReason}}：</span>
                <span class="right">{{detailMsg.Form.DetailReason}}</span>
              </div>
            </div>
          </div>
          <div class="msg2" ref='msg2'>
            <div>
              <span>{{this.language.Engineeringname}}：</span>
              <span class="right">{{detailMsg.Form.ProjectName}}</span>
            </div>
            <div>
              <span>{{this.language.BuildingName}}：</span>
              <span class="right">{{detailMsg.Form.Building}}</span>
            </div>
            <div>
              <span>{{this.language.Regionalname}}：</span>
              <span class="right">{{detailMsg.Form.Area}}</span>
            </div>
          </div>
          <div v-if="detailMsg.Form.Files.length!=0" ref='file'>
            <aside class="tab">
              <input id="tab-thress" type="checkbox" name="tabs" />
              <label for="tab-thress">
                <span>{{this.language.file}}</span>
                <span style="float: right;margin-right: 35px">{{detailMsg.Form.Files.length}}</span>
              </label>
              <div class="tab-content" v-for="item in detailMsg.Form.Files">
                <span class="contentTit">{{language.Originaldrawingnum}}：</span>
                <p>{{item.OriginalDrawingNumber}}</p>
                <span class="contentTit">{{language.Originaldesigncontent}}：</span>
                <p v-show="languageType=='中文'">{{item.OriginalDrawingContent_cn}}</p>
                <p v-show="languageType=='English'">{{item.OriginalDrawingContent_en}}</p>
                <span class="contentTit">{{language.Changecontent}}：</span>
                <p>{{item.AlteredDrawingContent}}</p>
                <span class="contentTit">{{language.remarks}}：</span>
                <p>{{item.DrawingRemarks}}</p>
              </div>
            </aside>
          </div>
          <div class="msg3" ref='msg3'>
            <span>{{this.language.Approvalprocess}}</span>
            <div class="hovertree-tracklist">
              <ul>
                <li v-for="(item,index) in HistoryArg" :style="index==HistoryArg.length-1?'height:0':''">
                  <i class="node-icon" :class="item.Status"></i>
                  <span :class="index==HistoryArg.length-1?'timelast':'time'">{{item.Handler}}·{{item.HistoryName}}</span>
                  <span class="txt">{{item.Time}}</span>
                  <div v-if="index!=HistoryArg.length-1" class="borderleft" :style="item.Status=='completed'?'border-left: 2px solid #0696D8;':''">
                    <span>{{item.Remarks}}</span>
                  </div>
                </li>
                <!--    <li>
                <i class="node-icon completed"></i>
                <span class="time">申请人·吴迪·提交申请</span>
                <span class="txt">2018-05-16 13:21:10</span>
                <div class="borderleft"></div>
              </li>
              <li style="height:0 ">
                <i class="node-icon"></i>
                <span class="timelast">业主·贾工</span>
              </li> -->
                <br>
              </ul>
            </div>
          </div>
          <!--占位符 -->
          <div v-show="footerDMN" style="height: 60px"></div>
          <!--占位符 -->
        </div>
      </mt-loadmore>
      <div class="footerDMN" ref='footerDMN' v-show="footerDMN">
        <div class="opinion">
          <span>{{this.language.Approvalopinion}}</span>
        </div>
        <div class="opinionContent" v-if="opinionContent">
          <div @click="toExamineRemark('pass')">
            <img src="@/assets/img/icon/Bottombar.png">
            <span style="color: #20A0FF">{{this.language.pass}}</span>
          </div>
          <div @click="toTransferring">
            <img src="@/assets/img/icon/Transferring.png">
            <span>{{this.language.transfer}}</span>
          </div>
          <div @click="toExamineRemark('reject')">
            <img src="@/assets/img/icon/undo.png">
            <span>{{this.language.reject}}</span>
          </div>
          <div @click="toExamineRemark('stop')">
            <img src="@/assets/img/icon/block.png">
            <span>{{this.language.termination}}</span>
          </div>
        </div>
        <div class="opinionContent2" v-if="opinionContent2">
          <div @click="toExamineEnsure">
            <img src="@/assets/img/icon/check.png">
            <span>{{language.Examination}}</span>
          </div>
          <div @click="toTransferring">
            <img src="@/assets/img/icon/Transferring.png">
            <span>{{this.language.transfer}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import ApiCloud from '@/assets/js/api.min.js'; //导入apicloud的JS代码
import ChangeLanguage from '../language/changeLanguage.js'; //引用模块进来
import "@/assets/css/public.css";
import Layout from '@/components/Layout';
export default {
  //该页面的控制数据
  data() {
    return {
      language: '', //系统选择语言
      bottom_nav: '', //底部栏信息
      title: '申请详情', //页面标题
      parentMsg: this.$route.query, //父页面传过来的信息
      groupHeight: 0, //中间页面内容长度
      footerDMN: false,
      opinionContent: false,
      opinionContent2: false,
      languageType: "", //系统语言类型
      detailMsg: { //获取单号详细信息
        Time: "",
        Applocant: "",
        Form: {
          Subject: "",
          CausedFileType: "",
          CausedFileNum: "",
          Discipline: "",
          DetailReason: "",
          Reason: "",
          ProjectName: "",
          Building: "",
          Area: "",
          Files: [{
            OriginalDrawingNumber: '',
            OriginalDrawingNumber: "",
          }],
        },
        History: [],
      },
      HistoryArg: [
        // { //流程信息
        //   HistoryName: "提交申请", //状态名称     
        //   HistoryType: "application_submit", //状态值
        //   Time: "2018-06-11 16:39:27", //状态时间
        //   Remarks: "", //备注
        //   Handler: "吴迪", //操作人
        //   Status: "completed", //操作状态  processing nostart
        // }
      ],
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
    //this.groupHeight = window.screen.height-60
    this.tellLan();
    this.getAuditingById();
  },
  //进入页面执行的函数å
  mounted() {

    // let screenHeight = document.body.clientHeight - 60
    // if (this.$refs.loadmorediv.offsetHeight <= screenHeight) {
    //   this.$refs.loadmorediv.style.height = screenHeight + "px"
    // }

    //console.log(this.$refs.loadmorediv.offsetHeight + "||" + (document.body.offsetHeight -60))

  },
  //定义函数
  methods: {
    //引用js文件里的函数
    _goback() {
      goback();
    },

    //判断系统语言
    tellLan() {
      this.languageType = this.$store.state.languageType;
      if (this.$store.state.languageType == '中文') {
        this.language = ChangeLanguage.ChinesesLa;
      } else if (this.$store.state.languageType == 'English') {
        this.language = ChangeLanguage.EnglishLa;
      }
      this.bottom_nav = this.language.bottom_nav_processReport;
    },

    //跳转审批页面（全）
    toExamineEnsure() {
      let array = [];
      array.push({
        parentMsg: this.parentMsg,
        UserRole: this.detailMsg.UserRole
      })
      this.$router.push({ name: 'ExamineEnsure', query: array });
    },
    //跳转审批页面（只有备注）
    toExamineRemark(v) {
      let array = [];
      array.push({
        audit: v,
        id: this.parentMsg.id,
        item: this.parentMsg.item,
        UserRole: this.detailMsg.UserRole
      })
      this.$router.push({ name: 'ExamineRemark', query: array });
    },

    //跳转转审页面
    toTransferring() {
      this.parentMsg.ProjectID = this.detailMsg.ProjectID
      this.$router.push({ name: 'Transferring', query: this.parentMsg });
    },

    //判断底部栏如何显示
    ifshowfooterDMN() {
      if (this.parentMsg.item == "selecte2") {
        this.footerDMN = true;
        this.detailMsg.UserRole
        //localStorage.getItem("username") == "san"
        if (this.detailMsg.UserRole == "审批人") {
          //无身份
          this.opinionContent = true;
          this.opinionContent2 = false;
        } else if (this.detailMsg.UserRole != "审批人") {
          //有身份
          this.opinionContent = false;
          this.opinionContent2 = true;
        }
      }
    },

    //下拉刷新
    loadTop() { // 刷新数据的操作
      var self = this;
      setTimeout(function() {
        self.getAuditingById();
        self.ifshowfooterDMN();
        self.$refs.loadmore.onTopLoaded(); //
      }, 1500);
    },

    //根据编号获取详细信息
    getAuditingById() {
      this.$indicator.open();
      let params = new URLSearchParams();
      params.append('id', this.parentMsg.id);
      params.append('type', this.parentMsg.type);
      params.append('userid', localStorage.getItem("userid"));
      this.$store.dispatch('getAuditingById', params).then((response) => {
        let res = response.data;
        if (response.statusText === 'OK' && response.status === 200) {
          if (res.status == "success") {
            //console.log(res.ret);
            this.detailMsg = res.ret;
            this.HistoryArg = this.detailMsg.History
            this.$indicator.close();
            this.ifshowfooterDMN();
            for (var i = 0; i < this.detailMsg.History.length; i++) {
              //console.log(this.detailMsg.History[i].HistoryName);
            }
          } else {
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

  },
  //增加控件
  components: {
    Layout
  }
}

</script>
<style scoped lang="css">
.group {
  background-color: #FAFAFA
}

.opinion {
  border-bottom: 1px solid #E0E6ED;
  width: 100%;
}

.opinion span {
  color: #99A9BF;
  font-size: 12px;
  padding: 5px 10px;
}


.opinionContent {
  display: flex;
  height: 100%;
}

.opinionContent div {
  width: 34%;
  border-right: 1px solid #E0E6ED;
  text-align: center;
  height: 50px;
}

.opinionContent div img {
  width: 22px;
  height: 22px;
  vertical-align: middle;
}

.opinionContent div span {
  height: 22px;
  vertical-align: middle;
  line-height: 50px;
  margin-left: 5px;
  color: #8492A6;
}

.opinionContent2 {
  display: flex;
  text-align: center;
  vertical-align: center
}

.opinionContent2 div {
  width: 50%;
  border-right: 1px solid #E0E6ED;
  text-align: center;
  height: 50px;
}

.opinionContent2 div img {
  width: 22px;
  height: 22px;
  vertical-align: middle;
}

.opinionContent2 div span {
  height: 22px;
  vertical-align: middle;
  line-height: 50px;
  margin-left: 5px;
  color: #20A0FF;
}



.footerDMN {
  z-index: 999;
  position: fixed;
  bottom: 0;
  width: 100%;
  justify-content: center;
  background: #fff;
  height: 73px;
  border-top: 1px solid #E0E6ED;
}

.hovertree-tracklist ul {
  padding-top: 0;
  margin-top: 5px;
}

.hovertree-tracklist ul li {
  list-style: none;
  color: #5E6D82;
  font-size: 14px;
}

.hovertree-tracklist li {
  position: relative;
  padding: 9px 0 0 25px;
  line-height: 9px;
  /*border-left: 2px solid #0696D8;*/
  color: #999;
  height: 64px;
  margin-left: -30px;
}


.hovertree-tracklist li:last-child {
  color: #5E6D82;
  font-size: 14px;
  padding-top: 0;
  margin-top: 0;
  height: 20px;
  border-left-color: #fff;
}

.hovertree-tracklist li .node-icon {
  position: absolute;
  left: -9px;
  width: 16px;
  height: 16px;
  /*background: url(http://hovertree.com/texiao/css/25/img/order-icons.png) -21px -72px no-repeat;*/
  content: url("../assets/img/icon/radio_selectcopy3.png")
}

.hovertree-tracklist li .completed {
  content: url(../assets/img/icon/radio_selectcopy.png)
}

.hovertree-tracklist li .processing {
  content: url(../assets/img/icon/radio_selectcopy2.png)
}

.hovertree-tracklist li .time {
  margin-right: 20px;
  position: relative;
  top: 4px;
  display: inline-block;
  vertical-align: middle;
  color: #5E6D82;
  font-size: 14px;
}

.hovertree-tracklist li .timelast {
  margin-right: 20px;
  position: relative;
  top: 4px;
  vertical-align: middle;
  color: #5E6D82;
  font-size: 14px;
}



.hovertree-tracklist li .txt {
  max-width: 600px;
  position: relative;
  top: 4px;
  display: inline-block;
  vertical-align: middle;
  float: right;
  font-size: 12px;
  color: #99A9BF
}

.hovertreeinfo {
  margin-top: 64px;
}

.hovertreeinfo a {
  color: blue;
}

.borderleft {
  width: 100%;
  height: 60%;
  margin-top: 12px;
  margin-left: -27px;
  border-left: 2px solid #D3DCE6;
  padding: 5px 0;
}

.borderleft span {
  font-size: 12px;
  margin-left: 25px;
  color: rgba(153, 169, 191, 1);
}



.list {
  padding: 10px 10px;
  background: #fff;
  border-bottom: 1px solid #E0E6ED;
}

.list_apply {
  padding: 10px 0;
}

.msg2 {
  margin-top: 10px;
  border-bottom: 1px solid #E0E6ED;
  background: #fff;
}

.msg3 {
  margin-top: 10px;
  border: 1px solid #E0E6ED;
  background: #fff;
  padding: 10px 10px 0 10px;
  font-size: 16px;
  color: #8492A6;
  border-bottom: 3px solid #E0E6ED;
}

.msg2 div {
  border-top: 1px solid #E0E6ED;
  padding: 10px 10px;
  font-size: 16px;
  color: #8492A6
}


.tab {
  position: relative;
  margin-bottom: 1px;
  width: 100%;
  overflow: hidden;
}

input {
  position: absolute;
  opacity: 0;
  z-index: -1;
}

label {
  position: relative;
  display: block;
  padding: 0 0 0 10px;
  font-size: 16px;
  background: #fff;
  color: #8492A6;
  line-height: 3;
  cursor: pointer;
  border-bottom: 1px solid #E0E6ED;
}

.tab-content {
  display: none;
}

.tab-content span {
  margin: 10px;
  color: #8492A6
}

.tab-content p {
  margin: 5px 10px;
}

input:checked~.tab-content {
  display: block;
  background: #FFFFFF;
  font-size: 14px;
  color: #475669;
  padding: 10px 0;
  border-bottom: 1px solid #E0E6ED
}

label::after {
  position: absolute;
  right: 0;
  top: 0;
  display: block;
  width: 3em;
  height: 3em;
  line-height: 3em;
  text-align: center;
  -webkit-transition: all .35s;
  transition: all .35s;
}

label:after {
  /*content: "\25BC";*/
  content: url('../assets/img/arrow_icon2.svg')
}

input[type=checkbox]:checked+label:after {
  -webkit-transform: rotate(180deg);
  transform: rotateX(180deg);
}

.list_apply div {
  margin-top: 5px;
  font-size: 16px;
  color: #8492A6
}

.right {
  float: right;
  font-size: 16px;
  color: #475669;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  width: 180px;
  text-align: right;
}


.applyNum {
  min-height: 24px;
  display: flex;
  justify-content: space-between;
  vertical-align: center;
}

.Nfds {
  display: flex;
  font-size: 18px;
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

</style>
