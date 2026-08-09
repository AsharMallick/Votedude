import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetPetitionsQuery,
  useSignPetitionMutation,
  useCreatePetitionMutation,
} from "../redux/services/petitionApi";

const CATEGORIES = [
  "ECONOMY",
  "VETERANS",
  "REFORM",
  "SECURITY",
  "RIGHTS",
  "COMMUNITY",
];

export default function Petitions() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const { data, isLoading, isError, error } = useGetPetitionsQuery();
  const [signPetition, { isLoading: signing }] = useSignPetitionMutation();
  const [createPetition, { isLoading: creating }] = useCreatePetitionMutation();

  const petitions = data?.petitions || [];

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [goal, setGoal] = useState("1000");

  const openForm = () => {
    if (!user) {
      navigate("/auth", { state: { login: true } });
      return;
    }
    setShowForm(true);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !goal) return;

    try {
      await createPetition({
        title: title.trim(),
        description: description.trim(),
        category,
        goal: Number(goal),
      }).unwrap();

      setTitle("");
      setDescription("");
      setCategory(CATEGORIES[0]);
      setGoal("1000");
      setShowForm(false);
    } catch (err) {
      alert(err?.data?.message || "Could not create petition");
    }
  };

  const handleSign = async (id) => {
    if (!user) {
      navigate("/auth", { state: { login: true } });
      return;
    }
    try {
      await signPetition(id).unwrap();
    } catch (err) {
      alert(err?.data?.message || "Could not sign petition");
    }
  };

  const hasSigned = (p) => {
    if (!user || !p.signedUsers) return false;
    return p.signedUsers.some(
      (id) =>
        String(id) === String(user._id) || String(id?._id) === String(user._id),
    );
  };

  return (
    <div>
      <div className="bg-[#e1e1e1] border border-[#00000031]">
        <section className="flex flex-col justify-start w-[80%] mx-auto pt-14 pb-16 pl-10 px-4 sm:px-6">
          <div>
            <p className="text-[13px] font-extrabold text-vd-green tracking-wide uppercase mb-3">
              Featured Petitions
            </p>
            <h1 className="text-[2.4rem] sm:text-[2.75rem] font-bold tracking-tight text-gray-900 leading-tight mb-4">
              Put your name behind it.
            </h1>
            <div className="flex justify-between items-center gap-6">
              <p className="text-[15.5px] text-gray-600 leading-relaxed w-1/2">
                Petitions turn frustration into pressure. Sign the ones that
                matter — or start your own.
              </p>
              <button
                onClick={openForm}
                className="h-[44px] px-5 bg-black hover:bg-black/80 text-white text-[14px] font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5"
              >
                <span className="text-lg leading-none">+</span>
                Start a Petition
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Start a Petition form */}
      {showForm && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
          <form
            onSubmit={handleCreate}
            className="bg-white border border-[#00000031] rounded-2xl p-6 space-y-4"
          >
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Petition title"
              className="w-full h-11 px-4 rounded-lg border border-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-vd-green/30"
              required
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 px-4 rounded-lg border border-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-vd-green/30"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you're asking for"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-vd-green/30 resize-none"
              required
            />

            <input
              type="number"
              min="1"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Signature goal"
              className="w-full h-11 px-4 rounded-lg border border-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-vd-green/30"
              required
            />

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="h-10 px-4 text-[14px] text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={creating}
                className="h-10 px-5 bg-vd-green hover:bg-vd-green-dark text-white text-[14px] font-medium rounded-md"
              >
                {creating ? "Submitting..." : "Submit Petition"}
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {isLoading && (
          <p className="text-center text-gray-500 py-20">
            Loading petitions...
          </p>
        )}
        {isError && (
          <p className="text-center text-red-500 py-20">
            {error?.data?.message || "Failed to load petitions"}
          </p>
        )}
        {!isLoading && petitions.length === 0 && (
          <p className="text-center text-gray-500 py-20">No petitions yet.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {petitions.map((p) => {
            const signed = p.signedUsers?.length || p.signatureCount || 0;
            const goalCount = p.goal || 1;
            const percent = Math.min(
              Math.round((signed / goalCount) * 100),
              100,
            );
            const alreadySigned = hasSigned(p);

            return (
              <article
                key={p._id}
                className="bg-white border border-[#00000031] rounded-2xl p-5 hover:shadow-md transition-shadow"
              >
                {p.category && (
                  <span className="inline-block text-[11px] font-extrabold text-vd-green tracking-wide uppercase mb-3">
                    {p.category}
                  </span>
                )}
                <h3 className="font-semibold text-[16px] text-gray-900 leading-snug mb-4">
                  {p.title}
                </h3>

                <div className="mb-3">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-vd-green rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-gray-500">
                    {Number(signed).toLocaleString()} of{" "}
                    {Number(goalCount).toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleSign(p._id)}
                    disabled={signing || alreadySigned}
                    className={`h-9 px-5 text-[13px] font-medium rounded-md transition-colors ${
                      alreadySigned
                        ? "bg-gray-100 text-gray-500 cursor-default"
                        : "bg-vd-green hover:bg-vd-green-dark text-white"
                    }`}
                  >
                    {alreadySigned ? "Signed ✓" : "Sign"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
