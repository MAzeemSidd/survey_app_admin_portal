import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider, Spin } from 'antd';
import Login from './components/Login';
import SurveyAppColorTheme from './components/Layouts/SurveyAppColorTheme';

const DefaultLayout = React.lazy(() => import('./components/Layouts/DefaultLayout'));

function App() {
  return (
    <SurveyAppColorTheme>
      <BrowserRouter>
        <Suspense fallback={<Spin spinning={true}/>}>
          <Routes>
            <Route path="/" name="Login" element={<Login />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </SurveyAppColorTheme>
  );
}

export default App;

