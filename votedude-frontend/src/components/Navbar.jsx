import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useGetMeQuery, useLogoutMutation } from "../redux/services/authApi";
import { logout as logoutAction } from "../redux/reducers/authSlice";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Candidates", path: "/candidates" },
  { name: "Issues", path: "/issues" },
  { name: "Laws", path: "/laws" },
  { name: "Petitions", path: "/petitions" },
  { name: "Vote", path: "/vote" },
  { name: "News", path: "/news" },
  { name: "Discuss", path: "/discuss" },
  { name: "Events", path: "/events" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  // isLoading / isFetching = still checking cookie via /me
  const { isLoading, isFetching } = useGetMeQuery();
  const checkingAuth = isLoading || isFetching;

  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } catch (_) {
      // ignore network errors on logout
    }
    dispatch(logoutAction());
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-display font-black text-lg tracking-tight"
        >
          <img src="/logo-white.png" alt="Logo" className="w-[25vh]" />
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-vd-black/80">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-vd-green transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop auth buttons */}
        <div className="hidden lg:flex items-center gap-4 min-w-[140px] justify-end">
          {checkingAuth ? (
            // optional: small placeholder so layout doesn't jump
            <div className="h-9 w-20 rounded-md bg-gray-100 animate-pulse" />
          ) : user ? (
            <>
              <button
                onClick={() => {
                  handleLogout();
                }}
                className="bg-vd-green hover:bg-vd-green-dark transition-colors text-white text-sm font-bold px-5 py-2.5 rounded-md cursor-pointer"
              >
                Logout
              </button>
              {user.firstName && user.lastName ? (
                <div>Hi, {user.firstName + " " + user.lastName}</div>
              ) : (
                <div>Hi, {user.name}</div>
              )}
            </>
          ) : (
            <>
              <Link to="/auth" state={{ login: true }}>
                <button className="text-sm font-semibold cursor-pointer">
                  Log In
                </button>
              </Link>
              <Link to="/auth" state={{ login: false }}>
                <button className="bg-vd-green hover:bg-vd-green-dark transition-colors text-white text-sm font-bold px-5 py-2.5 rounded-md cursor-pointer">
                  JOIN NOW
                </button>
              </Link>
            </>
          )}
        </div>

        <button
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-vd-black mb-1.5" />
          <span className="block w-6 h-0.5 bg-vd-black mb-1.5" />
          <span className="block w-6 h-0.5 bg-vd-black" />
        </button>
      </div>

      {open && (
        <nav className="lg:hidden px-6 pb-4 flex flex-col gap-3 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} onClick={() => setOpen(false)}>
              {link.name}
            </Link>
          ))}

          {!checkingAuth &&
            (user ? (
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="bg-vd-green hover:bg-vd-green-dark transition-colors text-white text-sm font-bold px-5 py-2.5 rounded-md cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/auth"
                state={{ login: false }}
                onClick={() => setOpen(false)}
              >
                <button className="bg-vd-green text-white font-bold px-5 py-2.5 rounded-md mt-2">
                  JOIN NOW
                </button>
              </Link>
            ))}
        </nav>
      )}
    </header>
  );
}
