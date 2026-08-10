import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetPendingQuery,
  useGetAnalyticsQuery,
  useApproveNewsMutation,
  useApproveEventMutation,
  useApprovePostMutation,
  useApprovePetitionMutation,
  useRemovePostMutation,
  useDeleteNewsMutation,
  useDeleteEventMutation,
  useDeletePetitionMutation,
  useDeleteLawMutation,
  useDeletePollMutation,
  useDeleteCandidateMutation,
} from "../redux/services/adminApi";
import { useGetLawsQuery } from "../redux/services/lawApi";
import { useGetPollsQuery } from "../redux/services/pollApi";
import { useGetCandidatesQuery } from "../redux/services/candidateApi";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "news", label: "News" },
  { id: "events", label: "Events" },
  { id: "posts", label: "Posts" },
  { id: "petitions", label: "Petitions" },
  { id: "laws", label: "Laws" },
  { id: "polls", label: "Polls" },
  { id: "candidates", label: "Candidates" },
];

function Empty({ text }) {
  return <p className="text-sm text-gray-500">{text}</p>;
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Row({ title, subtitle, children }) {
  return (
    <div className="bg-white border border-[#00000031] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
      <div className="min-w-0">
        <div className="font-semibold text-gray-900">{title}</div>
        {subtitle && (
          <div className="text-[13px] text-gray-500 mt-0.5">{subtitle}</div>
        )}
      </div>
      <div className="flex gap-2 flex-shrink-0 flex-wrap">{children}</div>
    </div>
  );
}

function Action({ onClick, label, loading, danger }) {
  return (
    <button
      type="button"
      disabled={loading}
      onClick={onClick}
      className={`h-9 px-4 text-[13px] font-medium rounded-md text-white disabled:opacity-60 ${
        danger
          ? "bg-red-500 hover:bg-red-600"
          : "bg-vd-green hover:bg-vd-green-dark"
      }`}
    >
      {loading ? "..." : label}
    </button>
  );
}

export default function Admin() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    if (user && user.role !== "admin") navigate("/");
  }, [user, navigate]);

  const skip = !user || user.role !== "admin";

  const { data: pendingData, isLoading: pendingLoading } = useGetPendingQuery(
    undefined,
    { skip },
  );
  const { data: analyticsData } = useGetAnalyticsQuery(undefined, { skip });

  const { data: lawsData } = useGetLawsQuery(undefined, {
    skip: skip || tab !== "laws",
  });
  const { data: pollsData } = useGetPollsQuery(undefined, {
    skip: skip || tab !== "polls",
  });
  const { data: candidatesData } = useGetCandidatesQuery(undefined, {
    skip: skip || tab !== "candidates",
  });

  const [approveNews, { isLoading: approvingNews }] = useApproveNewsMutation();
  const [approveEvent, { isLoading: approvingEvent }] =
    useApproveEventMutation();
  const [approvePost, { isLoading: approvingPost }] = useApprovePostMutation();
  const [approvePetition, { isLoading: approvingPetition }] =
    useApprovePetitionMutation();

  const [deleteNews, { isLoading: deletingNews }] = useDeleteNewsMutation();
  const [deleteEvent, { isLoading: deletingEvent }] = useDeleteEventMutation();
  const [removePost, { isLoading: removingPost }] = useRemovePostMutation();
  const [deletePetition, { isLoading: deletingPetition }] =
    useDeletePetitionMutation();
  const [deleteLaw, { isLoading: deletingLaw }] = useDeleteLawMutation();
  const [deletePoll, { isLoading: deletingPoll }] = useDeletePollMutation();
  const [deleteCandidate, { isLoading: deletingCandidate }] =
    useDeleteCandidateMutation();

  const confirmDelete = (fn, id) => {
    if (window.confirm("Delete this item? This cannot be undone.")) {
      fn(id);
    }
  };

  const newsList = pendingData?.pendingNews || [];
  const eventsList = pendingData?.pendingEvents || [];
  const postsList = pendingData?.allPosts || [];
  const petitions = pendingData?.petitions || [];
  const laws = lawsData?.laws || [];
  const polls = pollsData?.polls || [];
  const candidates = candidatesData?.candidates || [];
  const analytics = analyticsData?.analytics || {};

  if (!user || user.role !== "admin") {
    return (
      <p className="text-center py-20 text-gray-500">Checking access...</p>
    );
  }

  return (
    <div>
      <div className="bg-[#e1e1e1] border border-[#00000031]">
        <section className="w-[80%] mx-auto pt-14 pb-10 pl-10 px-4 sm:px-6">
          <p className="text-[13px] font-extrabold text-vd-green tracking-wide uppercase mb-3">
            Admin
          </p>
          <h1 className="text-[2.4rem] sm:text-[2.75rem] font-bold tracking-tight text-gray-900 leading-tight mb-2">
            Dashboard
          </h1>
          <p className="text-[15.5px] text-gray-600 mb-6">
            Approve content, moderate discussions, and view basic stats.
          </p>

          <div className="flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`h-9 px-4 text-[13px] font-medium rounded-full border transition-colors ${
                  tab === t.id
                    ? "bg-vd-green text-white border-vd-green"
                    : "bg-white text-gray-700 border-gray-200 hover:border-vd-green"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </section>
      </div>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        {pendingLoading && (
          <p className="text-center text-gray-500">Loading...</p>
        )}

        {tab === "overview" && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              ["Users", analytics.userCount],
              ["News", analytics.newsCount],
              ["Events", analytics.eventCount],
              ["Posts", analytics.postCount],
              ["Petitions", analytics.petitionCount],
            ].map(([label, value]) => (
              <div
                key={label}
                className="bg-white border border-[#00000031] rounded-xl p-4 text-center"
              >
                <div className="text-2xl font-bold text-gray-900">
                  {value ?? "—"}
                </div>
                <div className="text-[12px] text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "news" && (
          <Section title={`News (${newsList.length})`}>
            {newsList.length === 0 && <Empty text="No news." />}
            {newsList.map((n) => (
              <Row
                key={n._id}
                title={n.title}
                subtitle={`${n.category || "—"} · ${n.status || "—"} · ${
                  n.author?.name || "—"
                } · ${
                  n.createdAt ? new Date(n.createdAt).toLocaleDateString() : ""
                }`}
              >
                {n.status === "pending" && (
                  <Action
                    loading={approvingNews}
                    onClick={() => approveNews(n._id)}
                    label="Approve"
                  />
                )}
                <Action
                  danger
                  loading={deletingNews}
                  onClick={() => confirmDelete(deleteNews, n._id)}
                  label="Delete"
                />
              </Row>
            ))}
          </Section>
        )}

        {tab === "events" && (
          <Section title={`Events (${eventsList.length})`}>
            {eventsList.length === 0 && <Empty text="No events." />}
            {eventsList.map((e) => (
              <Row
                key={e._id}
                title={e.title}
                subtitle={`${e.category || "—"} · ${e.location || "—"} · ${
                  e.status || "—"
                } · by ${e.organizer?.name || "User"}`}
              >
                {e.status === "pending" && (
                  <Action
                    loading={approvingEvent}
                    onClick={() => approveEvent(e._id)}
                    label="Approve"
                  />
                )}
                <Action
                  danger
                  loading={deletingEvent}
                  onClick={() => confirmDelete(deleteEvent, e._id)}
                  label="Delete"
                />
              </Row>
            ))}
          </Section>
        )}

        {tab === "posts" && (
          <Section title={`Posts (${postsList.length})`}>
            {postsList.length === 0 && <Empty text="No posts." />}
            {postsList.map((p) => (
              <Row
                key={p._id}
                title={p.title}
                subtitle={`${p.category || "—"} · ${p.status || "—"} · by ${
                  p.author?.name || "User"
                }`}
              >
                {p.status === "pending" && (
                  <Action
                    loading={approvingPost}
                    onClick={() => approvePost(p._id)}
                    label="Approve"
                  />
                )}
                <Action
                  danger
                  loading={removingPost}
                  onClick={() => confirmDelete(removePost, p._id)}
                  label="Delete"
                />
              </Row>
            ))}
          </Section>
        )}

        {tab === "petitions" && (
          <Section title={`Petitions (${petitions.length})`}>
            {petitions.length === 0 && <Empty text="No petitions." />}
            {petitions.map((p) => (
              <Row
                key={p._id}
                title={p.title}
                subtitle={`${p.category || "—"} · ${p.status || "—"} · ${
                  p.signedUsers?.length || 0
                } / ${p.goal || 0} signatures`}
              >
                {p.status === "pending" && (
                  <Action
                    loading={approvingPetition}
                    onClick={() => approvePetition(p._id)}
                    label="Approve"
                  />
                )}
                <Action
                  danger
                  loading={deletingPetition}
                  onClick={() => confirmDelete(deletePetition, p._id)}
                  label="Delete"
                />
              </Row>
            ))}
          </Section>
        )}

        {tab === "laws" && (
          <Section title={`Laws (${laws.length})`}>
            {laws.length === 0 && <Empty text="No laws." />}
            {laws.map((l) => (
              <Row
                key={l._id}
                title={`${l.billNumber || ""} — ${l.title}`}
                subtitle={`${l.chamber || "—"} · ${l.status || "—"} · ${
                  l.supportPercent ?? 0
                }% support`}
              >
                <Action
                  danger
                  loading={deletingLaw}
                  onClick={() => confirmDelete(deleteLaw, l._id)}
                  label="Delete"
                />
              </Row>
            ))}
          </Section>
        )}

        {tab === "polls" && (
          <Section title={`Polls (${polls.length})`}>
            {polls.length === 0 && <Empty text="No polls." />}
            {polls.map((p) => (
              <Row
                key={p._id}
                title={p.question}
                subtitle={`${p.options?.length || 0} options · ${
                  p.votedUsers?.length || 0
                } votes · ${p.isFeatured ? "Featured" : "Standard"}`}
              >
                <Action
                  danger
                  loading={deletingPoll}
                  onClick={() => confirmDelete(deletePoll, p._id)}
                  label="Delete"
                />
              </Row>
            ))}
          </Section>
        )}

        {tab === "candidates" && (
          <Section title={`Candidates (${candidates.length})`}>
            {candidates.length === 0 && <Empty text="No candidates." />}
            {candidates.map((c) => (
              <Row
                key={c._id}
                title={c.name}
                subtitle={`${c.office || "—"} · ${c.party || "—"} · ${[
                  c.city,
                  c.state,
                ]
                  .filter(Boolean)
                  .join(", ")}`}
              >
                <Action
                  danger
                  loading={deletingCandidate}
                  onClick={() => confirmDelete(deleteCandidate, c._id)}
                  label="Delete"
                />
              </Row>
            ))}
          </Section>
        )}
      </section>
    </div>
  );
}
