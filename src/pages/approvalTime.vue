<!-- 审批时长页面 -->
<template>
  <div class="background">
    <Layout style='text-align: center;' :has_return="true" :bottom_nav="bottom_nav" :title="language.approvalTimeTitle" :has_footer="false">
    </Layout>
    <div class="group">
      <!-- <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :max-distance="150" ref="loadmore"> -->
      <!-- 搜索框 -->
      <div id="search" ref='search'>
        <input type="text" v-model="searchTx" @keyup.enter="search" :placeholder="language.searchplaceholder">
      </div>
      <!-- 搜索框 -->
      <div v-for="item in approvalList" class="time">
        <span>{{item.name}}</span>
        <span>{{item.Time}}</span>
      </div>
      <div v-if="noneData" class="noneData">
        <img src="@/assets/img/noneData.png">
      </div>
      <!-- </mt-loadmore> -->
    </div>
    <div class="bottomLine" v-if="allLoaded">-----我是有底线的-----</div>
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
      title: '审批时长', //页面标题,
      bottom_nav: [], //底部栏信息
      groupHeight: 0, //每个选择页面长度
      allLoaded: false, //是否加载完
      searchTx: "", //搜索框内容
      loadmore: 1, //下拉次数
      noneData: false, //是否无数据
      /*每页显示数*/
      loadingNum: this.$store.state.loadingNum,
      approvalCount: 50, //列表总数
      approvalList: [],
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
    this.getUserProcessingTime()
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
    //上拉加载
    loadBottom() { // 加载更多数据的操作
      var self = this;
      setTimeout(function() {
        if (self.loadmore * self.loadingNum > self.approvalCount) {
          self.allLoaded = true;
        }
        self.loadmore = ++self.loadmore;
        self.getUserProcessingTime();
        self.$refs.loadmore.onBottomLoaded();
      }, 1500);
    },

    search(e) {
      //alert(this.searchTx);
      this.approvalList = [];
      this.getUserProcessingTime();
    },

    //选择项目更新数据
    getUserProcessingTime() {
      //alert(this.$children[0].project.id);
      this.$indicator.open();
      let params = new URLSearchParams();
      params.append('projectid', this.$route.query.projectidAarry); //项目号
      //params.append('page', this.loadmore); //下拉次数
      params.append('string', this.searchTx); //搜索字段
      //params.append('number', this.loadingNum); //每页显示数 
      this.$store.dispatch('getUserProcessingTime', params).then((response) => {
        let res = response.data;
        if (response.statusText === 'OK' && response.status === 200) {
          if (res.status == "success") {
            //console.log(res.ret);
            this.approvalList = res.ret
            this.approvalCount = res.ret.length
            if (this.approvalCount == 0) {
              this.noneData = true
            }
            this.$indicator.close();
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
.backgroud {
  background-color: #FAFAFA
}

.noneData {
  width: 100%;
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

.time {
  color: #475669;
  font-size: 14px;
  border-bottom: 1px solid #E0E6ED;
  padding: 10px 10px;
}

.time span:nth-child(2) {
  float: right;
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
