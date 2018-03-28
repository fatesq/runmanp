import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { NavBar, Tabs, Card, List, Button } from 'antd-mobile';

const { Item } = List;
const { Brief } = Item;
const tabs = [
  { title: '全部订单', sub: '1' },
  { title: '离我最近', sub: '2' },
];

@connect(({ home }) => ({ home }))
export default class GetOrder extends React.PureComponent {
  componentDidMount() {
    const u = navigator.userAgent;
    const app = navigator.appVersion;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // g
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    console.log(isAndroid, isIOS, app);
    if (isAndroid) {
      // 这个是安卓操作系统
    }
    if (isIOS && window.iOSNative) {
      // 这个是ios操作系统
      const info = iOSNative.getUserInfo();
      console.log(info);
      alert(info);
      this.props.dispatch({
        type: 'home/list',
        payload: {
          diu: '24416E26-9265-4557-B7A1-28B64AE2CD86',
          locations: '118.783132,32.038221,1522153588',
        },
      });
    } else {
      this.props.dispatch({
        type: 'home/list',
        payload: {
          diu: '24416E26-9265-4557-B7A1-28B64AE2CD86',
          locations: '118.783132,32.038221,1522153588',
        },
      });
    }
  }
  render() {
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={
            <Icon type="bell" style={{ fontSize: 22 }} />
          }
        >南京市
        </NavBar>
        <Tabs
          tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div style={{ height: '100%' }}>
            { this.props.home.list.map(() => {
              return (
                <List renderHeader={() => '帮我送'} style={{ marginBottom: 8, background: '#FFF' }}>
                  <Card full>
                    <Card.Header
                      title={
                        <div>
                          <div>从: 奥体</div>
                          <div>到: 莲花</div>
                        </div>
                      }
                    />
                    <Card.Body>
                      <div>注:</div>
                      <div>￥35</div>
                    </Card.Body>
                    <Card.Footer
                      style={{ alignItems: 'center', display: 'flex' }}
                      content="立即送达"
                      extra={<Button type="ghost" size="small">接单</Button>}
                    />
                  </Card>
                </List>
              );
            })}
          </div>
          <div style={{ height: '100%', backgroundColor: '#fff' }}>
            Content of second tab
          </div>
        </Tabs>
      </div>
    );
  }
}
