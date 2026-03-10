import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';

// Public Pages
import PublicLayout from '@/components/public/PublicLayout';
import LandingPage from '@/pages/public/LandingPage';
import ServicesPage from '@/pages/public/ServicesPage';
import GoodMoralRequest from '@/pages/public/GoodMoralRequest';
import UniformExemptionRequest from '@/pages/public/UniformExemptionRequest';
import ChildAdmissionRequest from '@/pages/public/ChildAdmissionRequest';
import CrossDressingRequest from '@/pages/public/CrossDressingRequest';
import ComplaintForm from '@/pages/public/ComplaintForm';
import DisciplinaryRecords from '@/pages/public/DisciplinaryRecords';
import AboutPage from '@/pages/public/AboutPage';
import FAQsPage from '@/pages/public/FAQsPage';

// Admin Pages
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import EncodeViolation from '@/pages/admin/EncodeViolation';
import EncodeComplaint from '@/pages/admin/EncodeComplaint';
import ComposeAnnouncement from '@/pages/admin/ComposeAnnouncement';
import GMCRequestManagement from '@/pages/admin/GMCRequestManagement';
import ComplaintManagement from '@/pages/admin/ComplaintManagement';
import DisciplinaryRecordsManagement from '@/pages/admin/DisciplinaryRecordsManagement';
import UserManagement from '@/pages/admin/UserManagement';
import CertificateTemplates from '@/pages/admin/CertificateTemplates';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/good-moral" element={<GoodMoralRequest />} />
              <Route path="/services/uniform-exemption" element={<UniformExemptionRequest />} />
              <Route path="/services/child-admission" element={<ChildAdmissionRequest />} />
              <Route path="/services/cross-dressing" element={<CrossDressingRequest />} />
              <Route path="/complaint" element={<ComplaintForm />} />
              <Route path="/disciplinary-records" element={<DisciplinaryRecords />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faqs" element={<FAQsPage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/encode-violation" element={<EncodeViolation />} />
              <Route path="/admin/encode-complaint" element={<EncodeComplaint />} />
              <Route path="/admin/compose-announcement" element={<ComposeAnnouncement />} />
              <Route path="/admin/gmc-requests" element={<GMCRequestManagement />} />
              <Route path="/admin/complaints" element={<ComplaintManagement />} />
              <Route path="/admin/disciplinary-records" element={<DisciplinaryRecordsManagement />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/certificate-templates" element={<CertificateTemplates />} />
            </Route>

            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
