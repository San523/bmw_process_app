<template>
  <div class="Box ">
    <div class="logoImg"></div>
    <div class="IDtell">
      <span>{{language.selectproTitle}}</span>
    </div>
    <div id="check">
      <div v-for="(item,index,key) of proArray" @click="item.check=!item.check">
        <input type="checkbox" :checked="item.check" class="input_check" v-bind:id="('check'+index)" @click="item.check=!item.check">
        <label v-bind:for="('check'+index)"></label>
        <span>{{item.name}}</span>
      </div>
      <!--  <div @click="check1=!check1">
        <input type="checkbox" :checked="check1" class="input_check" id="check1" @click="check1=!check1">
        <label for="check1"></label>
        <span>项目一1111111111111111111111111111111xxxxxxxxxx</span>
      </div> -->
    </div>
    <div class="sure" @click="toAnother">
      <button>确认</button>
    </div>
  </div>
</template>
<script type="text/javascript">
import ChangeLanguage from '../language/changeLanguage.js' //引用模块进来
export default {
  data() {
    return {
      language: '',
      //项目列表
      proArray: [
        // {
        //   name: "东风公司项目",
        //   id: "87545fwerewq",
        //   check: false
        // }
      ],
      SelectPro: [], //已选择项目
    }
  },
  props: {

  },
  computed: {

  },
  wacth: {

  },
  created() {
    this.ifHasSelectPro()
    this.tellLan();
    //this.getProjects();
  },
  mounted() {

  },
  methods: {
    //进入正式页面
    toAnother() {
      for (var i = this.proArray.length - 1; i >= 0; i--) {
        if (this.proArray[i].check) {
          this.SelectPro.push(this.proArray[i]);
        }
      }
      if (this.SelectPro.length == 0) {
        this.$toast("请至少选择一个项目");
      } else {
        localStorage.setItem("SelectPro", JSON.stringify(this.SelectPro));
        let project_ids = [];
        let user_ids=[];
        user_ids.push(localStorage.getItem("userid"))
         for (var i = this.SelectPro.length - 1; i >= 0; i--) {
            project_ids.push(this.SelectPro[i].id)
        }
        let params = new URLSearchParams();
        params.append('user_ids', JSON.stringify(user_ids));
        params.append('project_ids', JSON.stringify(project_ids));
        this.$store.dispatch('addMembersToProjects', params).then((response) => {
          let res = response.data;
          if (response.statusText === 'OK' && response.status === 200) {
            if (res.status == "success") {
               localStorage.setItem("SelectPro", JSON.stringify(this.SelectPro));
               this.$router.push({ name: 'ProcessReport' });
            } else {
              this.$toast("网络错误");
            }
          } else {
            this.$toast("网络错误");
          }
        }).catch((err) => {
          this.$toast("网络连接错误");
        });
        
      }
      //console.log(this.SelectPro);

    },


    //判断是否该用户已选择项目
    ifHasSelectPro() {
      this.$indicator.open();
      let params = new URLSearchParams();
      params.append('userid', localStorage.getItem("userid"));
      this.$store.dispatch('checkUserProjects', params).then((response) => {
        let res = response.data;
        if (response.statusText === 'OK' && response.status === 200) {
          this.$indicator.close();
          if (res.status == "success") {
            //console.log(res.ret)
            localStorage.setItem("SelectPro", JSON.stringify(res.ret));
            this.$router.push({ name: 'ProcessReport' });
          }else{
            this.getProjects();
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


    //判断系统语言
    tellLan() {
      if (this.$store.state.languageType == '中文') {
        this.language = ChangeLanguage.ChinesesLa;
      } else if (this.$store.state.languageType == 'English') {
        this.language = ChangeLanguage.EnglishLa;
      }
    },


    //获取项目列表
    getProjects() {
      this.$indicator.open();
      let params = new URLSearchParams();
      this.$store.dispatch('getProjects', params).then((response) => {
        let res = response.data;
        if (response.statusText === 'OK' && response.status === 200) {
          if (res.Status == "success") {
            let data = res.ret;
            for (var i = data.length - 1; i >= 0; i--) {
              data[i].check = false
              //console.log(data[i]);
            }
            //console.log(data);
            this.$indicator.close();
            this.proArray = data;
          } else {
            this.$indicator.close();
            this.$toast("网络错误");
          }
        } else {
          this.$toast("网络错误");
          this.$indicator.close();
        }
      }).catch((err) => {
        this.$toast("网络连接错误");
        this.$indicator.close();
      });
    },

  },
  components: {

  }
}

</script>
<style scoped>
.Box {
  width: 345px;
  height: 360px;
  background: #fff;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.5);
}

.logoImg {
  width: 305px;
  height: 32px;
  background-size: 100%;
  background-image: url(../assets/img/DFD.png);
  margin: 20px 20px
}

.IDtell {
  color: #475669;
  font-size: 18px;
  margin-top: 30px;
  margin-left: 23px;
}

#check {
  margin: 0 23px;
  height: 150px;
  overflow-y: scroll;
}

#check div {
  margin-top: 10px;
  vertical-align: middle;
}

#check div label {
  margin-top: -5px
}

#check div span {
  margin-left: 15px;
  color: #1F2D3D;
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
  width: 240px;
  display: inline-block;
}

#check .input_check {
  position: absolute;
  width: 20px;
  height: 20px;
  line-height: 20px;
  visibility: hidden;
  background: #E92333;
  vertical-align: middle;
}

#check .input_check+label {
  display: inline-block;
  width: 16px;
  height: 16px;
  line-height: 20px;
  vertical-align: middle;
  background: url('../assets/img/icon/radio_selectcopy.png') no-repeat;
  background-position: -30px -5px;
  border: 1px solid #C0CCDA;
  border-radius: 4px;
}

#check .input_check:checked+label {
  background-position: -4px -4px;
}

.sure {
  text-align: center;
  margin-top: 40px
}

.sure button {
  width: 300px;
  height: 44px;
  background: #4675A8;
  border-radius: 4px;
  font-size: 16px;
  color: #fff;
  border: none
}


::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 2px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 0.5px;
}

 ::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #C0CCDA;
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #EDEDED;
}

</style>
