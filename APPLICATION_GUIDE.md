# CoachLife Application - Complete Guide

## Overview
A full-featured React application (Vite + React + React Router) for a player development platform with three user roles: Admin, Coach, and Player. Uses **regular CSS** (not Tailwind) for all styling.

## Project Structure

```
src/
├── data/                          # Mock JSON data
│   ├── players.json              # Player information
│   ├── coaches.json              # Coach information
│   ├── learningPathway.json       # Learning pathway structure
│   ├── sessionHistory.json        # Session records
│   ├── sessionDraft.json          # Draft sessions
│   ├── rewards.json               # Reward definitions
│   └── redeemHistory.json         # Redeem transaction history
│
├── context/
│   └── store.js                  # Zustand global state management
│
├── components/                    # Reusable UI components
│   ├── Button.jsx                # Button with variants (primary, secondary, danger, success, outline)
│   ├── Card.jsx                  # Card container component
│   ├── Table.jsx                 # Data table with sorting/filtering
│   ├── Modal.jsx                 # Modal dialog
│   ├── Input.jsx                 # Text input with label
│   ├── Select.jsx                # Dropdown select
│   ├── ProgressBar.jsx           # Progress indicator
│   ├── Badge.jsx                 # Status badge
│   ├── SessionCard.jsx           # Session display component
│   ├── Layout.jsx                # Main layout wrapper
│   ├── Sidebar.jsx               # Side navigation menu
│   ├── Navbar.jsx                # Top navigation bar
│   └── ProtectedRoute.jsx        # Route protection wrapper
│
├── pages/
│   ├── common/
│   │   ├── Login.jsx             # Login page with demo buttons
│   │   └── NotFound.jsx          # 404 error page
│   │
│   ├── admin/                    # Admin-only pages
│   │   ├── AdminDashboard.jsx    # Dashboard with stats
│   │   ├── Players.jsx           # CRUD operations for players
│   │   ├── Coaches.jsx           # CRUD operations for coaches
│   │   ├── AssignPlayers.jsx     # Assign players to coaches
│   │   ├── LearningPathwayBuilder.jsx # Design learning pathways
│   │   ├── Rewards.jsx           # Manage rewards
│   │   ├── RedeemHistory.jsx     # Track reward redemptions
│   │   └── Analytics.jsx         # Analytics dashboard
│   │
│   ├── coach/                    # Coach-only pages
│   │   ├── CoachDashboard.jsx    # Coach dashboard
│   │   ├── MyStudents.jsx        # View assigned students
│   │   ├── StudentDetail.jsx     # Detailed student progress
│   │   ├── StartSession.jsx      # Create new session
│   │   ├── PastSessions.jsx      # View session history
│   │   └── CoachProfile.jsx      # Coach profile
│   │
│   └── player/                   # Player-only pages
│       ├── PlayerDashboard.jsx   # Player dashboard
│       ├── MyProgress.jsx        # Progress tracking
│       ├── MySessions.jsx        # Session history
│       ├── MyRedeem.jsx          # Reward redemption
│       └── PlayerProfile.jsx     # Player profile
│
├── styles/
│   └── global.css               # All CSS styles (regular CSS, no Tailwind)
│
├── App.jsx                       # Main app with routing
├── main.jsx                      # Entry point
├── App.css                       # App-specific styles
└── index.css                     # Global CSS reset
```

## CSS Classes

The application uses **regular CSS** classes defined in `src/styles/global.css`. Here are the main utility classes:

### Layout Classes
- `.main-container` - Flex container for sidebar + content
- `.sidebar` - Fixed left sidebar
- `.content-area` - Main content area
- `.page-content` - Page content with padding
- `.navbar` - Top navigation bar

### Component Classes
- `.card` - White card container
- `.button` - Base button style
- `.button-primary` / `.button-secondary` / `.button-danger` / `.button-success` / `.button-outline`
- `.form-group` - Form field wrapper
- `.form-label` - Label styling
- `.form-input` - Input field
- `.form-select` - Select dropdown
- `.form-textarea` - Textarea
- `.table` - Table styling
- `.table thead` / `.table th` / `.table td` / `.table tbody tr`
- `.badge` - Status badge
- `.badge-default` / `.badge-primary` / `.badge-success` / `.badge-warning` / `.badge-danger`
- `.progress-bar` - Progress bar container
- `.modal-overlay` - Modal background
- `.modal` - Modal dialog

### Utility Classes
- `.flex` - Flexbox display
- `.flex-col` - Flex column direction
- `.flex-between` - Space-between with center align
- `.flex-center` - Center align both axes
- `.grid` / `.grid-1` / `.grid-2` / `.grid-3` / `.grid-4` - Grid layouts
- `.space-y-2` / `.space-y-3` / `.space-y-4` - Vertical spacing
- `.mb-*` / `.mt-*` - Margins
- `.p-*` - Padding
- `.text-center` / `.text-right` - Text alignment
- `.w-full` / `.h-screen` - Width/height utilities
- `.bg-white` / `.bg-gray-50` / `.bg-blue-50` - Background colors
- `.text-blue-600` / `.text-green-600` / `.text-red-600` - Text colors
- `.font-bold` / `.font-semibold` / `.font-medium` - Font weights
- `.rounded` / `.rounded-lg` / `.rounded-full` - Border radius
- `.border` / `.border-t` / `.border-b` / `.border-l-4` - Borders
- `.shadow-md` / `.shadow-lg` / `.shadow-xl` - Box shadows

## Features

### Authentication
- **Mock Login System**: Demo credentials for all three roles
  - Admin: `admin` / `admin`
  - Coach: `coach` / `coach`
  - Player: `player` / `player`
- **Protected Routes**: Routes check user role and redirect unauthorized users
- **Automatic Redirects**: Users redirected to role-specific dashboard on login

### Admin Panel
- **Dashboard**: Overview stats, top performers, quick actions
- **Player Management**: CRUD operations, search, filtering
- **Coach Management**: CRUD operations
- **Player-Coach Assignment**: Assign students to coaches
- **Learning Pathway Builder**: Design stages, levels, and activities
- **Reward Management**: Create and manage reward system
- **Redeem History**: Track all reward redemptions
- **Analytics**: Comprehensive analytics dashboard

### Coach Panel
- **Dashboard**: Quick stats and recent sessions
- **My Students**: View all assigned students
- **Student Details**: Individual student progress, session history
- **Start Session**: Create session drafts with selected activities
- **Past Sessions**: View completed sessions
- **Profile**: Coach information and statistics

### Player Panel
- **Dashboard**: Progress overview and quick stats
- **My Progress**: Learning pathway progress tracking
- **My Sessions**: Session history with ratings and feedback
- **Redeem Rewards**: Redeem earned points for rewards
- **Profile**: Personal information and coach details

## State Management

**Zustand Store** (`src/context/store.js`) manages:
- User authentication state
- All mock data (players, coaches, sessions, etc.)
- CRUD operations for all entities
- Session creation and completion
- Reward redemption

### Main Actions
```javascript
login(username, password)
logout()
addPlayer(player)
updatePlayer(playerId, data)
deletePlayer(playerId)
addCoach(coach)
updateCoach(coachId, data)
deleteCoach(coachId)
assignPlayerToCoach(playerId, coachId)
createSessionDraft(draft)
updateSessionDraft(sessionId, data)
completeSession(sessionDraft)
redeemReward(playerId, rewardId)
```

## Navigation

The sidebar provides role-based navigation:

**Admin Menu:**
- Dashboard
- Players
- Coaches
- Assign Players
- Learning Pathway
- Rewards
- Redeem History
- Analytics

**Coach Menu:**
- Dashboard
- My Students
- Start Session
- Past Sessions
- Profile

**Player Menu:**
- Dashboard
- My Progress
- My Sessions
- Redeem Rewards
- Profile

## CSS Architecture

All styles use **regular CSS** (no Tailwind):

### File: `src/styles/global.css`
Organized sections:
1. **Global Styles** - Reset, body defaults
2. **Layout** - Sidebar, navbar, content areas
3. **Cards** - Card containers and titles
4. **Buttons** - Button styles and variants
5. **Input Fields** - Form elements
6. **Tables** - Table styling
7. **Badges** - Status indicators
8. **Progress Bar** - Progress indicators
9. **Modal** - Modal dialogs
10. **Login/404 Pages** - Specific page styles
11. **Grid Layouts** - Responsive grids
12. **Utilities** - Helper classes
13. **Responsive Media Queries** - Mobile adaptations
14. **Scrollbar Styling** - Custom scrollbars

### Color Palette
- Primary Blue: `#2563eb`
- Dark Blue: `#1a202c`
- White: `#ffffff`
- Gray scale: `#f9fafb` to `#1f2937`
- Danger Red: `#dc2626`
- Success Green: `#16a34a`
- Warning Yellow: `#ca8a04`

## Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:5173` (or your configured port) to access the application.

## Using Mock Data

All data comes from JSON files in `src/data/`:
- **players.json** - Player list with levels, stages, points
- **coaches.json** - Coach list with specializations
- **learningPathway.json** - Activity definitions
- **sessionHistory.json** - Completed sessions
- **sessionDraft.json** - In-progress sessions
- **rewards.json** - Available rewards
- **redeemHistory.json** - Redemption records

Modify these JSON files to change mock data without code changes.

## Key Components Explained

### SessionCard Component
Displays session information with:
- Activity list
- Rating system (1-5 stars)
- Bonus points input
- Feedback textarea
- Auto-calculated total points
- Save functionality (editable mode)

### ProtectedRoute Component
Checks:
- User is authenticated
- User has required role
- Redirects to login/404 as needed

### Layout Component
Wrapper providing:
- Sidebar with role-based navigation
- Top navbar with user info
- Responsive container
- Consistent styling across all pages

## Responsive Design

The CSS includes responsive breakpoints:
- **Tablet** (≤1024px): Adjust grid columns
- **Mobile** (≤768px): Hide/adjust sidebar, single column layout

## Browser Support

Works in all modern browsers supporting:
- CSS Grid and Flexbox
- ES6+ JavaScript
- React 18+
- CSS Custom Properties

---

**Last Updated**: December 1, 2025  
**Technology Stack**: React + Vite + React Router + Zustand + Regular CSS
