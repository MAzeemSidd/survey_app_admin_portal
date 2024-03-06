import React, { Suspense, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
  PieChartOutlined,
  ProductOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, Spin, theme } from 'antd';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import routes from '../../routes';

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const projects = [
  {key: '1', label: 'Project 1'},
  {key: '2', label: 'Project 2'},
  {key: '3', label: 'Project 3'},
]
const items = [
  {key: '', label: 'Home', icon: <HomeOutlined />},
  {key: '/projects', label: 'Projects', icon: <ProductOutlined />},
  {key: '/reports', label: 'Reports', icon: <DesktopOutlined />},
];
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed} /*onCollapse={(value) => setCollapsed(value)}*/>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={item=>{
          console.log('NAVBAR', item.key)
            /*if(item.keyPath.length === 1) */navigate(`${item.key}`)
            // else if(item.keyPath.length === 2) navigate(`${item.keyPath[1]}/${item.keyPath[0]}`, {state: {id: item.keyPath[0]}});
        }} />
      </Sider>
      <Layout>
        <Header style={{padding: 0, background: colorBgContainer}}>
          <Button type='text' size='large' onClick={()=>setCollapsed(prev=>!prev)}><UnorderedListOutlined style={{fontSize: 20}} /></Button>
        </Header>
        <Content style={{margin: '0 16px'}}>
          {/* <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG,}}>
            Bill is a cat.
          </div> */}
          <Suspense fallback={<Spin spinning={true}/>}>
            <Routes>
              {routes.map((route, idx) => {
                  return (
                    route.element && (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        element={<route.element />}
                        />
                    )
                  )
              })}
            </Routes>
          </Suspense>
        </Content>
        <Footer style={{textAlign: 'center'}}>
          {/* Ant Design ©{new Date().getFullYear()} Created by Ant UED */}
          Created by Virtuosoft
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;