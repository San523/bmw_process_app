<template>
  <div>
    <Layout style='text-align: center;' :has_return="false" :title="language.title_processManage" footer_active="processManage" :bottom_nav="bottom_nav">
    </Layout>
    <div class="group">
      <!-- :style="'height:'+groupHeight+'px'" -->
      <mt-loadmore :top-method="loadTop" ref="loadmoretop" @top-status-change="handleTopChange">
        <div v-if="searchShow" id="search" ref='search' class="search">
          <input type="text" v-model="searchTx" :placeholder="language.search_placeholder" @keyup.enter="search">
        </div>
        <!-- navbar -->
        <div :class="navBarFixed == true ? 'fixnavbar' :''">
          <mt-navbar id="searchBar" class="page-part" ref="page-part" v-model="selected" @click.native='setGroupHeight'>
            <mt-tab-item id="1"><span class="tabtitle">{{this.language.tabtitle1}}</span>
              <span v-show="myapplyNoread!=0" class="tabtitle">({{(myapplyNoread>99)?'99+':myapplyNoread}})</span>
              <!-- <span v-show="myapplyNoread!=0" class="badge"><i>{{myapplyNoread}}</i></span> -->
            </mt-tab-item>
            <mt-tab-item id="2">
              <span class="tabtitle">{{this.language.tabtitle2}}</span>
              <span v-show="waitexamNoread!=0" class="tabtitle">({{(waitexamNoread>99)?'99+':waitexamNoread}})</span>
            </mt-tab-item>
            <mt-tab-item id="3">
              <span class="tabtitle">{{this.language.tabtitle3}}</span>
              <span v-show="ApprovedNoread!=0" class="tabtitle">({{(ApprovedNoread>99)?'99+':ApprovedNoread}})</span>
            </mt-tab-item>
            <mt-tab-item id="4">
              <span class="tabtitle">{{this.language.tabtitle4}}</span>
              <span v-show="copyNoread!=0" class="tabtitle">({{(copyNoread>99)?'99+':copyNoread}})</span>
            </mt-tab-item>
          </mt-navbar>
        </div>
        <!-- tabcontainer -->
        <div :class="navBarFixed == true ? 'margin' :''">
          <!-- <mt-loadmore :bottom-method="loadBottom" :max-distance="150" ref="loadmore" :bottom-all-loaded="allLoaded"> -->
          <mt-tab-container swipeable='swipeable' v-model="selected">
            <!-- 我申请列表 -->
            <mt-tab-container-item class="selecte" id="1">
              <div ref='selecte1'>
                <!-- <mt-loadmore :bottom-method="loadBottom2" :max-distance="150" ref="loadmore"> -->
                <div class='list' v-for="ele in myapplicationContent" @click="toMyapplicationDetail(ele,'selecte1')">
                  <div class="applyNum">
                    <div class="Nfds">
                      <span>{{ele.applyNum}}</span>
                      <span v-if="!ele.isRead" class="span"><i class="tip"></i></span>
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
                <!-- </mt-loadmore> -->
                <!-- <div style="height: 55px"></div> -->
              </div>
            </mt-tab-container-item>
            <!-- 我申请列表 -->
            <!-- 待审批列表 -->
            <mt-tab-container-item class="selecte" id="2">
              <div ref='selecte2'>
                <!-- <mt-loadmore :bottom-method="loadBottom2" :max-distance="150"> -->
                <div class='list' v-for="ele in waitmeToexamContent" @click="toMyapplicationDetail(ele,'selecte2')">
                  <div class="applyNum">
                    <div class="Nfds">
                      <span>{{ele.applyNum}}</span>
                      <span v-if="!ele.isRead" class="span"><i class="tip"></i></span>
                    </div>
                    <div class="button_type" :class="ele.Type">
                      <span v-show="ele.Type=='approvaling'">{{language.approvaling}}</span>
                      <span v-show="ele.Type=='stoped'">{{language.stoped}}</span>
                      <span v-show="ele.Type=='passed'">{{language.passed}}</span>
                      <span v-show="ele.Type=='backed'">{{language.backed}}</span>
                      <span v-show="ele.Type=='Urgeing'">{{language.Urgeing}}</span>
                    </div>
                  </div>
                  <div class="list_apply">
                    <span>{{language.project}}：{{ele.project}}</span>
                    <span>{{language.applocant}}：{{ele.applocant}}</span>
                    <span>{{language.application_time}}：{{ele.time}}</span>
                  </div>
                </div>
                <!--  </mt-loadmore> -->
                <!--占位符 -->
                <!--  <div style="height: 55px"></div> -->
              </div>
            </mt-tab-container-item>
            <!-- 待审批列表 -->
            <!-- 已审批列表 -->
            <mt-tab-container-item class="selecte" id="3">
              <div ref='selecte3'>
                <!-- <mt-loadmore :bottom-method="loadBottom3" :max-distance="150"> -->
                <div class='list' v-for="ele in ApprovedNoreadContent" @click="toMyapplicationDetail(ele,'selecte3')">
                  <div class="applyNum">
                    <div class="Nfds">
                      <span>{{ele.applyNum}}</span>
                      <span v-if="!ele.isRead" class="span"><i class="tip"></i></span>
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
                <!-- </mt-loadmore> -->
                <!--占位符 -->
                <!--  <div style="height: 55px"></div> -->
              </div>
            </mt-tab-container-item>
            <!-- 已审批列表 -->
            <!-- 抄送我列表 -->
            <mt-tab-container-item class="selecte" id="4">
              <div ref='selecte4'>
                <!-- <mt-loadmore :bottom-method="loadBottom3" :max-distance="150"> -->
                <div class='list' v-for="ele in CopyAuditingContent" @click="toMyapplicationDetail(ele,'selecte4')">
                  <div class="applyNum">
                    <div class="Nfds">
                      <span>{{ele.applyNum}}</span>
                      <span v-if="!ele.isRead" class="span"><i class="tip"></i></span>
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
                <!-- </mt-loadmore> -->
                <!--占位符 -->
                <!-- <div style="height: 55px"></div> -->
              </div>
            </mt-tab-container-item>
            <!-- 抄送我列表 -->
          </mt-tab-container>
          <div v-if="noneData" class="noneData">
            <img src="@/assets/img/noneData.png">
          </div>
          <div class="bottomLine" v-if="allLoaded">-----我是有底线的-----</div>
          <!--  </mt-loadmore> -->
        </div>
        <div style="height: 55px"></div>
      </mt-loadmore>
    </div>
  </div>
</template>
<script type="text/javascript">
import ApiCloud from '@/assets/js/api.min.js' //导入apicloud的JS代码
import ChangeLanguage from '../language/changeLanguage.js' //引用模块进来
import "@/assets/css/public.css";
import Layout from '@/components/Layout';

export default {
  name: 'page-navbar',
  //该页面的控制数据
  data() {
    return {
      language: ChangeLanguage.ChinesesLa, //系统选择语言
      bottom_nav: '', //底部栏信息
      selected: this.$store.state.processManageSelect, //当前选择项
      groupHeight: 0, //每个选择页面长度
      swipeable: false, //是否滚动
      searchTx: "", //搜索框内容
      allLoaded: false, //是否加载完
      navBarFixed: false, //navbar是否固定
      searchShow: true, //搜索栏是否显示
      noneData: false, //是否无数据
      total: 0, //未读总数
      /*列表未读数 */
      myapplyNoread: 0, //我的申请未读数
      waitexamNoread: 0, //待审批
      ApprovedNoread: 0, //已审批
      copyNoread: 0, //抄送我的未读数
      /*列表上拉加载次数*/
      myapplyNum: 1, //我申请
      waitexamNum: 1, //待审批
      ApprovedNum: 1, //已审批
      copyNum: 1, //抄送我
      /*列表总数量*/
      myapplyTotal: 0, //我申请
      waitexamTotal: 0, //待审批
      ApprovedTotal: 0, //已审批
      copyTotal: 0, //抄送我
      /*每页显示数*/
      loadingNum: this.$store.state.loadingNum,
      /*我的申请列表循环 */
      myapplicationContent: [
        // {
        //     applyNum: "001-DMN-HV-060001-DMN-HV-060001-DMN-HV-060001-DMN-HV-060", //申请单号
        //     project: "BMW 19.89", //所属项目
        //     applocant: "Windy", //申请人
        //     time: "2018-05-20", //申请日期
        //     processType: "approvaling", //所属状态
        //     isRead: false, //是否已读
        //     detailType: "DMN", //跳转详情类型
        //     id: "5b1e353ff15969078c7a859e"
        //   },
      ],
      /*催办内容*/
      waitmeToexamUrgeContent: [{
        applyNum: "001-DMN-HV-060001-DMN-HV-060001-DMN-HV-060001-DMN-HV-060", //申请单号
        project: "BMW 19.89", //所属项目
        applocant: "Windy", //申请人
        time: "2018-05-20", //申请日期
        processType: "Urgeing", //所属状态
        isRead: false, //是否已读
        detailType: "DMN", //跳转详情类型
        id: "5b1e353ff15969078c7a859e"
      }, ],
      /*待我审批列表循环 */
      waitmeToexamContent: [
        //{
        //     applyNum: "001-DMN-HV-060001-DMN-HV-060001-DMN-HV-060001-DMN-HV-060", //申请单号
        //     project: "BMW 19.89", //所属项目
        //     applocant: "Windy", //申请人
        //     time: "2018-05-20", //申请日期
        //     processType: "Urgeing", //所属状态
        //     isRead: false, //是否已读
        //     detailType: "DMN", //跳转详情类型
        //     id: "5b1e353ff15969078c7a859e"
        //   },

      ],

      /*已审批列表循环 */
      ApprovedNoreadContent: [],
      /*抄送我的列表循环 */
      CopyAuditingContent: [],
    };
  },
  //父控件传过来的参数
  props: {

  },
  //监听函数
  watch: {
    selected: function(val, oldval) {
      this.ifallLoaded();
    },

    total: function(val, oldval) {
      //this.countisRead();
    },
  },
  created() {
    this.tellLan();
    window.addEventListener('scroll', this.handleScroll);
  },
  //进入页面执行的函数
  mounted() {
    //this.setGroupHeight();

    this.getOwnerAuditing();
    this.getNeedAuditing();
    this.getApprovedAuditing();
    this.getCopyAuditing();
    //this.ifallLoaded();
    this.getAllUnreadMessages();
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },


  //定义函数
  methods: {

    handleScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      //console.log(scrollTop)
      var offsetTop = document.querySelector('.page-part').offsetTop; //.offsetTop
      //alert(offsetTop)
      if (scrollTop > 60) {
        // this.navBarFixed = true;
        // this.searchShow = false
      } else {
        //console.log(scrollTop)
        // this.navBarFixed = false
        // this.searchShow = true
      }
    },


    //计算显示高度
    setGroupHeight() {
      setTimeout(() => {
        let ref = 'selecte' + this.selected;
        let qq = this.$refs[ref].offsetHeight; //clientWidth
        this.groupHeight = qq + 165;
        //console.log(qq);
      }, 100)

    },

    //获取审批管理所有未读数
    getAllUnreadMessages() {
      let params = new URLSearchParams();
      params.append('userid', localStorage.getItem("userid"));
      this.$store.dispatch('getAllUnreadMessages', params).then((response) => {
        let res = response.data;
        if (response.statusText === 'OK' && response.status === 200) {
          if (res.status == "success") {
            this.$children[0].processManageNoread = (res.ret.unread > 99) ? '99+' : res.ret.unread;
            this.$store.commit('updateprocessManageNoread', res.ret.unread);
          } else {
            this.$toast("后台错误");
          }
        } else {
          this.$toast("网络错误");
        }
      }).catch((err) => {
        this.$toast("网络连接错误");
      });
    },



    //判断语言
    tellLan() {
      if (this.$store.state.languageType == '中文') {
        this.language = ChangeLanguage.ChinesesLa;
      } else if (this.$store.state.languageType == 'English') {
        this.language = ChangeLanguage.EnglishLa;
      }
      this.bottom_nav = this.language.bottom_nav_processManage;
    },

    //获取我的申请信息
    getOwnerAuditing() {
      this.$indicator.open();
      let params = new URLSearchParams();
      params.append('userid', localStorage.getItem("userid"));
      params.append('string', this.searchTx); //搜索字段
      //params.append('page', this.myapplyNum); //当前下拉数
      //params.append('number', this.loadingNum); //每页显示数
      this.$store.dispatch('getOwnerAuditing', params).then((response) => {
        let res = response.data;
        if (response.statusText === 'OK' && response.status === 200) {
          if (res.status == "success") {
            this.myapplicationContent = res.ret;
           this.myapplyTotal = res.ret.length
            let arr = []
            for (var i = res.ret.length - 1; i >= 0; i--) {
              if (res.ret[i].processType == 'Urgeing') {
                arr.push(res.ret[i])
                this.myapplicationContent.splice(i, 1);
              }
            }
            for (var i = arr.length - 1; i >= 0; i--) {
              this.myapplicationContent.unshift(arr[i])
            }
            this.$indicator.close();
            this.myapplyNoread = res.unread;
            this.total += this.myapplyNoread
            //this.ifallLoaded();

            if (this.myapplyTotal == 0) {
              this.noneData = true;
            } else {
              this.noneData = false;
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

    //获取待审批信息
    getNeedAuditing() {
      this.$indicator.open();
      let params = new URLSearchParams();
      params.append('userid', localStorage.getItem("userid"));
      params.append('string', this.searchTx); //搜索字段
      //params.append('page', this.waitexamNum); //当前下拉数
      //params.append('number', this.loadingNum); //每页显示数
      this.$store.dispatch('getNeedAuditing', params).then((response) => {
        let res = response.data;
        if (response.statusText === 'OK' && response.status === 200) {
          if (res.status == "success") {
            //console.log(res.ret);
            // for (var i in res.ret) {
            //   this.waitmeToexamContent.push(res.ret[i]);
            // }
            this.waitmeToexamContent = res.ret;
            this.waitexamTotal = res.ret.length
            let arr = []
            for (var i = res.ret.length - 1; i >= 0; i--) {
              if (res.ret[i].processType == 'Urgeing') {
                arr.push(res.ret[i])
                this.waitmeToexamContent.splice(i, 1);
              }
            }
            for (var i = arr.length - 1; i >= 0; i--) {
              this.waitmeToexamContent.unshift(arr[i])
            }
            this.$indicator.close();

            this.waitexamNoread = this.waitexamTotal;
            for (var i = this.waitmeToexamContent.length - 1; i >= 0; i--) {
              if (this.waitmeToexamContent[i].processType == "approvaling") {
                this.waitmeToexamContent[i].Type = ""
              } else {
                this.waitmeToexamContent[i].Type = this.waitmeToexamContent[i].processType
              }

            }

            this.total += this.waitexamNoread
            //this.ifallLoaded();
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

    //获取已审批信息
    getApprovedAuditing() {
      this.$indicator.open();
      let params = new URLSearchParams();
      params.append('userid', localStorage.getItem("userid"));
      params.append('string', this.searchTx); //搜索字段
      //params.append('page', this.ApprovedNum); //当前下拉数
      //params.append('number', this.loadingNum); //每页显示数
      this.$store.dispatch('getApprovedAuditing', params).then((response) => {
        let res = response.data;
        if (response.statusText === 'OK' && response.status === 200) {
          if (res.status == "success") {
            //console.log(res.ret);
            this.ApprovedNoreadContent = res.ret;
           this.ApprovedTotal = res.ret.length
            let arr = []
            for (var i = res.ret.length - 1; i >= 0; i--) {
              if (res.ret[i].processType == 'Urgeing') {
                arr.push(res.ret[i])
                this.ApprovedNoreadContent.splice(i, 1);

              }
            }
            for (var i = arr.length - 1; i >= 0; i--) {
              this.ApprovedNoreadContent.unshift(arr[i])
            }
            this.$indicator.close();
            //this.ifallLoaded();
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

    //获取抄送我的信息
    getCopyAuditing() {
      this.$indicator.open();
      let params = new URLSearchParams();
      params.append('userid', localStorage.getItem("userid"));
      params.append('string', this.searchTx); //搜索字段
      // params.append('page', this.copyNum); //当前下拉数
      //params.append('number', this.loadingNum); //每页显示数
      this.$store.dispatch('getCopyAuditing', params).then((response) => {
        let res = response.data;
        if (response.statusText === 'OK' && response.status === 200) {
          if (res.status == "success") {
            this.CopyAuditingContent = res.ret;
            this.copyTotal= res.ret.length
            let arr = []
            for (var i = res.ret.length - 1; i >= 0; i--) {
              if (res.ret[i].processType == 'Urgeing') {
                arr.push(res.ret[i])
                this.CopyAuditingContent.splice(i, 1);

              }
            }
            for (var i = arr.length - 1; i >= 0; i--) {
              this.CopyAuditingContent.unshift(arr[i])
            }
            this.$indicator.close();
            this.copyNoread = res.unread;
            //console.log(this.copyNoread)
            this.total += this.copyNoread
            //this.ifallLoaded();
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

    //进入我的审批细节
    toMyapplicationDetail(ele, item) {
      ele.item = item;
      //console.log(ele);
      if (ele.detailType == "DMN") {
        this.$router.push({ name: 'ApplicationDetailsDMN', query: ele });
      } else if (ele.detailType == "RFI") {
        this.$router.push({ name: 'ApplicationDetailsRFI', query: ele });
      }
    },

    //计算未读数量
    countisRead() {
      //total = this.myapplyNoread + this.waitexamNoread + this.copyNoread;
      //console.log(this.myapplyNoread+"/"+this.waitexamNoread+"/"+this.copyNoread);
      this.$children[0].processManageNoread = (this.total > 99) ? '99+' : this.total;
      this.$store.commit('updateprocessManageNoread', this.total);
    },


    //几个列表函数重新加载
    reloadList() {
      this.myapplyNoread = 0
      this.waitexamNoread = 0
      this.ApprovedNoread = 0
      this.copyNoread = 0
      this.myapplyNum = 1 //我申请
      this.waitexamNum = 1 //待审批
      this.ApprovedNum = 1 //已审批
      this.copyNum = 1 //抄送我
      this.total = 0
      this.myapplicationContent = []
      this.waitmeToexamContent = []
      this.ApprovedNoreadContent = []
      this.CopyAuditingContent = []
      this.getOwnerAuditing();
      this.getNeedAuditing();
      this.getApprovedAuditing();
      this.getCopyAuditing();
    },
    search(e) {
      // alert(this.searchTx);
      this.reloadList();
    },

    //触碰下拉加载
    handleTopChange(status) {
      //console.log(status);
      // this.navBarFixed = false
      // this.searchShow = true
    },
    //下拉刷新
    loadTop() { // 刷新数据的操作
      var self = this;
      setTimeout(function() {
        self.reloadList();
        self.$refs.loadmoretop.onTopLoaded(); // 固定方法，查询完要调用一次，用于重新定位 
        //location.reload();
      }, 1500);
    },
    //上拉加载
    loadBottom() { // 加载更多数据的操作
      var self = this;
      setTimeout(function() {
        //self.$toast((self.selected).toString());
        switch ((self.selected).toString()) {
          case "1":
            //我申请
            //self.$toast((self.loadingNum*self.myapplyNum).toString());
            if (self.loadingNum * self.myapplyNum >= self.myapplyTotal) {
              // self.$toast((self.myapplyNum).toString());
              self.allLoaded = true;
            } else {
              self.allLoaded = false;
            }
            self.myapplyNum = ++self.myapplyNum;
            self.getOwnerAuditing();
            self.$refs.loadmore.onBottomLoaded();
            break;
          case "2":
            //待审批
            if (self.loadingNum * self.waitexamNum >= self.waitexamTotal) {
              // self.$toast((self.myapplyNum).toString());
              self.allLoaded = true;
            } else {
              self.allLoaded = false;
            }
            self.waitexamNum = ++self.waitexamNum;
            self.getNeedAuditing();
            self.$refs.loadmore.onBottomLoaded();
            break;
          case "3":
            //已审批
            if (self.loadingNum * self.ApprovedNum >= self.ApprovedTotal) {
              // self.$toast((self.myapplyNum).toString());
              self.allLoaded = true;
            } else {
              self.allLoaded = false;
            }
            self.ApprovedNum = ++self.ApprovedNum;
            self.getApprovedAuditing();
            self.$refs.loadmore.onBottomLoaded();
            break;
          case "4":
            //抄送我
            if (self.loadingNum * self.copyNum >= self.copyTotal) {
              // self.$toast((self.myapplyNum).toString());
              self.allLoaded = true;
            } else {
              self.allLoaded = false;
            }
            self.copyNum = ++self.copyNum;
            self.getCopyAuditing();
            self.$refs.loadmore.onBottomLoaded();
            break;
        }

      }, 1500);
    },

    //判断不同列表是否加载完成
    ifallLoaded() {
      switch ((this.selected).toString()) {
        case "1":
          //我申请
          if (this.loadingNum * this.myapplyNum >= this.myapplyTotal) {
            //this.$toast((this.loadingNum * this.myapplyNum).toString());
            //this.allLoaded = true;
          } else {
            this.allLoaded = false;
          }
          if (this.myapplyTotal == 0) {
            this.noneData = true;
          } else {
            this.noneData = false;
          }
          break;
        case "2":
          //待审批
          if (this.loadingNum * this.waitexamNum >= this.waitexamTotal) {
            //this.$toast((this.loadingNum * this.waitexamNum).toString());
            //this.allLoaded = true;
          } else {
            this.allLoaded = false;
          }
          if (this.waitexamTotal == 0) {
            this.noneData = true;
          } else {
            this.noneData = false;
          }
          break;
        case "3":
          //已审批
          if (this.loadingNum * this.ApprovedNum >= this.ApprovedTotal) {
            //this.$toast((this.loadingNum * this.ApprovedNum).toString());
            //this.allLoaded = true;
          } else {
            this.allLoaded = false;
          }
          if (this.ApprovedTotal == 0) {
            this.noneData = true;
          } else {
            this.noneData = false;
          }
          break;
        case "4":
          //抄送我
          if (this.loadingNum * this.copyNum >= this.copyTotal) {
            //this.$toast((this.loadingNum * this.copyNum).toString());
            //this.allLoaded = true;
          } else {
            this.allLoaded = false;
          }
          if (this.copyTotal == 0) {
            this.noneData = true;
          } else {
            this.noneData = false;
          }
          break;
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

.margin {
  margin-top: 50px
}

.bottomLine {
  height: 44px;
  line-height: 44px;
  background: #FAFAFA;
  text-align: center;
  color: #C0CCDA;
  font-size: 12px
}

.fixnavbar {
  position: fixed;
  z-index: 999;
  width: 100%;
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
