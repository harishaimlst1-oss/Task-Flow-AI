import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="rounded-2xl bg-white p-8 shadow">
          <h1 className="text-3xl font-semibold">Set up your workspace</h1>
          <p className="mt-2 text-slate-500">
            Confirm your team structure, connect activity sources, and define
            initial skill coverage so Task Flow AI can route work accurately.
          </p>
        </header>
        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Verify organization",
              description: "Confirm company domain access and security defaults."
            },
            {
              title: "Connect activity",
              description: "Sync Jira, Linear, or Slack activity signals."
            },
            {
              title: "Seed skills",
              description: "Import skills and resume data for assignment models."
            }
          ].map((card) => (
            <article key={card.title} className="rounded-2xl bg-white p-6 shadow">
              <h2 className="text-lg font-semibold">{card.title}</h2>
              <p className="mt-2 text-sm text-slate-500">{card.description}</p>
              <button className="mt-4 text-sm font-medium text-slate-900">
                Configure →
              </button>
            </article>
          ))}
        </section>
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-lg bg-slate-900 px-5 py-2 text-white"
          >
            Finish onboarding
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
