import Vue from 'vue';
import Vuex from 'vuex';
import actions from './api';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  state: {
    //模态框类型
    modalStatus: "",
    //是否登录
    isLogin: false,
    //显示语言
    languageType: "中文",
    //审批管理总未读数
    processManageNoread: 0,
    //审批管理页面选择栏
    processManageSelect: '1',
    //显示的项目
    showProject: {},
    //转审选择人员的信息
    transferringMeg: [],
    //列表下拉显示数
    loadingNum: 20
  },
  getters: {

  },

  mutations: {
    //更新模态框类型
    updateModalStatus(state, modalStatus) {
      state.modalStatus = modalStatus;
    },

    //更改系统语言
    updatelanguageStatus(state, languageType) {
      state.languageType = languageType;
    },

    updateprocessManageNoread(state, processManageNoread) {
      state.processManageNoread = processManageNoread;
    },

    updateprocessManageSelect(state, processManageSelect) {
      state.processManageSelect = processManageSelect;
    },


    updateshowProject(state, showProject) {
      state.showProject = showProject;
    },
    updatetransferringMeg(state, transferringMeg) {
      state.transferringMeg = transferringMeg;
    },

  }
});
