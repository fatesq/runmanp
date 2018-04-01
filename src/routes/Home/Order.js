import React from 'react';
import { connect } from 'dva';
import { Tabs, Card, List, Button } from 'antd-mobile';


const { Item } = List;
const { Brief } = Item;
const status = [{ title: '全部' }, { title: '待接单' }, { title: '待取单' }, { title: '配送中' },
  { title: '已完成' }, { title: '已取消' }];

@connect(({ home, loading, login }) => ({
  home,
  userId: login.id,
  submitting: loading.effects['order/list'],
}))
export default class Get extends React.PureComponent {
  componentWillMount() {
    this.getList();
  }
  getList = (data, index) => {
    this.props.dispatch({
      type: 'home/order',
      payload: {
        riderId: this.props.userId,
        bean: 'order',
        method: 'pageOrder',
        page: 1,
        rows: 20,
        orderStatus: index ? index : '',
      },
    });
  }
  toInfo = (item) => {
    this.props.dispatch({
      type: 'home/info',
      payload: item,
    });
  }
  cancelOrder = (orderId) => {
    this.props.dispatch({
      type: 'home/cancel',
      payload: {
        riderId: this.props.userId,
        orderId,
      },
    });
    this.props.restart(1);
  }
  render() {
    console.log(this.props.home.order);
    return (
      <Tabs
        tabs={status}
        onChange={(tab, index) => this.getList(tab, index)}
      >
        <div style={{ height: '100%', backgroundColor: '#fff' }}>
          { this.props.home.order.map((item) => {
            return (
              <Card key={item.orderId}>
                <Card.Body>
                  <Item extra={`${status[item.orderStatus].title}`} align="top" multipleLine>
                    单号：<span style={{ fontSize: '12px' }}>{item.orderId}</span>
                    <Brief>
                      <div>地址：{item.receiverAddress}</div>
                      <div>收件人：{item.receiverName}</div>
                      <div>电话：{item.receiverPhone}</div>
                    </Brief>
                  </Item>
                  <Item extra={`合计 ${item.payPrice / 100}`}>{item.createTime}</Item>
                </Card.Body>
                <Card.Footer
                  extra={
                    <div>
                      <Button type="ghost" inline onClick={() => { this.toInfo(item); }} size="small" style={{ marginRight: '4px' }}>查看订单</Button>
                      <Button type="ghost" inline onClick={() => { this.cancelOrder(item.orderId); }} size="small" style={{ marginRight: '4px' }}>取消订单</Button>
                    </div>
                  }
                />
              </Card>
            );
          })}
        </div>
      </Tabs>
    );
  }
}
