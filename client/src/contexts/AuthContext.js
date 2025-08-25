import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: true,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'CLEAR_LOADING':
      return { ...state, isLoading: false };
    default:
      return state;
  }
}

// Configure axios defaults
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const queryClient = useQueryClient();

  // Set token in axios headers
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
      localStorage.setItem('token', state.token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [state.token]);

  // Get current user
  const { refetch: refetchUser } = useQuery(
    'currentUser',
    async () => {
      const response = await axios.get('/auth/me');
      return response.data;
    },
    {
      enabled: !!state.token,
      onSuccess: (data) => {
        dispatch({ type: 'SET_USER', payload: data.user });
      },
      onError: () => {
        dispatch({ type: 'LOGOUT' });
      },
      retry: false,
    }
  );

  // Login mutation
  const loginMutation = useMutation(
    async ({ email, password }) => {
      const response = await axios.post('/auth/login', { email, password });
      return response.data;
    },
    {
      onSuccess: (data) => {
        dispatch({ type: 'SET_TOKEN', payload: data.token });
        dispatch({ type: 'SET_USER', payload: data.user });
        toast.success('Login successful!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Login failed');
      },
    }
  );

  // Register mutation
  const registerMutation = useMutation(
    async (userData) => {
      const response = await axios.post('/auth/register', userData);
      return response.data;
    },
    {
      onSuccess: (data) => {
        dispatch({ type: 'SET_TOKEN', payload: data.token });
        dispatch({ type: 'SET_USER', payload: data.user });
        toast.success('Registration successful!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Registration failed');
      },
    }
  );

  // Initialize auth state on app load
  useEffect(() => {
    if (state.token) {
      refetchUser();
    } else {
      dispatch({ type: 'CLEAR_LOADING' });
    }
  }, [state.token, refetchUser]);

  const login = (credentials) => {
    return loginMutation.mutateAsync(credentials);
  };

  const register = (userData) => {
    return registerMutation.mutateAsync(userData);
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    queryClient.clear();
    toast.success('Logged out successfully');
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    isLoggingIn: loginMutation.isLoading,
    isRegistering: registerMutation.isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
