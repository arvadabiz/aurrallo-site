import { useState } from 'react';
import { supabase, isConfigured } from '../lib/supabase';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useEmailSubmit(source = 'unknown') {
  const [email,   setEmail]   = useState('');
  const [status,  setStatus]  = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    if (!EMAIL_RE.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    if (!isConfigured) {
      setStatus('error');
      setMessage('Email collection is not configured yet.');
      return;
    }

    setStatus('loading');
    setMessage('');

    const { error } = await supabase
      .from('waitlist')
      .insert([{ email, source }]);

    if (error) {
      if (error.code === '23505') {
        // Unique violation — already signed up
        setStatus('success');
        setMessage("You're already on the list!");
      } else {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      }
    } else {
      setStatus('success');
      setMessage("You're on the list — we'll be in touch!");
      setEmail('');
    }
  };

  const reset = () => { setStatus('idle'); setMessage(''); setEmail(''); };

  return { email, setEmail, status, message, submit, reset };
}
