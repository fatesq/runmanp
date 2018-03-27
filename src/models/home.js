import { getOrder } from '../services/api';

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
        payload: data,
      });
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
