import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAdmin } from '@/hooks/useAdmin';

/**
 * Hidden admin login modal.
 * Opens when the URL contains ?admin=true OR when a custom event 'open-admin-gate' is dispatched.
 * The footer renders an invisible dot that fires that event.
 */
const AdminGate = () => {
  const [params, setParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const { session, isAdmin } = useAdmin();

  useEffect(() => {
    if (params.get('admin') === 'true') setOpen(true);
    const handler = () => setOpen(true);
    window.addEventListener('open-admin-gate', handler);
    return () => window.removeEventListener('open-admin-gate', handler);
  }, [params]);

  const close = () => {
    setOpen(false);
    setError(null);
    if (params.get('admin')) {
      const next = new URLSearchParams(params);
      next.delete('admin');
      setParams(next, { replace: true });
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/` },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      setEmail('');
      setPassword('');
      setTimeout(() => setOpen(false), 400);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore');
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    close();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-background/95 flex items-center justify-center p-6"
      onClick={close}
    >
      <div
        className="relative w-full max-w-sm bg-background border border-border rounded-sm p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="absolute top-3 right-3 p-1 text-muted-foreground hover:text-foreground"
          aria-label="Chiudi"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="font-display text-sm uppercase tracking-[0.22em] text-foreground mb-6 text-center">
          Modalità Edit
        </h3>

        {session ? (
          <div className="space-y-4 text-center">
            <p className="font-body text-xs text-muted-foreground">
              {isAdmin ? 'Sei collegata come admin.' : 'Account collegato ma senza permessi admin.'}
            </p>
            <p className="font-body text-[11px] text-muted-foreground/80 break-all">
              {session.user.email}
            </p>
            <button
              onClick={logout}
              className="w-full px-4 py-2 rounded-sm border border-border font-body text-[11px] uppercase tracking-[0.18em] text-foreground hover:bg-muted transition"
            >
              Esci
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-sm border border-border bg-background px-3 py-2 font-body text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/40"
              />
            </div>
            <div>
              <label className="block font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-sm border border-border bg-background px-3 py-2 font-body text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/40"
              />
            </div>

            {error && (
              <p className="font-body text-[11px] text-destructive">{error}</p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full px-4 py-2 rounded-sm bg-foreground text-background font-body text-[11px] uppercase tracking-[0.18em] hover:bg-foreground/90 transition disabled:opacity-50"
            >
              {busy ? '…' : mode === 'login' ? 'Entra' : 'Registrati'}
            </button>

            <button
              type="button"
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null); }}
              className="w-full font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition"
            >
              {mode === 'login' ? 'Prima volta? Registrati' : 'Hai già un account? Entra'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminGate;
