import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { NavBar, Tabs, Card, List, Button, Modal} from 'antd-mobile';

const { Item } = List;
const { Brief } = Item;
const tabs = [
  { title: '全部订单', sub: '1' },
  { title: '离我最近', sub: '2' },
];

@connect(({ home, login}) => ({ home, login}))
export default class GetOrder extends React.PureComponent {
  state ={
    city: '',
  }
  componentDidMount() {
   this.props.restart(1);
   this.getOrder()
   this.interval = setInterval(() => this.getOrder(), 15000);  
  }

  componentWillUnmount() {  
    clearInterval(this.interval);  
  }  

  getOrder = () => {
    const u = navigator.userAgent;
    const app = navigator.appVersion;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // g
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    console.log(isAndroid, isIOS, app);
    if (isAndroid) {
      // 这个是安卓操作系统
      const info = window.android.getUserInfo();
      this.setState({city: info.city || ''});
      this.props.dispatch({
        type: 'home/list',
        payload: {
          diu: info.diu || '24416E26-9265-4557-B7A1-28B64AE2CD86',
          locations: info.locations || '118.783132,32.038221,1522153588',
        },
      });
    }
    if (isIOS) {
      // 这个是ios操作系统
      window.onload = function(){
        const info = Native.getUserInfo();
        this.setState({city: info.city || ''});
        this.props.dispatch({
          type: 'home/list',
          payload: {
            diu: info.diu || '24416E26-9265-4557-B7A1-28B64AE2CD86',
            locations: info.locations || '118.783132,32.038221,1522153588',
          },
        });
      }
    } else {
      this.setState({city: '南京'});
      this.props.dispatch({
        type: 'home/list',
        payload: {
          diu: '24416E26-9265-4557-B7A1-28B64AE2CD86',
          locations: '118.804875,32.011594,1522417977',
        },
      });
    }
  }

  sendOrder = (item) => {
    if(localStorage.depositStatus == 2) {
      this.setState({show: true})
      return;
    }
    this.props.dispatch({
      type: 'home/info',
      payload: item,
    }).then(()=>  this.props.restart(2))
    
  }
  render() {
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={
            <Icon type="bell" onClick={this.getOrder} style={{ fontSize: 22 }} />
          }
        >{this.state.city}
        </NavBar>
        <Tabs
          tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div style={{ height: '100%' }}>
            { this.props.home.list.map((item) => {
              return (
                <List key={item.orderId} renderHeader={() => '帮我送'} style={{ marginBottom: 8, background: '#FFF' }}>
                  <Card full>
                    <Card.Header
                      title={
                        <div>
                          <div>从: {item.sendStreet}</div>
                          <div>到: {item.receiverStreet}</div>
                        </div>
                      }
                    />
                    <Card.Body>
                      <div>注:</div>
                      <div>￥{item.payPrice/100}</div>
                    </Card.Body>
                    <Card.Footer
                      style={{ alignItems: 'center', display: 'flex' }}
                      content={item.departureTime}
                      extra={<Button type="ghost" onClick={()=> {this.sendOrder(item)}} size="small">接单</Button>}
                    />
                  </Card>
                </List>
              );
            })}
          </div>
          <div style={{ height: '100%', backgroundColor: '#fff' }}>
            
          </div>
        </Tabs>
        <Modal
          visible={this.state.show}
          transparent
          maskClosable={false}
          title={<p>需要缴纳<span style={{color:"#108ee9"}}>300元</span>押金方可抢单</p>}
          footer={[{ text: '立即缴纳', onPress: () => { window.location.hash = '/yajin' } }]}
        >
          累计接单满500单可随时申请提取现金
        </Modal>
      </div>
    );
  }
}
