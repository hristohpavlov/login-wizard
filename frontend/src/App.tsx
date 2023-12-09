import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SuccessVerificationPage from './pages/SuccessVerificationPage';
import LoginPage from './pages/LoginPage';
import Layout from './layout/Layout';
import VerificationCardComponent from './components/VerificationPageComponent';
import { AuthContext } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import TablePage from './pages/TablePage';
function App() {
  return (
    <AuthContext>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" Component={LandingPage} />
          <Route path="/mobile-email" Component={LoginPage} />
          <Route path="/verify-mobile" element={<VerificationCardComponent type="mobile" navigateToUrl="/verify-email" label="Send verification code on email" number={'+1 999-999-999'} email={'youremail@emaildomain.com'}/>} />
          <Route path="/verify-email" element={<VerificationCardComponent type="email" navigateToUrl="/verify-mobile" label="Send verification code on mobile no." number={'+1 999-999-999'} email={'youremail@emaildomain.com'}/>} />
          <Route path="/verification-success" element={<ProtectedRoute><SuccessVerificationPage/></ProtectedRoute>} />
          <Route path="/table" element={<ProtectedRoute><TablePage/></ProtectedRoute>} />
        </Routes>
      </Layout>
    </Router>
    </AuthContext>
  );
}

export default App;
