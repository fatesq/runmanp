import React from 'react';
import { Icon, NavBar } from 'antd-mobile';

export default class YQ extends React.PureComponent {
  render() {
    return (
      <div style={{ width: '100%', textAlign: 'center' }} >
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => { window.location.hash = '/'; }}
        >跑男学院
        </NavBar>
        <img style={{ width: '100%', maxWidth: '750px', height: 'auto', margin: '0 auto' }} src="/2.jpg" alt="" />
      </div>
    );
  }
}
