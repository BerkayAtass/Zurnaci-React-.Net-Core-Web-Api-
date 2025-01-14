import React, { useContext } from 'react';
import Navbar from './component/Navbar/Navbar';
import Sidebar from './component/Sidebar/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import UsersList from './pages/UsersList/UsersList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddUser } from './pages/AddUser/AddUser';
import Login from './pages/Login/Login';
import { StoreContext } from './context/StoreContext';

const App = () => {
  const { auth } = useContext(StoreContext);

  return (
    <>
      <div>
        <ToastContainer />
        {auth ? (
          <>
            <Navbar />
            <hr />
            <div className="app-content">
              <Sidebar />
              <Routes>
                <Route path="/add" element={<Add />} />
                <Route path="/list" element={<List />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/addUser" element={<AddUser />} />
                <Route path="/users" element={<UsersList />} />

                <Route path="/" element={<Navigate to="/add" />} />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;
