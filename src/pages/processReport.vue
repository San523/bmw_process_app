<!-- 审批报表页面 -->
<template>
  <div>
    <Layout ref="Layout" style='text-align: center;' :has_return="false" :has_select="true" :title="language.title_processReport" footer_active="processReport" :bottom_nav="bottom_nav" v-on:childMethod="changePro">
    </Layout>
    <div class="group" @touchstart="closeProjectList">
      <mt-loadmore :top-method="loadTop" :max-distance="150" ref="loadmore">
        <div class="littleTitle">
          <img src="@/assets/img/process_icon.svg">
          <p>{{language.statistics}}</p>
        </div>
        <div class="processBtn">
          <div class="processList" @click="toApprovalList('approvalListTitle')">
            <div class="processBox processBox_processing">
              <span>{{statisticsData[0]}}</span>
            </div>
            <div class="processText">{{language.approvaling}}</div>
          </div>
          <div class="processList" @click="toApprovalList('rejectListTitle')">
            <div class="processBox  processBox_reject">
              <span>{{statisticsData[1]}}</span>
            </div>
            <div class="processText">{{language.backed}}</div>
          </div>
          <div class="processList" @click="toApprovalList('endListTitle')">
            <div class="processBox processBox_end">
              <span>{{statisticsData[2]}}</span>
            </div>
            <div class="processText">{{language.stoped}}</div>
          </div>
          <div class="processList" @click="toApprovalList('finishedListTitle')">
            <div class="processBox processBox_finished">
              <span>{{statisticsData[3]}}</span>
            </div>
            <div class="processText">{{language.finisheded}}</div>
          </div>
        </div>
        <div class="littleTitle">
          <img src="@/assets/img/process_icon.svg">
          <p>{{language.Trendmap}}</p>
        </div>
        <div id="myChart" :style="{width: '375px;', height: '300px'}"></div>
        <div class="littleTitle">
          <img src="@/assets/img/process_icon.svg">
          <p>{{language.Lengthtime}}</p>
        </div>
        <div class="cell" @click="toApprovalTime">
          <mt-cell v-for="item in approvalTime" class='cell_title' :title="item.name"><span class="val">{{item.Time}}</span></mt-cell>
        </div>
        <!--占位符 -->
        <div style="height: 55px"></div>
        <!--占位符 -->
      </mt-loadmore>
    </div>
  </div>
</template>
<script type="text/javascript">
import ApiCloud from '@/assets/js/api.min.js' //导入apicloud的JS代码
import { goback } from '../language/changeLanguage.js'; //导入中英文切换的JS代码
import ChangeLanguage from '../language/changeLanguage.js' //引用模块进来
import "@/assets/css/public.css";

import Layout from '@/components/Layout';
export default {
  //该页面的控制数据
  data() {
    return {
      //底部按钮
      bottom_nav: '',
      //页面长度
      groupHeight: 0,
      //
      //审批单列表
      approvalTime: [
        // {
        //   name: "小明",
        //   Time: "15day",
        //   gid: "fdawew"
        // } 
      ],
      //项目数组
      projectidAarry: [],
      //审批列表的展开列表
      approvallistContent: [],
      //审批统计四个值
      statisticsData: [0, 0, 0, 0],
      //趋势图数据
      TrendData: {
        DMN: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        RFI: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
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
  //进入页面执行的函数
  mounted() {
    this.getAllUnreadMessages();
    this.changePro(); //根据项目筛选
    //console.log(JSON.parse(this.$route.query));
    try {
      this.$children[0].SelectPro = JSON.parse(localStorage.getItem("SelectPro"));
    } catch (err) {
      //document.getElementById("demo").innerHTML = err.message;
    }

    this.tencentPush();
  },
  //定义函数
  methods: {
    //判断语言
    tellLan() {
      if (this.$store.state.languageType == '中文') {
        this.language = ChangeLanguage.ChinesesLa;
      } else if (this.$store.state.languageType == 'English') {
        this.language = ChangeLanguage.EnglishLa;
      };
      this.bottom_nav = this.language.bottom_nav_processReport;

      //this.$refs.Layout.test();
    },
    //下拉刷新
    loadTop() { // 刷新数据的操作
      var self = this;
      setTimeout(function() {
        self.getAllUnreadMessages();
        self.changePro(); //根据项目筛选

        //console.log(JSON.parse(this.$route.query));
        try {
          self.$children[0].SelectPro = JSON.parse(localStorage.getItem("SelectPro"));
        } catch (err) {
          //document.getElementById("demo").innerHTML = err.message;
        }
        self.$refs.loadmore.onTopLoaded();
        //location.reload();
      }, 1500);
    },

    //关闭顶部项目弹窗
    closeProjectList() {
      this.$children[0].show_projectList = false;
    },

    //信鸽注册
    tencentPush() {
      var self = this;
      try {
        var tencentPush = api.require('tencentPush');
        // 注册设备并绑定用户账号
        tencentPush.registerPush({
          account: localStorage.getItem("userid")
        }, function(ret, err) {
          if (ret.status) {
            console.log("注册成功2，token为：" + ret.token);
          } else {
            console.log("注册失败，错误码：" + err.code + "，错误信息：" + err.msg);
          }
        });
        tencentPush.config({
          debug: true
        });

      } catch (err) {
        //console.log(JSON.stringify(err))
        //self.$toast("此环境不允许推送");
      }
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
            this.$indicator.close();
            this.$toast("后台错误");
          }
        } else {
          this.$toast("网络错误");
        }
      }).catch((err) => {
        this.$toast("网络连接错误");
      });
    },


    //选择项目更新数据
    changePro() {
      this.$indicator.open();
      //alert(this.$children[0].project.id);
      let params = new URLSearchParams();
      let SelectPro = [];
      let projectidAarry = [];
      SelectPro = JSON.parse(localStorage.getItem("SelectPro"))
      if (this.$children[0].project.id == "all") {
        for (var i = SelectPro.length - 1; i >= 0; i--) {
          if (SelectPro[i].id != "all") {
            projectidAarry.push(SelectPro[i].id)
          }
        }
      } else {
        projectidAarry.push(this.$children[0].project.id)
      }

      //console.log(projectidAarry);
      this.projectidAarry = JSON.stringify(projectidAarry);
      //console.log(projectidAarry);
      params.append('projectid', this.projectidAarry); //项目号
      this.$store.dispatch('getProcessChart', params).then((response) => {
        let res = response.data;
        if (response.statusText === 'OK' && response.status === 200) {
          this.$indicator.close();
          if (res.status == "success") {
            this.statisticsData = [res.type.approved.length, res.type.rejected.length, res.type.stopped.length, res.type.completed.length]
            this.TrendData.DMN = res.data.DMN;
            this.TrendData.RFI = res.data.RFI;
            this.drawLine();
            this.approvalTime = res.rank
            //console.log(res.data.DMN);
            //审批单列表  this.approvalTime
            //审批统计四个值  this.statisticsData
            //趋势图数据   this.TrendData
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


    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'), 'macarons')
      // 绘制图表
      myChart.setOption({
        // title: {
        //   text: '审批申请情况',
        //   subtext: '纯属虚构'
        // },
        grid: {
          left: '0',
          right: '3%',
          bottom: '3%',
          top: '10%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          x: 'right', // 'center' | 'left' | {number},
          data: [this.language.DMNsum, this.language.RFIsum]
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLabel: { //调整x轴的lable  
            textStyle: {
              fontSize: 10, // 让字体变大
            },
            interval: 0, //横轴信息全部显示  
            //rotate: -30, //-30度角倾斜显示  
          },
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }],
        yAxis: [{
          type: 'value',
          axisLabel: { //调整x轴的lable  
            textStyle: {
              fontSize: 10, // 让字体变大
            },
            interval: 0, //横轴信息全部显示  
            //rotate: -30, //-30度角倾斜显示  
          },
        }],
        series: [{
            name: this.language.DMNsum,
            type: 'line',
            smooth: true,
            itemStyle: { normal: { areaStyle: { type: 'default' } } },
            data: this.TrendData.DMN
          },
          {
            name: this.language.RFIsum,
            type: 'line',
            smooth: true,
            itemStyle: { normal: { areaStyle: { type: 'default' } } },
            data: this.TrendData.RFI
          }
        ]

      });

    },
    //跳转审批列表页面
    toApprovalList(v) {
      var array = {
        project: this.$store.state.showProject,
        title: v,
        projectidAarry: this.projectidAarry
      };
      this.$router.push({ name: 'ApprovalList', query: array });
    },
    //跳转审批时长页面
    toApprovalTime() {
      var array = {
        project: this.$store.state.showProject,
        projectidAarry: this.projectidAarry
      };
      this.$router.push({ name: 'ApprovalTime', query: array });
      //this.$router.push({ name: 'Cropper' });
    }

  },
  //增加控件
  components: {
    Layout
  }
}

</script>
<style scoped lang="css">
.icon-success {
  content: "\E602";
}


.overlay {
  position: absolute;
  top: 25px;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  /*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
  height: 100%;
  filter: alpha(opacity=60);
  /*设置透明度为60%*/
  opacity: 0.6;
  /*非IE浏览器下设置透明度为60%*/
  z-index: 100;
}

#myChart {
  margin: 20px 10px;
}

.littleTitle {
  height: 16px;
  margin-top: 20px;
  margin-left: 10px;
  display: flex;
  align-items: center;
}

.littleTitle p {
  color: #99A9BF;
  font-size: 12px;
  display: inline;
  margin-left: 5px;
}

.processBtn {
  margin: 10px;
  display: flex;
  justify-content: center;
}

.processList {
  width: 85px;
  margin-left: 5px
}

.processBox {
  height: 44px;
  width: 85px;
  background-size: 100%;
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  line-height: 44px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}


.processBox_processing {
  background-image: url(../assets/img/processing_bg.png);
}

.processBox_reject {
  background-image: url(../assets/img/reject_bg.png);
}

.processBox_end {
  background-image: url(../assets/img/end_bg.png);
}

.processBox_finished {

  background-image: url(../assets/img/finished_bg.png);
}

.processBox span {
  margin-left: 5px;
}

.processText {
  color: #475669;
  font-size: 12px;
  text-align: center;
  margin-top: 5px;
}

.cell {
  margin-top: 10px;
}

</style>
