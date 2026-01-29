import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Login = () => {
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);
  const [email, setEmail] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setSession({
      id: "usr_demo",
      name: "Alex Morgan",
      email,
      role: "manager",
      orgId: "org_demo",
      permissions: ["task:assign", "audit:view"]
    });

    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-500">
          Sign in with your email and 6-character invite code.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium">
            Work Email
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="block text-sm font-medium">
            Invite Code
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 uppercase tracking-widest"
              maxLength={6}
              value={inviteCode}
              onChange={(event) => setInviteCode(event.target.value.toUpperCase())}
              required
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-lg bg-slate-900 px-4 py-2 text-white"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
