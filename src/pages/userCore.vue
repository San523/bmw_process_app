<template>
  <div>
    <Layout style='text-align: center;' :has_return="false" :has_setting="true" :title="language.title_userCore" footer_active="userCore" :bottom_nav="bottom_nav">
    </Layout>
    <div class="model" v-show="model" @click="model = false">
      <div class="model-show">
        <img :src="modelSrc" alt="">
      </div>
    </div>
    <div class="show-info" v-if="Screenshot">
      <div class="test">
        <vueCropper ref="cropper" :img="example.img" :outputSize="example.size" :outputType="example.outputType" :info="example.info" :canScale="example.canScale" :autoCrop="example.autoCrop" :autoCropWidth="example.autoCropWidth" :autoCropHeight="example.autoCropHeight" :fixed="example.fixed" :fixedNumber="example.fixedNumber"></vueCropper>
      </div>
      <div class="button_div">
        <button @click="screenshot('cancel')" class="btn">{{language.cancel}}</button>
        <button @click="screenshot('preview')" class="btn">{{language.preview}}</button>
        <button @click="screenshot('sure')" class="btn">{{language.sure}}</button>
      </div>
    </div>
    <div class="group" v-if="!Screenshot">
      <!-- 头像、用户名与签名 -->
      <div class="picBox">
        <div class="preson_pic">
          <img :src="UserInformation.image_url">
          <span style="">{{UserInformation.name}}</span>
        </div>
        <div style="">
          <label class="btnlabel" for="uploads">
            <div class="preson_singed">
              <img :src="UserInformation.signature">
            </div>
          </label>
          <input type="file" id="uploads" v-bind:value="inputV" style="display:none" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event)">
        </div>
      </div>
      <!-- 头像、用户名与签名 -->
      <span v-if="!UserInformation.about_me==''" class="lititle">{{language.about_me}}</span>
      <div v-if="!UserInformation.about_me==''" class='aboutme address'>
        <span>{{UserInformation.about_me}}</span>
      </div>
      <span class="lititle">{{language.Contact_information}}</span>
      <div class="wrap">
        <mt-cell class='cell_title' :title="language.mobile"><span class="val">{{UserInformation.phone}}</span></mt-cell>
        <mt-cell class='cell_title' :title="language.Mail_box"><span class="val">{{UserInformation.email}}</span></mt-cell>
      </div>
      <span class="lititle">{{language.work_information}}</span>
      <div class="wrap">
        <mt-cell class='cell_title' :title="language.company"><span class="val">{{UserInformation.company_name}}</span></mt-cell>
        <mt-cell class='cell_title' :title="language.Title"><span class="val">{{UserInformation.job_title}}</span></mt-cell>
        <mt-cell class='cell_title' :title="language.profession"><span class="val">{{UserInformation.industry}}</span></mt-cell>
      </div>
      <span class="lititle">{{language.address}}</span>
      <div class='aboutme address'>
        <span>{{UserInformation.address_line_1}}</span>
        <span>{{UserInformation.address_line_2}}</span>
        <span>{{UserInformation.city}} {{UserInformation.postal_code}}</span>
        <span>{{UserInformation.country}}</span>
      </div>
      <div class='logout' @click="logout">
        <p>{{language.logout}}</p>
      </div>
      <!--占位符 -->
      <div style="height: 100px"></div>
      <!--占位符 -->
    </div>
  </div>
</template>
<script type="text/javascript">
import ApiCloud from '@/assets/js/api.min.js' //导入apicloud的JS代码
import ChangeLanguage from '../language/changeLanguage.js' //引用模块进来
import Layout from '@/components/Layout'
import config from '@/vuex/config'
import vueCropper from '@/components/vue-cropper'
import codes from '@/components/code'
export default {
  //该页面的控制数据
  data() {
    return {
      inputV: "",
      model: false,
      modelSrc: '',
      language: ChangeLanguage.ChinesesLa,
      bottom_nav: '',
      Screenshot: false, //截图窗口  
      has_return: false,
      UserInformation: { //用户信息
        about_me: "", //自我介绍
        company_name: "", //公司
        email: "", //邮箱
        image_url: "", //头像
        job_title: "", //职称
        name: "", //人名
        phone: "", //电话
        industry: "", //专业
        address_line_1: "",
        address_line_2: "",
        city: "",
        postal_code: "", //邮编
        country: "",
      },
      example: {
        img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 300,
        autoCropHeight: 250,
        fixed: true,
        fixedNumber: [2, 1]
      },
    };
  },
  //父控件传过来的参数
  props: {

  },
  //监听函数
  wacth: {

  },
  created() {
    this.tellLan();
    this.getAllUnreadMessages();
    this.getUserInformation();
  },
  //进入页面执行的函数å
  mounted() {

  },
  //定义函数
  methods: {
    //判断语言
    tellLan() {
      if (this.$store.state.languageType == '中文') {
        this.language = ChangeLanguage.ChinesesLa;
      } else if (this.$store.state.languageType == 'English') {
        this.language = ChangeLanguage.EnglishLa;
      }
      this.bottom_nav = this.language.bottom_nav_userCore;
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

    //退出登录
    logout() {
      this.$messagebox({
        title: '提示',
        message: '确定退出登录?',
        showCancelButton: true
      });
      this.$messagebox.confirm('确定退出登录?').then(action => {
        if (action == 'confirm') {
          this.$indicator.open();
          let params = new URLSearchParams();
          this.$store.dispatch('appSignOut', params).then((response) => {
            let res = response.data;
            if (response.statusText === 'OK' && response.status === 200) {
              if (res.status == "success") {
                //console.log(res.ret);
                //this.UserInformation = res.ret;
                this.$indicator.close();
                this.$router.push({ path: '/' });
              } else {
                this.$indicator.close();
                this.$toast(res.msg);
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
      });


    },


    //获取人员信息
    getUserInformation() {
      this.$indicator.open();
      let params = new URLSearchParams();
      params.append('userid', localStorage.getItem("userid"));
      this.$store.dispatch('getUserInformation', params).then((response) => {
        let res = response.data;
        if (response.statusText === 'OK' && response.status === 200) {
          if (res.status == "success") {
            //console.log(res.ret);
            res.ret.phone = JSON.parse(res.ret.phone).Number
            this.UserInformation = res.ret;
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

    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },

    getBase64Image(img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
      var dataURL = canvas.toDataURL("image/" + ext);
      return dataURL;
    },

    //获取签名图片
    uploadImg(e, num) {
      //上传图片
      // this.option.img
      var file = e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        this.$toast('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }

      var objURL = this.getObjectURL(file)
      this.Screenshot = true
      this.bottom_nav = []
      this.example.img = objURL

      this.inputV = ""

    },

    //截图操作
    screenshot(type) {
      switch (type) {
        case "preview": //截图预览
          this.$refs.cropper.getCropData((data) => {
            this.model = true
            this.modelSrc = data
          })
          this.bottom_nav = []
          break;
        case "cancel": //取消截图
          this.model = false
          this.Screenshot = false
          this.bottom_nav = this.language.bottom_nav_userCore;
          break;
        case "sure": //截图确定
          this.$refs.cropper.getCropData((data) => {
            this.model = false
            this.Screenshot = false
            //this.example.img = data
            var image = new Image();
            image.src = data;
            var self = this;
            image.onload = function() {
              var base64 = self.getBase64Image(image);
              //console.log(base64);
              self.$indicator.open({
                text: '图片上传中',
              });
              // 图片的 base64 格式, 可以直接当成 img 的 src 属性值        
              //var dataURL = reader.result;
              // 下面逻辑处理
              let params = new URLSearchParams();
              params.append('id', localStorage.getItem("userid"));
              params.append('signature', base64);
              self.$store.dispatch('setUserSignature', params).then((response) => {
                let res = response.data;
                if (response.statusText === 'OK' && response.status === 200) {
                  if (res.status == "success") {
                    self.getUserInformation();
                    self.$indicator.close();
                    self.$toast("上传成功");

                    //this.UserInformation = res.ret;
                  } else {
                    self.$indicator.close();
                    self.$toast("后台错误");
                  }
                } else {
                  self.$indicator.close();
                  self.$toast("网络错误");
                }
              }).catch((err) => {
                self.$indicator.close();
                self.$toast("网络连接错误");
              });
            }
          })
          this.bottom_nav = this.language.bottom_nav_userCore;
          break;

      }
    },


    //手机端获取图片
    getPicture() {
      let userid = localStorage.getItem("userid");
      var self = this;
      try {
        api.getPicture({
          sourceType: 'album', // camera 相机  library 图片库  album 相册
          encodingType: 'jpg', //png
          mediaValue: 'pic', //video
          destinationType: 'base64',
          allowEdit: true,
          quality: 50,
          targetWidth: 100,
          targetHeight: 100,
          saveToPhotoAlbum: false
        }, function(ret, err) {
          if (ret) {
            if (ret.data != "") {
              //console.log(JSON.stringify(ret));
              let params = new URLSearchParams();
              params.append('id', userid);
              params.append('signature', ret.base64Data);
              self.$store.dispatch('setUserSignature', params).then((response) => {
                let res = response.data;
                if (response.statusText === 'OK' && response.status === 200) {
                  if (res.status == "success") {

                    self.$toast("上传成功");
                    self.getUserInformation();
                    //this.UserInformation = res.ret;
                  } else {
                    self.$toast("后台错误");
                  }
                } else {
                  self.$toast("网络错误");
                }
              }).catch((err) => {
                self.$toast("网络连接错误");
              });
            }
          } else {
            //alert(JSON.stringify(err));
          }
        });

      } catch (err) {
        self.$toast("此状态不支持图片上传");
        // let params = new URLSearchParams();
        // params.append('id', localStorage.getItem("userid"));
        // params.append('signature', config.base64);
        // self.$store.dispatch('setUserSignature', params).then((response) => {
        //   let res = response.data;
        //   if (response.statusText === 'OK' && response.status === 200) {
        //     if (res.status == "success") {
        //       //console.log(res.ret);
        //       //this.UserInformation = res.ret;
        //       self.$toast("上传成功");
        //       self.getUserInformation();
        //     }
        //   } else {
        //     self.$toast("网络错误");
        //   }
        // }).catch((err) => {
        //   self.$toast("网络连接错误");
        // });
      }

    },

    readBlobAsDataURL(blob, callback) {
      var a = new FileReader();
      a.onload = function(e) { callback(e.target.result); };
      a.readAsDataURL(blob);
    }
  },
  //增加控件
  components: {
    Layout,
    vueCropper,
    codes
  }
}

</script>
<style scoped lang="css">
.button_div {
  padding: 10px 10px
}

button {
  background-color: #4CAF50;
  /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

.group {
  margin-top: 10px;
  background: rgba(250, 250, 250, 1);
}

.test {
  height: 400px;
}

.model {
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
}

.model-show {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.model img {
  display: block;
  margin: auto;
  max-width: 80%;
  user-select: none;
  background-position: 0px 0px, 10px 10px;
  background-size: 20px 20px;
  background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%), linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
}


.picBox {
  height: 80px;
  border: 1px solid #E1E1E1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
}

.aboutme {
  color: #475669;
}

.preson_pic img {
  width: 60px;
  height: 60px;
  vertical-align: middle;
  margin: 10px 10px;
  border-radius: 40px
}

.preson_pic span {
  font-size: 20px;
  color: #475669;
}

.btnlabel {}

.btninput {}

.preson_singed {
  margin-right: 10px;
}

.preson_singed img {
  width: 120px;
  height: 60px;
  vertical-align: middle;
}

.cell_title {
  color: #99A9BF;
  font-size: 15px;
}

.lititle {
  display: block;
  margin: 10px 10px;
  font-size: 12px;
  color: #8492A6
}

.logout {
  border-top: 1px solid #E1E1E1;
  border-bottom: 1px solid #E1E1E1;
  background: #fff;
  margin-top: 50px;
  text-align: center
}

.logout p {
  color: red;
  font-size: 16px
}

.address {
  border-top: 1px solid #E1E1E1;
  border-bottom: 1px solid #E1E1E1;
  padding: 10px 10px;
  background: #fff;
}

.address span {
  display: block;
  word-break: normal;
  width: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
  font-size: 15px;
}

.wrap span {
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
  width: 270px;
  display: block;
  text-align: right;
}

.val {
  color: #475669;
  font-size: 15px;
}

</style>
