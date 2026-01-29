import { useAuthStore } from "../store/authStore";

const rolePanels = {
  owner: {
    headline: "Organization overview",
    detail: "Monitor compliance, coverage, and strategic staffing decisions."
  },
  admin: {
    headline: "Operations command",
    detail: "Manage teams, policies, and cross-functional capacity."
  },
  manager: {
    headline: "Delivery cockpit",
    detail: "Assign tasks, monitor SLA risk, and review AI recommendations."
  },
  member: {
    headline: "My work queue",
    detail: "See tasks, recommended learning, and ETA insights."
  },
  viewer: {
    headline: "Insights feed",
    detail: "View audit trails and project health snapshots."
  }
};

const Dashboard = () => {
  const session = useAuthStore((state) => state.session);
  const panel = session ? rolePanels[session.role] : rolePanels.viewer;

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="rounded-2xl bg-slate-800 p-8">
          <p className="text-sm text-slate-300">Welcome back</p>
          <h1 className="text-3xl font-semibold">{panel.headline}</h1>
          <p className="mt-2 text-slate-300">{panel.detail}</p>
        </header>
        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl bg-slate-800 p-6">
            <h2 className="text-lg font-semibold">AI assignment stream</h2>
            <p className="mt-2 text-sm text-slate-300">
              Gemini subdivision and TF-IDF matching are running with a 92% role-fit
              confidence. Pending approvals are highlighted in the audit log.
            </p>
          </article>
          <article className="rounded-2xl bg-slate-800 p-6">
            <h2 className="text-lg font-semibold">Skill growth radar</h2>
            <p className="mt-2 text-sm text-slate-300">
              Adaptive learning nudges are ready for 4 team members.
            </p>
          </article>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
