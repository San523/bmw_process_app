import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'  /*登录页面*/
import ProcessReport from '@/pages/processReport'  /*审批概况*/
import ProcessManage from '@/pages/processManage'   /*审批管理*/
import Hello from '@/pages/Hello'                  /*测试页面*/
import UserCore from '@/pages/userCore'           /*个人中心页面*/
import ApplicationDetailsDMN from '@/pages/applicationDetailsDMN'  /*DMN申请详情页面*/
import ApplicationDetailsRFI from '@/pages/applicationDetailsRFI'  /*RFI申请详情页面*/
import WaitExamine from '@/pages/waitExamine'     /*待我审批详情页面*/
import ExamineEnsure from '@/pages/examineEnsure'  /*有身份审批确认页面*/ 
import ExamineRemark from '@/pages/examineRemark'  /*无身份审批确认页面*/
import Settings from '@/pages/settings'  /*设置页面*/
import ApprovalList from '@/pages/approvalList'  /*审批列表页面*/ 
import ApprovalTime from '@/pages/approvalTime'  /*审批时长页面*/
import Transferring from '@/pages/transferring'  /*转审页面*/
import ChooseUser from '@/pages/chooseUser'  /*选择人员页面*/
import Cropper from '@/pages/cropper'  /*截图页面*/


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Login',
      component: Login  /*主页面*/
    },{
      path: '/cc',
      name: 'processReport',
      component: ProcessReport  /*主页面*/
    },
    {
      path: '/processReport',
      name: 'ProcessReport',
      component: ProcessReport
    },
    {
      path: '/processManage',
      name: 'ProcessManage',
      component: ProcessManage
    },
    {
      path: '/userCore',
      name: 'UserCore',
      component: UserCore
    },
    {
      path: '/Hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/applicationDetailsDMN',
      name: 'ApplicationDetailsDMN',
      component: ApplicationDetailsDMN
    },
    {
      path: '/applicationDetailsRFI',
      name: 'ApplicationDetailsRFI',
      component: ApplicationDetailsRFI
    },
    {
      path: '/waitExamine',
      name: 'WaitExamine',
      component: WaitExamine
    },
    {
      path: '/examineEnsure',
      name: 'ExamineEnsure',
      component: ExamineEnsure
    },  {
      path: '/examineRemark',
      name: 'ExamineRemark',
      component: ExamineRemark
    },
    {
      path: '/approvalList',
      name: 'ApprovalList',
      component: ApprovalList
    },
    {
      path: '/approvalTime',
      name: 'ApprovalTime',
      component: ApprovalTime
    },
    {
      path: '/transferring',
      name: 'Transferring',
      component: Transferring
    },
    {
      path: '/chooseUser',
      name: 'ChooseUser',
      component: ChooseUser
    },
    {
      path: '/cropper',
      name: 'Cropper',
      component: Cropper
    }
  ]
})
