import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Player } from './pages/Player';
import { PlaylistDetail } from './pages/PlaylistDetail';
import { ArtistDetail } from './pages/ArtistDetail';
import { AlbumDetail } from './pages/AlbumDetail';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { Premium } from './pages/Premium';
import { Admin } from './pages/Admin';
import { Library } from './pages/Library';
import { LikedSongs } from './pages/LikedSongs';
import { useAuthStore } from './store/authStore';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/player" element={<Player />} />
          <Route path="/artist/:id" element={<ArtistDetail />} />
          <Route path="/album/:id" element={<AlbumDetail />} />
          <Route
            path="/library"
            element={
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            }
          />
          <Route
            path="/liked"
            element={
              <ProtectedRoute>
                <LikedSongs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/playlist/:id"
            element={
              <ProtectedRoute>
                <PlaylistDetail />
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
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/premium"
            element={
              <ProtectedRoute>
                <Premium />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
