import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

const SIM_KEY = 'admin-simulate';

function readSim(): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(SIM_KEY) === '1';
}

export function setAdminSimulated(value: boolean) {
  if (typeof window === 'undefined') return;
  if (value) window.localStorage.setItem(SIM_KEY, '1');
  else window.localStorage.removeItem(SIM_KEY);
  window.dispatchEvent(new Event('admin-simulate-change'));
}

export function useAdmin() {
  const [session, setSession] = useState<Session | null>(null);
  const [realAdmin, setRealAdmin] = useState(false);
  const [simulated, setSimulated] = useState<boolean>(readSim);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onChange = () => setSimulated(readSim());
    window.addEventListener('admin-simulate-change', onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener('admin-simulate-change', onChange);
      window.removeEventListener('storage', onChange);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (!session) {
      setRealAdmin(false);
      return;
    }
    supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .eq('role', 'admin')
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) setRealAdmin(!!data);
      });
    return () => { cancelled = true; };
  }, [session]);

  return {
    session,
    isAdmin: realAdmin || simulated,
    realAdmin,
    simulated,
    loading,
  };
}
