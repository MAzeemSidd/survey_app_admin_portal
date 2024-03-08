import React, { Suspense } from 'react';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { Spin } from 'antd';
import Login from './components/Login';
const Projects  = React.lazy(()=>import('./components/projects/Projects'));
const DefaultLayout = React.lazy(() => import('./components/Layouts/DefaultLayout'));
const Homepage = React.lazy(() => import('./components/homepage/Homepage'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spin spinning={true}/>}>
        <Routes>
          <Route path="/" name="Login" element={<Login />} />
          <Route path="/home" name="Home" element={<DefaultLayout />} />
          <Route path="/projects" name="Project" element={<Projects />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

