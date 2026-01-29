
import React, { useState } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { Login } from './views/Login';
import { AdminDashboard } from './views/AdminDashboard';
import { ResidentDashboard } from './views/ResidentDashboard';
import { Layout } from './components/Layout';
import { ToastContainer } from './components/Toast';

const DashboardRouter: React.FC = () => {
  const { user } = useAppContext();
  const [currentView, setView] = useState('dashboard');

  if (!user) return <Login />;

  const Content = user.role === 'ADMIN' 
    ? <AdminDashboard view={currentView} /> 
    : <ResidentDashboard view={currentView} />;

  return (
    <Layout currentView={currentView} setView={setView}>
      {Content}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <DashboardRouter />
      <ToastContainer />
    </AppProvider>
  );
};

export default App;
