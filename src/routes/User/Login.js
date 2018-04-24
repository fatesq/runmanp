import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Checkbox, Alert, Icon } from 'antd';
import Login from '../../components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'mobile',
    autoLogin: true,
    pageType: true,
  }

  onTabChange = (type) => {
    this.setState({ type });
  }

  onGetCaptcha = (form) => {
    form.validateFields(['mobile'], (err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'login/message',
          payload: {
            phone: values.mobile,
          },
        });
      }
    });
  }

  handlePageType = () => {
    this.setState({ pageType: !this.state.pageType });
  }

  handleSubmit = (err, values) => {
    const u = navigator.userAgent;
    const app = navigator.appVersion;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // g
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    console.log(isAndroid, isIOS, app);
    if (isAndroid) {
      // 这个是安卓操作系统
      window.android.getUserInfo()
    }
    if (isIOS && window.iOSNative) {
      // 这个是ios操作系统
      const info = iOSNative.getUserInfo();
    }
    const { type } = this.state;
    console.log(values);
    const info = {
      checkCode: values.captcha,
      phone: values.mobile,
      city: '南京' || info.city,
    };
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...info,
          // type,
        },
      });
    }
  }

  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  }

  renderMessage = (content) => {
    return (
      <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );
  }

  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
        >
          {
            login.status === 'error' &&
            login.type === 'mobile' &&
            !login.submitting &&
            this.renderMessage('验证码错误')
          }
          <Mobile name="mobile" />
          <Captcha name="captcha" onGetCaptcha={this.onGetCaptcha} />
          <Submit loading={submitting}>{this.state.pageType ? '登录' : '注册'}</Submit>
          <div style={{ textAlign: 'center' }}>
            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>
              <a>同意服务条款</a>
            </Checkbox>
            <div className={styles.other} style={{ textAlign: 'center' }}>
              {
                this.state.pageType
                ?
                  <span>没有账号?<a onClick={this.handlePageType}>去注册</a></span>
                :
                  <span>注册过?<a onClick={this.handlePageType}>点击登陆</a></span>
              }
            </div>
          </div>
        </Login>
      </div>
    );
  }
}
