<template>
  <div class="all">
    <!-- 头部 -->
    <div class="androiddiv"></div>
    <div class="headerdiv">
      <div class="head" :style="'height:'+headerdivHeight+'px'"></div>
      <header class="header">
        <div class="returnBtnTop" :style="{visibility: has_return ? 'visible' : 'hidden'}" @click="returnHistory"><img src="@/assets/img/returnBtnTop.svg"></div>
        <div class="title">
          <span>{{title}}</span>
        </div>
        <div class="settingBtn" :style="{visibility: has_setting ? 'visible' : 'hidden'}" @click="settingsPage"><img src="@/assets/img/settings.svg"> </div>
        <!-- 项目选择 -->
        <div class="selectProject" :style="{visibility: has_select ? 'visible' : 'hidden'}" @click="select_projectList()">
          <div>{{project.name}}</div>
          <img :class="show_projectList?'imgrotate':''" src="@/assets/img/arrow_icon.svg">
        </div>
        <!-- 项目选择 -->
      </header>
    </div>
    <!--占位符 -->
    <div :style="'height:'+seatheight+'px'"></div>
    <!--占位符 -->
    <!-- 头部 -->
    <transition name="list">
      <div class="projectList" v-show="show_projectList">
        <ul>
          <!--     <a href="javascript:;" @click="chooseProject(allProject)">
            {{this.allProject}}
            <li>{{allProject.name}}</li>
          </a> -->
          <a v-for="item in SelectPro" href="javascript:;" @click="chooseProject(item)">
            <li>{{item.name}}</li>
          </a>
        </ul>
      </div>
    </transition>
    <!-- 内容 -->
    <div class="content">
      <slot></slot>
    </div>
    <!-- 内容 -->
    <!-- 底部 -->
    <!-- {{this.$store.state.processManageNoread}} -->
    <div class="footer" v-if="has_footer">
      <div class="footer_btn_box">
        <div class="footer_btn" v-for="nav in bottom_nav" :key="nav.title" @click="handleChange(nav.value)">
          <div class="footer_icon" :class="{active:footer_active==nav.value}" :style="'background-image: url(static/img/icon/'+ nav.icon +');'">
            <span v-show="processManageNoread!=0&&(nav.title=='审批管理'||nav.title=='processManage')" class="badge"><i><!-- {{processManageNoread}} --></i></span>
          </div>
          <div class="footer_text" :class="{'active':footer_active==nav.value}">{{nav.title}}</div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
  </div>
</template>
<script type="text/javascript">
import ApiCloud from '@/assets/js/api.min.js' //导入apicloud的JS代码
import ChangeLanguage from '../language/changeLanguage.js' //引用模块进来
export default {
  name: "Layout",
  //该页面的控制数据
  data() {
    return {
      active: 'processReport',
      language: '', //系统选择语言
      processManageNoread: (this.$store.state.processManageNoread>99)?'99+':this.$store.state.processManageNoread, //未读数量
      //头部高度
      headerdivHeight: 0,
      //占位符长度
      seatheight: 60,
      //项目列表
      SelectPro: JSON.parse(localStorage.getItem("SelectPro")),
      //显示筛选项目列表
      show_projectList: false,
      //显示项目
      project: {},
    };
  },
  //父控件传过来的参数
  props: {
    //底部按钮控制参数
    bottom_nav: {
      type: Array,
      default: '',
    },
    //标题控制参数
    title: {
      type: String,
      default: '',
    },
    //底部选择控制参数
    footer_active: {
      type: String,
      default: '',
    },
    //是否有底部控制参数
    has_footer: {
      type: Boolean,
      default: true,
    },
    //是否有返回按钮控制参数
    has_return: {
      type: Boolean,
      default: true,
    },
    //是否有选择项目按钮控制参数
    has_select: {
      type: Boolean,
      default: false,
    },
    //是否有设置按钮控制参数
    has_setting: {
      type: Boolean,
      default: false,
    },

  },
  //监听函数
  wacth: {

  },
  //进入页面执行的函数å
  mounted() {

  },

  created() {
    this.tellLan();
    this.setDevice();
    //console.log(JSON.parse(localStorage.getItem("SelectPro")));
  },
  //定义函数
  methods: {

    test() {
      //alert(1111);
    },
    //选择底部页面
    handleChange(val) {
      //alert(val);
      this.$router.push(val);
    },

    //返回上一页
    returnHistory() {
      if (this.title == this.language.applicationDetails) {
        var s = this.$parent.$data.parentMsg.item;
        var num = s.replace(/[^0-9]/ig, "");
        this.$store.commit('updateprocessManageSelect', num);
        this.$router.go(-1);
        //this.$router.push({ path: '/processManage' });
      } else if (this.title == this.language.transferTitle) {
        //this.$router.push({ path: '/applicationDetailsDMN' });
        this.$store.commit('updatetransferringMeg', []); //清空人员信息
        this.$router.go(-1);
      } else if (this.title == this.language.title_setting) {
        //console.log(111);
        this.$router.push({ path: '/userCore' });
      } else {
        this.$router.go(-1);
      }
    },

    //设置页面
    settingsPage() {
      this.$router.push("/settings");
    },

    //项目筛选函数
    select_projectList() {
      this.show_projectList = !this.show_projectList;
    },
    //选择函数
    chooseProject(v) {
      //console.log(v);
      this.project = v;
      this.$store.commit('updateshowProject', v);
      this.$emit('childMethod');
      this.show_projectList = !this.show_projectList;
    },
    //判断系统语言
    tellLan() {
      if (this.$store.state.languageType == '中文') {
        this.language = ChangeLanguage.ChinesesLa;
      } else if (this.$store.state.languageType == 'English') {
        this.language = ChangeLanguage.EnglishLa;
      }

      if (JSON.stringify(this.$store.state.showProject) == "{}") {
        this.project = {
          name: this.language.allProject,
          id: "all",
        };
      } else {
        if (this.$store.state.showProject.id == "all") {
          this.$store.state.showProject = { name: this.language.allProject, id: "all", }
        }
        this.project = this.$store.state.showProject
      }


      let allProject = {
        name: this.language.allProject,
        id: "all",
      };



      for (var i = this.SelectPro.length - 1; i >= 0; i--) {
        if (this.SelectPro[i].id == allProject.id) {
          this.SelectPro.splice(i, 1)
        }
      }
      this.SelectPro.unshift(allProject);


      localStorage.setItem("SelectPro", JSON.stringify(this.SelectPro));

    },

    //判断设备设置头部高度
    setDevice() {
      try {
        let a = api.appId; //在api打包条件下
        this.headerdivHeight = 20;
        this.seatheight = 80;
        if (navigator.userAgent.match(/iPad|iPhone/i)) {
          this.headerdivHeight = 20;
          this.seatheight = 80;
          //alert(111);
        }
      } catch (e) {
        this.headerdivHeight = 0;
        this.seatheight = 60;
      } finally {
        //不管有没有错误发生，都始终执行
      }
    },





  },
  //增加控件
  components: {

  }
}

</script>
<style scoped lang="css">
.all {
  /* margin: -8px -8px 0 -8px*/
}

.androiddiv {
  
}

.headerdiv {
  background-color: #26a2ff;
  width: 100%;
  position: fixed;
  z-index: 99999999;
}

.head {
  height: 20px;
  background-color: #26a2ff;
}

.header {
  background-color: #26a2ff;
  height: 60px;
  display: flex;
  align-items: center;
  width: 100%;
}

.title {
  margin: auto;
}

.title span {
  color: #fff;
  font-size: 18px;
}



.footer {
  z-index: 999;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  background: #fff;
  height: 50px;
  border-top: 1px solid #E0E6ED;
}

.returnBtnTop {
  width: 20px;
  height: 20px;
  left: 10px;
  position: absolute;
}

.selectProject {
  right: 10px;
  position: absolute;
  color: #fff;
  display: flex;
}

.selectProject img {
  margin-left: 5px;
}

.imgrotate {
  -webkit-transform: rotate(180deg);
  transform: rotateX(180deg);
}

.selectProject div {
  max-width: 90px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.projectList {
  min-width: 140px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  right: 10px;
  margin-top: 5px;
  position: fixed;
  background-color: #fff;
  z-index: 99999999
}

.projectList a {
  text-decoration: none;
  color: #475669;
}

.projectList ul {
  -webkit-padding-start: 0px;
  margin: 10px;
}

.projectList ul li {
  list-style-type: none;
  padding-bottom: 5px;
  text-align: right;
}

.list-enter-active,
.list-leave-active {
  transition: opacity .5s;
}

.list-enter,
.list-leave-to
/* .fade-leave-active below version 2.1.8 */

{
  opacity: 0;
}


.content {}

.footer_btn_box {
  display: flex;
}

.footer_btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 125px;
}

.footer_text {
  font-size: 10px;
  color: #C0CCDA;
}

.footer_icon {
  width: 24px;
  height: 24px;
  background-size: 100%;
}

.active {
  color: #20A0FF;
}

.badge {
  position: relative;
  padding: 5px;
}

.badge i {
  display: block;
  background: #FF4949;
  border-radius: 8px;
  width: 10px;
  height: 10px;
  top: 4px;
  left: 10px;
  position: absolute;
  color: #FFFFFF;
  font-size: 10px;
  text-align: center;
  font-style: normal;
  line-height: 16px
}

.settingBtn {
  width: 20px;
  height: 20px;
  right: 10px;
  position: absolute;
}

</style>
