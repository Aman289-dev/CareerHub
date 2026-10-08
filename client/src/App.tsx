import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Homepage from './pages/Homepage';
import JobSearch from './pages/JobSearch';
import JobDetails from './pages/JobDetails';
import Companies from './pages/Companies';
import CompanyProfile from './pages/CompanyProfile';
import SavedJobs from './pages/SavedJobs';
import Applications from './pages/Applications';
import Profile from './pages/Profile';
import EmployerDashboard from './pages/EmployerDashboard';
import Auth from './pages/Auth';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{ duration: 3000 }}
        data-icod-id="src_app_tsx_8139" />
      <div
        className="min-h-screen bg-background text-foreground"
        data-icod-id="src_app_tsx_c44d">
        <Routes>
          {/* Auth page has no navbar */}
          <Route path="/auth" element={<Auth data-icod-id="src_app_tsx_d764" />} />

          {/* All other pages have the navbar */}
          <Route
            path="*"
            element={
              <>
                <Navbar data-icod-id="src_app_tsx_f1b9" />
                <main data-icod-id="src_app_tsx_8c3d">
                  <Routes>
                    <Route path="/" element={<Homepage data-icod-id="src_app_tsx_5ff1" />} />
                    <Route path="/jobs" element={<JobSearch data-icod-id="src_app_tsx_2c0f" />} />
                    <Route path="/jobs/:id" element={<JobDetails data-icod-id="src_app_tsx_477e" />} />
                    <Route path="/companies" element={<Companies data-icod-id="src_app_tsx_168e" />} />
                    <Route path="/companies/:id" element={<CompanyProfile data-icod-id="src_app_tsx_9ed4" />} />
                    <Route
                      path="/saved-jobs"
                      element={
                        <ProtectedRoute data-icod-id="src_app_tsx_69b5">
                          <SavedJobs data-icod-id="src_app_tsx_44a8" />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/applications"
                      element={
                        <ProtectedRoute role="candidate" data-icod-id="src_app_tsx_ecf6">
                          <Applications data-icod-id="src_app_tsx_43d9" />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute data-icod-id="src_app_tsx_74e8">
                          <Profile data-icod-id="src_app_tsx_f1ef" />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/employer-dashboard"
                      element={
                        <ProtectedRoute role="employer" data-icod-id="src_app_tsx_ee20">
                          <EmployerDashboard data-icod-id="src_app_tsx_3276" />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="*" element={<Homepage data-icod-id="src_app_tsx_b0c7" />} />
                  </Routes>
                </main>
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
