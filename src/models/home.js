import { getOrder, receiveOrder, cancelOrder, process } from '../services/api';

export default {
  namespace: 'home',

  state: {
    collapsed: false,
    list: [],
    order: [],
    info: '',
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
    *cancel({ payload }, { call, put }) {
      const data = yield call(cancelOrder, payload);
      if (data.status != '00') {
        alert(data.msg);
      }
    },
    *order({ payload }, { call, put }) {
      const response = yield call(process, payload);
      yield put({
        type: 'saveOrder',
        payload: response.rows,
      });
    },
    *info({ payload }, { call, put }) {
      yield put({
        type: 'saveInfo',
        payload,
      });
      window.location.hash = '/orderInfo'
    },
  },

  reducers: {
    saveInfo(state, { payload }) {
      return {
        ...state,
        info: payload,
      };
    },
    saveList(state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
    saveOrder(state, { payload }) {
      return {
        ...state,
        order: payload,
      };
    },
  },
};
