// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login/Login';
import AdminHome from './Modules/Admin/AdminHome';
import StaffHome from './Modules/Staff/StaffHome';
import RoomView from './Modules/User/Components/RoomView';
import EventView from './Modules/User/Components/EventsView';
import UserHome from './Modules/User/UserHome';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/StaffHome" element={<StaffHome/>} />
        <Route path="/UserHome" element={<UserHome />} />
        <Route path="/RoomView" element={<RoomView />} />
        <Route path="/EventView" element={<EventView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
