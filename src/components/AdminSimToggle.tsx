import { useAdmin, setAdminSimulated } from '@/hooks/useAdmin';

/**
 * Floating toggle to simulate admin UI (drag enabled) without changing URL.
 * Visual-only: real DB writes still require a logged-in admin (RLS).
 */
const AdminSimToggle = () => {
  const { simulated, realAdmin } = useAdmin();
  // Hide if already a real admin — no need to simulate.
  if (realAdmin) return null;

  return (
    <button
      type="button"
      onClick={() => setAdminSimulated(!simulated)}
      className={`fixed bottom-3 right-3 z-[55] px-3 py-1.5 rounded-full border font-body text-[10px] uppercase tracking-[0.2em] transition ${
        simulated
          ? 'bg-foreground text-background border-foreground'
          : 'bg-background/80 backdrop-blur text-foreground/50 border-foreground/20 hover:text-foreground hover:border-foreground/50'
      }`}
      aria-label="Simula admin"
      title="Simula admin (solo UI, le modifiche non vengono salvate)"
    >
      {simulated ? '● Sim admin ON' : '○ Sim admin'}
    </button>
  );
};

export default AdminSimToggle;
