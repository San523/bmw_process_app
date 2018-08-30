import Vue from 'vue';
import axios from 'axios';
import store from './store';
import router from '../router';
import config from './config'

let urltitle = 'http://' + config.vrmakerapi.ip + ":" + config.vrmakerapi.port;

export default {
  //请求任务汇报页面表格标题数据
  getaliyun({ commit, state }, params) {
    let appcode = '60e8a8368b454f3d955058d8c55a4d05';
    //let query = params;
    return axios({
      url: 'http://jisuznwd.market.alicloudapi.com/iqa/query?question=' + params,
      method: 'GET',
      headers: {
        "Authorization": "APPCODE " + appcode
      },
    });
  },

  //测试接口
  test({ commit, state }, params) {
    return axios({
      url: "http://192.168.4.166:8080/prj-gzjd/appProjectController!getWorkCell.m",
      method: 'post',
      data: params,
    });
  },

  //登录接口
  login({ commit, state }, params) {
    return axios({
      url: urltitle + "/forge/login",
      method: 'post',
      data: params,
    });
  },

  //登录状态轮询
  chechUserLogin({ commit, state }, params) {
    return axios({
      url: urltitle + "/forge/chechUserLogin",
      method: 'post',
      data: params,

    });
  },



  //获取所有项目
  getProjects({ commit, state }, params) {
    return axios({
      url: urltitle + "/forge/getProjects",
      method: 'post',
      data: params,
    });
  },

  //检查用户是否拥有项目
  checkUserProjects({ commit, state }, params) {
    return axios({
      url: urltitle + "/process/checkUserProjects",
      method: 'post',
      data: params,
    });
  },

  //添加用户到项目
  addMembersToProjects({ commit, state }, params) {
    return axios({
      url: urltitle + "/project/addMembersToProjects",
      method: 'post',
      data: params,
    });
  },



  /*
  审批报表
  */
  //选择项目更新数据
  getProcessChart({ commit, state }, params) {
    return axios({
      url: urltitle + "/process/getProcessChart",
      method: 'post',
      data: params,
    });
  },


  //获取审批列表
  getAuditingByType({ commit, state }, params) {
    return axios({
      url: urltitle + "/process/getAuditingByType",
      method: 'post',
      data: params,
    });
  },

  //获取审批时长
  getUserProcessingTime({ commit, state }, params) {
    return axios({
      url: urltitle + "/process/getUserProcessingTime",
      method: 'post',
      data: params,
    });
  },

  //获取所有未读消息
  getAllUnreadMessages({ commit, state }, params) {
    return axios({
      url: urltitle + "/process/getAllUnreadMessages",
      method: 'post',
      data: params,
    });
  },
  /*
  个人中心
  */

  //获取登录人信息
  getUserInformation({ commit, state }, params) {
    return axios({
      url: urltitle + "/process/getUserInformation",
      method: 'post',
      data: params,
    });
  },

  //上传签名
  setUserSignature({ commit, state }, params) {
    return axios({
      url: urltitle + "/project/setUserSignature",
      method: 'post',
      data: params,
    });
  },

  //退出登录
  appSignOut({ commit, state }, params) {
    return axios({
      url: urltitle + "/forge/appSignOut",
      method: 'post',
      data: params,
    });
  },

  /*
   审批管理
   */
  //获取我的申请信息列表
  getOwnerAuditing({ commit, state }, params) {
    return axios({
      url: urltitle + "/process/getOwnerAuditing",
      method: 'post',
      data: params,
    });
  },
  //获取待我审批信息
  getNeedAuditing({ commit, state }, params) {
    return axios({
      url: urltitle + "/process/getNeedAuditing",
      method: 'post',
      data: params,
    });
  },

  //获取已审批信息
  getApprovedAuditing({ commit, state }, params) {
    return axios({
      url: urltitle + "/process/getApprovedAuditing",
      method: 'post',
      data: params,
    });
  },

  //获取抄送我信息
  getCopyAuditing({ commit, state }, params) {
    return axios({
      url: urltitle + "/process/getCopyAuditing",
      method: 'post',
      data: params,
    });
  },

  //获取待我审批信息
  getAuditingById({ commit, state }, params) {
    return axios({
      url: urltitle + "/process/getAuditingById",
      method: 'post',
      data: params,
    });
  },


  //搜索框
  searchProcessInformationByConditions({ commit, state }, params) {
    return axios({
      url: urltitle + "/process/searchProcessInformationByConditions",
      method: 'post',
      data: params,
    });
  },


  //确认审批
  ApplicationAuditing({ commit, state }, params) {
    return axios({
      url: urltitle + "/process/ApplicationAuditing",
      method: 'post',
      data: params,
    });
  },

  //获取公司及人员
  getProjectCompaninesAndUsers({ commit, state }, params) {
    return axios({
      url: urltitle + "/process/getProjectCompaninesAndUsers",
      method: 'post',
      data: params,
    });
  },
}
