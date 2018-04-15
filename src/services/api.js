import { stringify } from 'qs';
import request from '../utils/request';

export async function login(params) {
  return request('/api/rider/login', {
    method: 'POST',
    data: params,
  });
}

export async function sendMessage(params) {
  return request('/api/rider/sendCheckCode', {
    method: 'POST',
    data: params,
  });
}

export async function getOrder(params) {
  return request('/api/rail/railMonitor', {
    method: 'POST',
    data: params,
  });
}

export async function receiveOrder(params) {
  return request('/api/order/receiveOrder', {
    method: 'POST',
    data: params,
  });
}

export async function cancelOrder(params) {
  return request('/api/order/riderCancelOrder', {
    method: 'POST',
    data: params,
  });
}


export async function process(params) {
  return request('/api/process', {
    method: 'GET',
    data: params,
  });
}


export async function modifyRider(params) {
  return request('/api/rider/modifyRider', {
    method: 'POST',
    data: params,
  });
}

export async function alipayWithdraw(params) {
  return request('/api/rider/alipayWithdraw', {
    method: 'POST',
    data: params,
  });
}
export async function wxpayWithdraw(params) {
  return request('/api/rider/wxpayWithdraw', {
    method: 'POST',
    data: params,
  });
}

export async function alipayDeposit(params) {
  return request('/api/rider/alipayDeposit', {
    method: 'POST',
    data: params,
  });
}
export async function wxpayDeposit(params) {
  return request('/api/rider/wxpayDeposit', {
    method: 'POST',
    data: params,
  });
}


export async function alipayRefundDeposit(params) {
  return request('/api/rider/alipayRefundDeposit', {
    method: 'POST',
    data: params,
  });
}
export async function wxpayRefundDeposit(params) {
  return request('/api/rider/wxpayRefundDeposit', {
    method: 'POST',
    data: params,
  });
}


export async function getConfig(params) {
  return request('api/config/getConfig', {
    method: 'POST',
    data: params,
  });
}

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/frontUser/add', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}


export async function addCooperation(params) {
  return request('/api/partner/addCooperation', {
    method: 'POST',
    data: params,
  });
}


export async function getTodayData(params) {
  return request('/api/rider/getTodayData', {
    method: 'POST',
    data: params,
  });
}
