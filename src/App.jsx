import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Pages
import { Home } from './pages/common/Home';
import { Login } from './pages/common/Login';
import { NotFound } from './pages/common/NotFound';
import { ProtectedRoute } from './components/ProtectedRoute';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { Players } from './pages/admin/Players';
import { Coaches } from './pages/admin/Coaches';
import { AssignPlayers } from './pages/admin/AssignPlayers';
import { LearningPathwayBuilder } from './pages/admin/LearningPathwayBuilder';
import { Rewards } from './pages/admin/Rewards';
import { RedeemHistory } from './pages/admin/RedeemHistory';
import { Analytics } from './pages/admin/Analytics';

// Coach Pages
import { CoachDashboard } from './pages/coach/CoachDashboard';
import { MyPlayers } from './pages/coach/MyPlayers';
import { StudentDetail } from './pages/coach/StudentDetail';
import { PlayerSessions } from './pages/coach/PlayerSessions';
import { StartSession } from './pages/coach/StartSession';
import { PastSessions } from './pages/coach/PastSessions';
import { CoachProfile } from './pages/coach/CoachProfile';
import { SessionCard } from './components/SessionCard';



function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/players" element={<ProtectedRoute requiredRole="admin"><Players /></ProtectedRoute>} />
        <Route path="/admin/coaches" element={<ProtectedRoute requiredRole="admin"><Coaches /></ProtectedRoute>} />
        <Route path="/admin/assign-players" element={<ProtectedRoute requiredRole="admin"><AssignPlayers /></ProtectedRoute>} />
        <Route path="/admin/learning-pathway" element={<ProtectedRoute requiredRole="admin"><LearningPathwayBuilder /></ProtectedRoute>} />
        <Route path="/admin/rewards" element={<ProtectedRoute requiredRole="admin"><Rewards /></ProtectedRoute>} />
        <Route path="/admin/redeem-history" element={<ProtectedRoute requiredRole="admin"><RedeemHistory /></ProtectedRoute>} />
        <Route path="/admin/analytics" element={<ProtectedRoute requiredRole="admin"><Analytics /></ProtectedRoute>} />

        {/* Coach Routes */}
        <Route path="/coach" element={<ProtectedRoute requiredRole="coach"><CoachDashboard /></ProtectedRoute>} />
        <Route path="/coach/players" element={<ProtectedRoute requiredRole="coach"><MyPlayers /></ProtectedRoute>} />
        <Route path="/coach/student/:playerId" element={<ProtectedRoute requiredRole="coach"><StudentDetail /></ProtectedRoute>} />
        <Route path="/coach/student/:playerId/sessions" element={<ProtectedRoute requiredRole="coach"><PlayerSessions /></ProtectedRoute>} />
        <Route path="/coach/start-session" element={<ProtectedRoute requiredRole="coach"><StartSession /></ProtectedRoute>} />
        <Route path="/coach/past-sessions" element={<ProtectedRoute requiredRole="coach"><PastSessions /></ProtectedRoute>} />
        <Route path="/coach/profile" element={<ProtectedRoute requiredRole="coach"><CoachProfile /></ProtectedRoute>} />
        <Route path="/session/:id" element={<ProtectedRoute requiredRole="coach"><SessionCard /></ProtectedRoute>} />

      

        {/* Redirects and Error */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
