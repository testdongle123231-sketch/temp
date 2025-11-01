import { create } from 'zustand';
import { User } from '../types';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authMode: 'signin' | 'signup';
  loading: boolean;

  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  openAuthModal: (mode: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
  setAuthMode: (mode: 'signin' | 'signup') => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  isAuthenticated: false,
  isAuthModalOpen: false,
  authMode: 'signin',
  loading: true,

  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          set({
            user: {
              id: profile.id,
              username: profile.username,
              email: session.user.email!,
              photoUrl: profile.photo_url,
              bio: profile.bio || '',
              isPremium: profile.is_premium,
              playlists: [],
              likedSongs: [],
              followedArtists: [],
              createdAt: profile.created_at,
            },
            isAuthenticated: true,
            loading: false,
          });
        } else {
          set({ loading: false });
        }
      } else {
        set({ loading: false });
      }

      supabase.auth.onAuthStateChange((event, session) => {
        (async () => {
          if (event === 'SIGNED_IN' && session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profile) {
              set({
                user: {
                  id: profile.id,
                  username: profile.username,
                  email: session.user.email!,
                  photoUrl: profile.photo_url,
                  bio: profile.bio || '',
                  isPremium: profile.is_premium,
                  playlists: [],
                  likedSongs: [],
                  followedArtists: [],
                  createdAt: profile.created_at,
                },
                isAuthenticated: true,
              });
            }
          } else if (event === 'SIGNED_OUT') {
            set({ user: null, isAuthenticated: false });
          }
        })();
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ loading: false });
    }
  },

  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profile) {
        set({
          user: {
            id: profile.id,
            username: profile.username,
            email: data.user.email!,
            photoUrl: profile.photo_url,
            bio: profile.bio || '',
            isPremium: profile.is_premium,
            playlists: [],
            likedSongs: [],
            followedArtists: [],
            createdAt: profile.created_at,
          },
          isAuthenticated: true,
          isAuthModalOpen: false,
        });
      }
    }
  },

  signup: async (username: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        username,
        email,
      });

      if (profileError) throw profileError;

      set({
        user: {
          id: data.user.id,
          username,
          email,
          photoUrl: 'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=400',
          bio: '',
          isPremium: false,
          playlists: [],
          likedSongs: [],
          followedArtists: [],
          createdAt: new Date().toISOString(),
        },
        isAuthenticated: true,
        isAuthModalOpen: false,
      });
    }
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, isAuthenticated: false });
  },

  updateUser: async (updates: Partial<User>) => {
    const { user } = get();
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        username: updates.username,
        bio: updates.bio,
        photo_url: updates.photoUrl,
        is_premium: updates.isPremium,
      })
      .eq('id', user.id);

    if (error) throw error;

    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    }));
  },

  openAuthModal: (mode) => set({ isAuthModalOpen: true, authMode: mode }),

  closeAuthModal: () => set({ isAuthModalOpen: false }),

  setAuthMode: (mode) => set({ authMode: mode }),
}));
