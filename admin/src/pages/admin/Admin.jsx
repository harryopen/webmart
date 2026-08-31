import Addproduct from '../../component/addproduct/Addproduct';
import Listproduct from '../../component/listproduct/Listproduct';
import Sidebar from '../../component/sidebar/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <main className="admin-content">
        <Routes>
          <Route path="/" element={<Navigate to="/listproduct" replace />} />
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/listproduct" element={<Listproduct />} />
        </Routes>
      </main>
    </div>
  );
};

export default Admin;