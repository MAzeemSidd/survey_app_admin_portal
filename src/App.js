import React, { Suspense } from 'react';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { Spin } from 'antd';

function App() {

  const DefaultLayout = React.lazy(() => import('./components/Layouts/DefaultLayout'))

  return (
    <BrowserRouter>
      <Suspense fallback={<Spin spinning={true}/>}>
        <Routes>
          {/* <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} /> */}
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
