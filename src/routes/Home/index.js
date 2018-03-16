import React from 'react';
import { Icon } from 'antd';
import { NavBar, Tabs, Card, List, Button } from 'antd-mobile';

const { Item } = List;
const { Brief } = Item;
const tabs = [
  { title: '全部订单', sub: '1' },
  { title: '离我最近', sub: '2' },
];

export default class GetOrder extends React.PureComponent {
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
            <List renderHeader={() => '帮我送'} style={{ marginBottom: 8, background: '#FFF' }}>
              <Card full>
                <Card.Header
                  title={
                    <div>
                      <div style={{ fontSize: 14 }}>从: 奥体</div>
                      <div style={{ fontSize: 14 }}>到: 莲花</div>
                    </div>
                  }
                />
                <Card.Body>
                  <div style={{ fontSize: 12, marginBottom: 3 }}>注:</div>
                  <div>￥35</div>
                </Card.Body>
                <Card.Footer
                  style={{ alignItems: 'center', display: 'flex' }}
                  content="立即送达"
                  extra={<Button type="ghost" size="small">接单</Button>}
                />
              </Card>
            </List>
            <List renderHeader={() => '帮我送'} style={{ marginBottom: 8, background: '#FFF' }}>
              <Card full>
                <Card.Header
                  title={
                    <div>
                      <div style={{ fontSize: 14 }}>从: 奥体</div>
                      <div style={{ fontSize: 14 }}>到: 莲花</div>
                    </div>
                  }
                />
                <Card.Body>
                  <div style={{ fontSize: 12, marginBottom: 3 }}>注:</div>
                  <div>￥35</div>
                </Card.Body>
                <Card.Footer
                  style={{ alignItems: 'center', display: 'flex' }}
                  content="立即送达"
                  extra={<Button type="ghost" size="small">接单</Button>}
                />
              </Card>
            </List>
            <List renderHeader={() => '帮我送'} style={{ marginBottom: 8, background: '#FFF' }}>
              <Card full>
                <Card.Header
                  title={
                    <div>
                      <div style={{ fontSize: 14 }}>从: 奥体</div>
                      <div style={{ fontSize: 14 }}>到: 莲花</div>
                    </div>
                  }
                />
                <Card.Body>
                  <div style={{ fontSize: 12, marginBottom: 3 }}>注:</div>
                  <div>￥35</div>
                </Card.Body>
                <Card.Footer
                  style={{ alignItems: 'center', display: 'flex' }}
                  content="立即送达"
                  extra={<Button type="ghost" size="small">接单</Button>}
                />
              </Card>
            </List>
          </div>
          <div style={{ height: '100%', backgroundColor: '#fff' }}>
            Content of second tab
          </div>
        </Tabs>
      </div>
    );
  }
}
