import { create } from 'zustand';
import playersData from '../data/players.json';
import coachesData from '../data/coaches.json';
import learningPathwayData from '../data/learningPathway.json';
import sessionHistoryData from '../data/sessionHistory.json';
import sessionDraftData from '../data/sessionDraft.json';
import rewardsData from '../data/rewards.json';
import redeemHistoryData from '../data/redeemHistory.json';

// Mock user for authentication
const mockUsers = [
  { id: 'admin1', username: 'admin', password: 'admin', role: 'admin' },
  { id: 'c1', username: 'coach', password: 'coach', role: 'coach' },
  { id: 'p1', username: 'player', password: 'player', role: 'player' },
];

// Helper function to get persisted auth from localStorage
const getPersistedAuth = () => {
  try {
    const stored = localStorage.getItem('coachlife_auth');
    if (stored) {
      const auth = JSON.parse(stored);
      // Verify user still exists in mock data
      const userExists = mockUsers.find(u => u.id === auth.currentUser?.id);
      return userExists ? auth : { currentUser: null, isAuthenticated: false };
    }
  } catch (error) {
    console.error('Error reading auth from localStorage:', error);
  }
  return { currentUser: null, isAuthenticated: false };
};

const initialAuth = getPersistedAuth();

export const useStore = create((set, get) => ({
  // Auth state
  currentUser: initialAuth.currentUser,
  isAuthenticated: initialAuth.isAuthenticated,

  // Data state
  players: playersData.length > 0 ? playersData : [
    { playerId: 'p1', name: 'John Smith', email: 'john@example.com', level: 2, stage: 3, totalPoints: 250, primaryCoach: 'c1', progress: 65 },
    { playerId: 'p2', name: 'Alex Johnson', email: 'alex@example.com', level: 3, stage: 2, totalPoints: 380, primaryCoach: 'c1', progress: 72 },
    { playerId: 'p3', name: 'Jordan Lee', email: 'jordan@example.com', level: 1, stage: 1, totalPoints: 120, primaryCoach: 'c1', progress: 45 },
    { playerId: 'p4', name: 'Emma Davis', email: 'emma@example.com', level: 4, stage: 4, totalPoints: 520, primaryCoach: 'c1', progress: 88 },
  ],
  coaches: coachesData,
  learningPathway: learningPathwayData,
  sessionHistory: [
    ...sessionHistoryData,
    // Dummy sessions for demo
    { sessionId: 's100', playerId: 'p1', coachId: 'c1', studentName: 'John Smith', coachName: 'Coach', sessionDate: '2024-12-05', status: 'draft', rating: 0, defaultPoints: 30, bonusPoints: 0, activities: [{id: 1, activityName: 'Speed Training', programs: ['speed'], defaultPoints: 15}, {id: 2, activityName: 'Strength Work', programs: ['strength'], defaultPoints: 15}], feedback: '', interested: false, repeat: false, onTime: false },
    { sessionId: 's101', playerId: 'p1', coachId: 'c1', studentName: 'John Smith', coachName: 'Coach', sessionDate: '2024-12-01', status: 'submitted', rating: 4, defaultPoints: 25, bonusPoints: 5, activities: [{id: 1, activityName: 'Agility Drills', programs: ['agility'], defaultPoints: 25}], feedback: 'Great improvement!', interested: true, repeat: true, onTime: true },
    { sessionId: 's102', playerId: 'p2', coachId: 'c1', studentName: 'Alex Johnson', coachName: 'Coach', sessionDate: '2024-12-04', status: 'draft', rating: 0, defaultPoints: 35, bonusPoints: 0, activities: [{id: 1, activityName: 'Technical Skills', programs: ['technique'], defaultPoints: 20}, {id: 2, activityName: 'Endurance', programs: ['endurance'], defaultPoints: 15}], feedback: '', interested: false, repeat: false, onTime: false },
    { sessionId: 's103', playerId: 'p2', coachId: 'c1', studentName: 'Alex Johnson', coachName: 'Coach', sessionDate: '2024-11-28', status: 'submitted', rating: 5, defaultPoints: 40, bonusPoints: 10, activities: [{id: 1, activityName: 'Speed Training', programs: ['speed'], defaultPoints: 20}, {id: 2, activityName: 'Strength Work', programs: ['strength'], defaultPoints: 20}], feedback: 'Excellent performance!', interested: true, repeat: false, onTime: true },
    { sessionId: 's104', playerId: 'p3', coachId: 'c1', studentName: 'Jordan Lee', coachName: 'Coach', sessionDate: '2024-12-03', status: 'draft', rating: 0, defaultPoints: 20, bonusPoints: 0, activities: [{id: 1, activityName: 'Speed Training', programs: ['speed'], defaultPoints: 20}], feedback: '', interested: false, repeat: false, onTime: false },
    { sessionId: 's105', playerId: 'p4', coachId: 'c1', studentName: 'Emma Davis', coachName: 'Coach', sessionDate: '2024-12-02', status: 'submitted', rating: 5, defaultPoints: 45, bonusPoints: 15, activities: [{id: 1, activityName: 'Strength Work', programs: ['strength'], defaultPoints: 20}, {id: 2, activityName: 'Endurance', programs: ['endurance'], defaultPoints: 15}, {id: 3, activityName: 'Technical Skills', programs: ['technique'], defaultPoints: 10}], feedback: 'Outstanding work!', interested: true, repeat: false, onTime: true },
  ],
  sessionDrafts: sessionDraftData,
  rewards: rewardsData,
  redeemHistory: redeemHistoryData,

  // Auth actions
  login: (username, password) => {
    const user = mockUsers.find(u => u.username === username && u.password === password);
    if (user) {
      set({
        currentUser: user,
        isAuthenticated: true,
      });
      // Persist to localStorage
      localStorage.setItem('coachlife_auth', JSON.stringify({
        currentUser: user,
        isAuthenticated: true,
      }));
      return { success: true, user };
    }
    return { success: false, error: 'Invalid credentials' };
  },

  logout: () => {
    set({
      currentUser: null,
      isAuthenticated: false,
    });
    // Clear from localStorage
    localStorage.removeItem('coachlife_auth');
  },

  // Player actions
  addPlayer: (player) => {
    set((state) => ({
      players: [...state.players, { ...player, playerId: `p${state.players.length + 1}` }],
    }));
  },

  updatePlayer: (playerId, updatedData) => {
    set((state) => ({
      players: state.players.map(p => p.playerId === playerId ? { ...p, ...updatedData } : p),
    }));
  },

  deletePlayer: (playerId) => {
    set((state) => ({
      players: state.players.filter(p => p.playerId !== playerId),
    }));
  },

  getPlayerById: (playerId) => {
    return get().players.find(p => p.playerId === playerId);
  },

  getCoachById: (coachId) => {
    return get().coaches.find(c => c.coachId === coachId);
  },

  // Coach actions
  addCoach: (coach) => {
    set((state) => ({
      coaches: [...state.coaches, { ...coach, coachId: `c${state.coaches.length + 1}` }],
    }));
  },

  updateCoach: (coachId, updatedData) => {
    set((state) => ({
      coaches: state.coaches.map(c => c.coachId === coachId ? { ...c, ...updatedData } : c),
    }));
  },

  deleteCoach: (coachId) => {
    set((state) => ({
      coaches: state.coaches.filter(c => c.coachId !== coachId),
    }));
  },

  assignPlayerToCoach: (playerId, coachId) => {
    set((state) => ({
      players: state.players.map(p =>
        p.playerId === playerId ? { ...p, primaryCoach: coachId } : p
      ),
      coaches: state.coaches.map(c =>
        c.coachId === coachId && !c.assignedPlayers.includes(playerId)
          ? { ...c, assignedPlayers: [...c.assignedPlayers, playerId] }
          : c
      ),
    }));
  },

  // Session actions
  createSessionDraft: (draft) => {
    set((state) => ({
      sessionDrafts: [...state.sessionDrafts, draft],
    }));
  },

  updateSessionDraft: (sessionId, updatedData) => {
    set((state) => ({
      sessionDrafts: state.sessionDrafts.map(s =>
        s.sessionId === sessionId ? { ...s, ...updatedData } : s
      ),
    }));
  },

  completeSession: (sessionDraft) => {
    const completed = {
      ...sessionDraft,
      status: 'completed',
      date: new Date().toISOString().split('T')[0],
    };
    set((state) => ({
      sessionHistory: [...state.sessionHistory, completed],
      sessionDrafts: state.sessionDrafts.filter(s => s.sessionId !== sessionDraft.sessionId),
    }));
  },

  getSessionsByStudent: (studentId) => {
    return get().sessionHistory.filter(s => s.studentId === studentId);
  },

  getCoachSessions: (coachId) => {
    return get().sessionHistory.filter(s => s.coachId === coachId);
  },

  getCoachDrafts: (coachId) => {
    return get().sessionDrafts.filter(s => s.coachId === coachId);
  },

  // Reward actions
  redeemReward: (playerId, rewardId) => {
    const reward = get().rewards.find(r => r.rewardId === rewardId);
    if (reward) {
      const redeem = {
        redeemId: `rd${get().redeemHistory.length + 1}`,
        playerId,
        rewardId,
        rewardName: reward.name,
        pointsUsed: reward.pointsRequired,
        date: new Date().toISOString().split('T')[0],
        status: 'completed',
      };
      set((state) => ({
        redeemHistory: [...state.redeemHistory, redeem],
      }));
    }
  },

  getPlayerRedeemHistory: (playerId) => {
    return get().redeemHistory.filter(r => r.playerId === playerId);
  },

  // Session Card actions - Create new sessions
  createSession: (playerId, coachId, sessionData) => {
    const newSession = {
      sessionId: `s${Date.now()}`,
      playerId,
      coachId,
      studentName: get().getPlayerById(playerId)?.name || 'Student',
      coachName: get().getCoachById(coachId)?.name || 'Coach',
      sessionDate: new Date().toISOString().split('T')[0],
      status: 'draft',
      rating: 0,
      pointsEarned: 0,
      activities: sessionData?.activities || [],
      feedback: sessionData?.feedback || '',
      defaultPoints: sessionData?.defaultPoints || 0,
      bonusPoints: sessionData?.bonusPoints || 0,
      interested: sessionData?.interested || false,
      repeat: sessionData?.repeat || false,
      onTime: sessionData?.onTime || false,
      ...sessionData,
    };
    
    set((state) => ({
      sessionHistory: [...state.sessionHistory, newSession],
    }));
    
    return newSession;
  },

  // Get sessions for a specific player
  getPlayerSessions: (playerId) => {
    return get().sessionHistory.filter(s => s.playerId === playerId);
  },

  // Get sessions for coach's players only
  getCoachplayersessions: (coachId) => {
    const coachplayers = get().players.filter(p => p.primaryCoach === coachId);
    const studentIds = coachplayers.map(s => s.playerId);
    return get().sessionHistory.filter(s => studentIds.includes(s.playerId));
  },

  // Update session
  updateSession: (sessionId, updatedData) => {
    set((state) => ({
      sessionHistory: state.sessionHistory.map(s => 
        s.sessionId === sessionId ? { ...s, ...updatedData } : s
      ),
    }));
  },

  // Submit session (change status from draft to submitted)
  submitSession: (sessionId) => {
    set((state) => ({
      sessionHistory: state.sessionHistory.map(s => 
        s.sessionId === sessionId ? { ...s, status: 'submitted' } : s
      ),
    }));
  },
}));
