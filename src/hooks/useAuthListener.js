import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { login, logout } from '../features/auth/authSlice';

export const useAuthListener = () => {
  const [initializing, setInitializing] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(login({ 
          email: firebaseUser.email, 
          name: firebaseUser.email.split('@')[0] 
        }));
      } else {
        dispatch(logout());
      }
      setInitializing(false);
    });
    return () => unsubscribe();
  }, [dispatch]);

  return { initializing };
};