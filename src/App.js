import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './screens/header';
import Dashboard from './screens/dashboard';
import ShowTableLeads from './screens/Leads/ShowTableLeads';
import AddLeads from './screens/Leads/AddLeads';
import EditLeads from './screens/Leads/EditLead';
import LoginScreen from './screens/auth/login';
import { AuthProvider, ProtectRoute } from './screens/auth/context';
import AddTask from './screens/task/AddTask';
import ShowTableTask from './screens/task/ShowTask';
import EditTask from './screens/task/EditTask';
import ShowTableUser from './screens/users/ShowUser';
import EditUser from './screens/users/EditUser';
import AddUser from './screens/users/AddUser';
import UploadScreen from './screens/upload/upload';
import ShowLogs from './screens/logs/Showlogs';
import NotExistsScreen from './NotExistsScreen';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/login' element={<LoginScreen />} />
            {/* Protected routes */}
            <Route
              path='/'
              element={
                <ProtectRoute>
                  <Header heading="Dashboard">
                    <Dashboard />
                  </Header>
                </ProtectRoute>
              }
            />
            <Route
              path='/leads'
              element={
                <ProtectRoute>
                  <Header heading="Leads">
                    <ShowTableLeads />
                  </Header>
                </ProtectRoute>
              }
            />
            <Route
              path='/addlead'
              element={
                <ProtectRoute>
                  <Header heading="Add Lead">
                    <AddLeads />
                  </Header>
                </ProtectRoute>
              }
            />
            <Route
              path='/editlead'
              element={
                <ProtectRoute>
                  <Header heading="Edit Lead">
                    <EditLeads />
                  </Header>
                </ProtectRoute>
              }
            />
            <Route
              path='/addtask'
              element={
                <ProtectRoute>
                  <Header heading="Add Task">
                    <AddTask />
                  </Header>
                </ProtectRoute>
              }
            />
            <Route
              path='/tasks'
              element={
                <ProtectRoute>
                  <Header heading="Tasks">
                    <ShowTableTask />
                  </Header>
                </ProtectRoute>
              }
            />
            <Route
              path='/edittask'
              element={
                <ProtectRoute>
                  <Header heading="Edit Task">
                    <EditTask />
                  </Header>
                </ProtectRoute>
              }
            />
            <Route
              path='/users'
              element={
                <ProtectRoute>
                  <Header heading="Show User">
                    <ShowTableUser />
                  </Header>
                </ProtectRoute>
              }
            />
            <Route
              path='/edituser'
              element={
                <ProtectRoute>
                  <Header heading="Edit User">
                    <EditUser />
                  </Header>
                </ProtectRoute>
              }
            />
            <Route
              path='/adduser'
              element={
                <ProtectRoute>
                  <Header heading="Add User">
                    <AddUser />
                  </Header>
                </ProtectRoute>
              }
            />
            <Route
              path='/upload'
              element={
                <ProtectRoute>
                  <Header heading="Upload Data">
                    <UploadScreen />
                  </Header>
                </ProtectRoute>
              }
            />
            <Route
              path='/logs'
              element={
                <ProtectRoute>
                  <Header heading="Users Logs">
                    <ShowLogs />
                  </Header>
                </ProtectRoute>
              }
            />
            <Route
              path='*'
              element={
                    <NotExistsScreen />
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
