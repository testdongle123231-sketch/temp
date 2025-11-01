import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Landing } from './pages/Landing';
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
  const { initialize, loading } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-t-green-500 border-r-yellow-500 border-b-red-500 border-l-green-500 rounded-full animate-spin" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/home" element={<Home />} />
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
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
