/*
  # Create MusicFlow Base Schema

  ## Overview
  This migration creates the foundational database schema for MusicFlow, 
  an Ethiopian-inspired music streaming platform.

  ## New Tables
  1. profiles - User profiles with premium status and preferences
  2. artists - Artist profiles linked to users
  3. albums - Music albums
  4. songs - Individual tracks with lyrics support
  5. playlists - User playlists
  6. playlist_songs - Playlist tracks
  7. user_follows - Social following
  8. user_likes - Song favorites
  9. listening_history - Play history for recommendations
  10. playlist_collaborators - Collaborative playlist permissions

  ## Security
  - RLS enabled on all tables
  - Appropriate policies for data access and modification
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  full_name text,
  bio text,
  photo_url text DEFAULT 'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=400',
  is_premium boolean DEFAULT false,
  is_artist boolean DEFAULT false,
  is_verified boolean DEFAULT false,
  language_preference text DEFAULT 'en',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create artists table
CREATE TABLE IF NOT EXISTS artists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  stage_name text NOT NULL,
  bio text,
  image_url text DEFAULT 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
  banner_url text,
  genres text[] DEFAULT '{}',
  followers_count integer DEFAULT 0,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE artists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Artists are viewable by everyone"
  ON artists FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create artist profile"
  ON artists FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own artist profile"
  ON artists FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create albums table
CREATE TABLE IF NOT EXISTS albums (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id uuid REFERENCES artists(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  cover_url text DEFAULT 'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=800',
  release_date date DEFAULT CURRENT_DATE,
  genre text,
  description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE albums ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Albums are viewable by everyone"
  ON albums FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Artists can create own albums"
  ON albums FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM artists
      WHERE artists.id = artist_id
      AND artists.user_id = auth.uid()
    )
  );

-- Create songs table
CREATE TABLE IF NOT EXISTS songs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id uuid REFERENCES artists(id) ON DELETE CASCADE NOT NULL,
  album_id uuid REFERENCES albums(id) ON DELETE SET NULL,
  title text NOT NULL,
  duration integer DEFAULT 0,
  cover_url text DEFAULT 'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=800',
  audio_url text,
  genre text,
  release_date date DEFAULT CURRENT_DATE,
  plays_count integer DEFAULT 0,
  lyrics text,
  lyrics_am text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE songs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Songs are viewable by everyone"
  ON songs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Artists can create own songs"
  ON songs FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM artists
      WHERE artists.id = artist_id
      AND artists.user_id = auth.uid()
    )
  );

-- Create playlists table
CREATE TABLE IF NOT EXISTS playlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  cover_url text DEFAULT 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=800',
  is_public boolean DEFAULT true,
  is_collaborative boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public playlists are viewable by everyone"
  ON playlists FOR SELECT
  TO authenticated
  USING (is_public = true OR user_id = auth.uid());

CREATE POLICY "Users can create own playlists"
  ON playlists FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own playlists"
  ON playlists FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own playlists"
  ON playlists FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create playlist_collaborators table
CREATE TABLE IF NOT EXISTS playlist_collaborators (
  playlist_id uuid REFERENCES playlists(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  can_edit boolean DEFAULT true,
  added_at timestamptz DEFAULT now(),
  PRIMARY KEY (playlist_id, user_id)
);

ALTER TABLE playlist_collaborators ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Collaborators viewable by playlist owner"
  ON playlist_collaborators FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM playlists
      WHERE playlists.id = playlist_id
      AND playlists.user_id = auth.uid()
    )
    OR user_id = auth.uid()
  );

CREATE POLICY "Playlist owners can add collaborators"
  ON playlist_collaborators FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM playlists
      WHERE playlists.id = playlist_id
      AND playlists.user_id = auth.uid()
    )
  );

CREATE POLICY "Playlist owners can remove collaborators"
  ON playlist_collaborators FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM playlists
      WHERE playlists.id = playlist_id
      AND playlists.user_id = auth.uid()
    )
  );

-- Create playlist_songs table
CREATE TABLE IF NOT EXISTS playlist_songs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  playlist_id uuid REFERENCES playlists(id) ON DELETE CASCADE NOT NULL,
  song_id uuid REFERENCES songs(id) ON DELETE CASCADE NOT NULL,
  position integer DEFAULT 0,
  added_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  added_at timestamptz DEFAULT now(),
  UNIQUE(playlist_id, song_id)
);

ALTER TABLE playlist_songs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Playlist songs viewable by playlist viewers"
  ON playlist_songs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM playlists
      WHERE playlists.id = playlist_id
      AND (playlists.is_public = true OR playlists.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can add songs to own or collaborative playlists"
  ON playlist_songs FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM playlists
      WHERE playlists.id = playlist_id
      AND (
        playlists.user_id = auth.uid()
        OR (
          playlists.is_collaborative = true
          AND EXISTS (
            SELECT 1 FROM playlist_collaborators
            WHERE playlist_collaborators.playlist_id = playlists.id
            AND playlist_collaborators.user_id = auth.uid()
          )
        )
      )
    )
  );

CREATE POLICY "Users can remove songs from own playlists"
  ON playlist_songs FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM playlists
      WHERE playlists.id = playlist_id
      AND playlists.user_id = auth.uid()
    )
  );

-- Create user_follows table
CREATE TABLE IF NOT EXISTS user_follows (
  follower_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  following_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (follower_id, following_id),
  CHECK (follower_id != following_id)
);

ALTER TABLE user_follows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Follows are viewable by everyone"
  ON user_follows FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can follow others"
  ON user_follows FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can unfollow others"
  ON user_follows FOR DELETE
  TO authenticated
  USING (auth.uid() = follower_id);

-- Create user_likes table
CREATE TABLE IF NOT EXISTS user_likes (
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  song_id uuid REFERENCES songs(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, song_id)
);

ALTER TABLE user_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own likes"
  ON user_likes FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can like songs"
  ON user_likes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike songs"
  ON user_likes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create listening_history table
CREATE TABLE IF NOT EXISTS listening_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  song_id uuid REFERENCES songs(id) ON DELETE CASCADE NOT NULL,
  played_at timestamptz DEFAULT now(),
  duration_played integer DEFAULT 0
);

ALTER TABLE listening_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own listening history"
  ON listening_history FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add to own listening history"
  ON listening_history FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_songs_artist_id ON songs(artist_id);
CREATE INDEX IF NOT EXISTS idx_songs_album_id ON songs(album_id);
CREATE INDEX IF NOT EXISTS idx_albums_artist_id ON albums(artist_id);
CREATE INDEX IF NOT EXISTS idx_playlist_songs_playlist_id ON playlist_songs(playlist_id);
CREATE INDEX IF NOT EXISTS idx_playlist_songs_song_id ON playlist_songs(song_id);
CREATE INDEX IF NOT EXISTS idx_listening_history_user_id ON listening_history(user_id);
CREATE INDEX IF NOT EXISTS idx_listening_history_played_at ON listening_history(played_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_follows_follower_id ON user_follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_user_follows_following_id ON user_follows(following_id);
CREATE INDEX IF NOT EXISTS idx_user_likes_user_id ON user_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_user_likes_song_id ON user_likes(song_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_profiles_updated_at'
  ) THEN
    CREATE TRIGGER update_profiles_updated_at
      BEFORE UPDATE ON profiles
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_playlists_updated_at'
  ) THEN
    CREATE TRIGGER update_playlists_updated_at
      BEFORE UPDATE ON playlists
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;