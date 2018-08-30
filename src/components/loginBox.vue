<template>
  <div class="Box ">
    <div v-if="!iflogin">
      <div class="logoImg"></div>
      <div class="IDtell">
        <span>Have an Autodesk ID?</span>
      </div>
      <div class="sure" @click="logoIn">
        <button>Sign In</button>
      </div>
    </div>
    <iframe :src="iframeSrc" v-if="iflogin" style="width:345px;height:320px "></iframe>
    <!-- <a v-if="iflogin" :href="iframeSrc"></a> -->
  </div>
</template>
<script type="text/javascript">
import ApiCloud from '@/assets/js/api.min.js'; //导入apicloud的JS代码
export default {
  data() {
    return {
      selectRemember: 0,
      iflogin: false, //是否打开登录页面
      iframeSrc: "", //访问forge的地址
      cycle: "", //循环函数
      ifautoDeskOpen: false, //宝马登录页面是否开启
      interval: "",
    }
  },
  props: {

  },
  computed: {

  },
  wacth: {

  },
  created() {

  },
  mounted() {
    this.ifhasLogin();
    this.interval = setInterval(this.ifhasLogin, 300)

    /////////////////////////////////////cc71831b-f397-4c22-ab7b-37d6068406d1
    // localStorage.setItem("userid", "246cba2c-881e-4b60-a077-b8d57619623a"); //246cba2c-881e-4b60-a077-b8d57619623a
    // this.$emit('childMethod');

    //this.judage()

  },
  methods: {

    judage() {
      var self = this;
      try {
        var appId = api.appId;
        alert(appId)
        self.ifhasLogin();
        self.interval = setInterval(self.ifhasLogin, 300)
      } catch (err) {
        alert("catch")
        localStorage.setItem("userid", "cc71831b-f397-4c22-ab7b-37d6068406d1"); //246cba2c-881e-4b60-a077-b8d57619623a
        self.$emit('childMethod');
      }
    },


    logoIn() {
      let params = new URLSearchParams();
      this.$store.dispatch('chechUserLogin', params).then((response) => {
        //this.$toast(res.status);
        let res = response.data;
        if (response.statusText === 'OK' && response.status === 200) {
          if (res.status == "success") {
            //console.log(JSON.stringify(res.ret));
            localStorage.setItem("userid", res.ret.info.id);
            this.$emit('childMethod');
            var self = this;
            clearInterval(self.interval)
          } else {
            try {
              //alert("这里是try");
              api.openWin({
                name: 'Loginpage',
                url: 'http://vrmaker.com.cn:8080/forge/afterLogin',
                pageParam: {
                  name: 'test'
                }
              });
            } catch (err) {

            }
          }
        } else {
          this.$toast("网络错误");
        }
      }).catch((err) => {
        console.log(JSON.stringify(err));
        //alert(JSON.stringify(err));
      });
    },

    //登录验证
    SignIn() {
      var self = this;
      try {
        //alert("这里是try");
        if (!self.ifautoDeskOpen) {
          api.openWin({
            name: 'Loginpage',
            url: 'http://vrmaker.com.cn:8080/forge/afterLogin',
            pageParam: {
              name: 'test'
            }
          });
          self.ifautoDeskOpen = true
        }

      } catch (err) {
        //alert("这里是catch");
        //window.open("http://vrmaker.com.cn:8080/forge/afterLogin");
        //clearInterval(this.cycle);
      }
    },



    //判断 是否登录成功
    ifhasLogin() {
      //this.$emit('childMethod');
      //window.open("http://vrmaker.com.cn:8080/forge/afterLogin");
      let params = new URLSearchParams();
      this.$store.dispatch('chechUserLogin', params).then((response) => {
        //this.$toast(res.status);
        let res = response.data;
        if (response.statusText === 'OK' && response.status === 200) {
          if (res.status == "success") {
            //console.log(JSON.stringify(res.ret));
            localStorage.setItem("userid", res.ret.info.id);
            this.$emit('childMethod');
            var self = this;
            clearInterval(self.interval)
          } else {
            this.SignIn();
          }
        } else {
          this.$toast("网络错误");
        }
      }).catch((err) => {
        console.log(JSON.stringify(err));
        //alert(JSON.stringify(err));
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
  height: 320px;
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
  color: #5E6D82;
  font-size: 14px;
  margin-top: 71px;
  margin-left: 23px;
}

.sure {
  text-align: center;
  margin-top: 10px
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

</style>
