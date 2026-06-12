import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import CreatePetPage from './pages/CreatePetPage';
import CheckinPage from './pages/CheckinPage';
import CardGalleryPage from './pages/CardGalleryPage';
import DrawPage from './pages/DrawPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminCheckinPage from './pages/admin/AdminCheckinPage';
import AdminItemsPage from './pages/admin/AdminItemsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-pet" element={<CreatePetPage />} />
          <Route path="/checkin" element={<CheckinPage />} />
          <Route path="/cards" element={<CardGalleryPage />} />
          <Route path="/draw" element={<DrawPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/checkin" replace />} />
            <Route path="checkin" element={<AdminCheckinPage />} />
            <Route path="items" element={<AdminItemsPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
