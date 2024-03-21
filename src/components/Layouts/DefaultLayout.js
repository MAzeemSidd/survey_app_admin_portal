import React, { Suspense, useState } from 'react';
import {
  ContactsOutlined,
  HomeOutlined,
  LogoutOutlined,
  PieChartOutlined,
  ProductOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Breadcrumb, Button, Dropdown, Layout, Menu, Spin, theme } from 'antd';
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

const items = [
  {key: '/home', label: 'Home', icon: <HomeOutlined />},
  {key: '/clients', label: 'Clients', icon: <ProductOutlined />},
  {key: '/responses', label: 'Responses', icon: <ContactsOutlined />},
  {key: '/reports', label: 'Reports', icon: <PieChartOutlined />},
];


const DefaultLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    console.log('log out...');
    localStorage.removeItem("jwtToken");
    navigate('/', { replace: true })
  };
  
  return (<>
    {
      localStorage.getItem("jwtToken") ?
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="inline"
            onClick={(item) => {
              console.log('NAVBAR', item.key);
              navigate(`${item.key}`);
            }}
          >
            {items.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 10, background: colorBgContainer, display:'flex', justifyContent:"space-between" }}>
            <Button
              type="text"
              size="large"
              onClick={() => setCollapsed((prev) => !prev)}
            >
              <UnorderedListOutlined style={{ fontSize: 20 }} />
            </Button>
            <Dropdown /*overlay={menu}*/ placement="bottomRight" arrow trigger={['click']}
              menu={{
                items: [
                  {
                    id: 1,
                    label: 
                      (<a target="_blank" onClick={e=>{e.stopPropagation(); handleLogout();}}>
                        <LogoutOutlined style={{size: 10, marginRight: 5}} />
                        Logout
                      </a>),
                  }
                ]
              }}
            >
              <Button type="text" size="large">
                <Avatar
                  style={{
                    backgroundColor: '#aaa',
                  }}
                  icon={<UserOutlined />}
                  size="small"
                />
              </Button>
            </Dropdown>
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
                {routes.map((route, idx) => (
                  route.element && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      element={<route.element />}
                    />
                  )
                ))}
              </Routes>
            </Suspense>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Created by Virtuosoft
          </Footer>
        </Layout>
      </Layout>
      :
      <Navigate to='/' />
    }
  </>);
};

export default DefaultLayout;

// export default App;