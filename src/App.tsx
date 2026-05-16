import { Routes, Route } from 'react-router-dom';
import Landing from '@/pages/Landing';
import Play from '@/pages/Play';
import Lobby from '@/pages/Lobby';
import Leaderboard from '@/pages/Leaderboard';
import Editor from '@/pages/Editor';
import Profile from '@/pages/Profile';
import NotFound from '@/pages/NotFound';
import AppShell from '@/components/layout/AppShell';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Landing />} />
        <Route path="/play" element={<Play />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
