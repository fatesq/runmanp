import { getOrder, receiveOrder } from '../services/api';

export default {
  namespace: 'home',

  state: {
    collapsed: false,
    list: [],
  },

  effects: {
    *list({ payload }, { call, put }) {
      const data = yield call(getOrder, payload);
      yield put({
        type: 'saveList',
        payload: data.data,
      });
    },
    *receive({ payload }, { call, put }) {
      const data = yield call(receiveOrder, payload);
      if (data.status != '00') {
        alert(data.msg);
      }
    },
  },

  reducers: {
    saveList(state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
  },
};
