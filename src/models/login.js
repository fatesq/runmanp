import { routerRedux } from 'dva/router';
import { login, sendMessage } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    id: localStorage.id || '10010-88888888',
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      if (response.obj) {
        yield put({
          type: 'changeOpenId',
          payload: response.obj,
        });
        localStorage.id = response.obj.id
        localStorage.depositStatus = response.obj.depositStatus
        localStorage.blackFlag = response.obj.blackFlag
        localStorage.amount = response.obj.amount
        localStorage.deposit = response.obj.deposit
        localStorage.phone = response.obj.phone
        localStorage.orderCount = response.obj.orderCount
        localStorage.star = response.obj.star
        localStorage.realName = response.obj.realName
        localStorage.alipayAccount = response.obj.alipayAccount
        localStorage.selectedTab = '3'
      }
      // Login successfully
      if (response.status === '00' && response.obj.phone) {
        reloadAuthorized();
        window.location.hash = '/home/deliver';
      }
      if (response.status !== '00') {
        Toast.fail('获取信息失败', 2);
        window.wx.closeWindow();
      }
      if (response.status === '00' && !response.obj.phone) {
        Toast.info('请先绑定手机号', 1);
      }
    },
    *message({ payload }, { call }) {
      console.log(payload);
      yield call(sendMessage, payload);
    },
  },

  reducers: {
    changeOpenId(state, { payload }) {
      setAuthority('user');
      return {
        ...state,
        openid: payload.wxAccount,
        id: payload.id,
      };
    },
  },
};
