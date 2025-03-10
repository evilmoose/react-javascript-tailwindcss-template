import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Profile from './pages/Profile';
import NormalFooter from './components/common/NormalFooter';
import SimpleFooter from './components/common/SimpleFooter';
import AdminRoute from './components/admin/AdminRoute';

// Wrapper component to conditionally render different layouts
const AppContent = () => {
  const location = useLocation();
  const path = location.pathname;

  // Pages that should have normal scrolling and full footer
  const normalScrollPages = ['/', '/solutions', '/pricing'];
  const shouldUseNormalScroll = normalScrollPages.includes(path);
  
  return (
    <div className={shouldUseNormalScroll ? "" : "flex flex-col h-screen overflow-hidden"}>
      <Navbar />
      <main className={shouldUseNormalScroll ? "" : "flex-grow overflow-hidden"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {shouldUseNormalScroll ? <NormalFooter /> : <SimpleFooter />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
