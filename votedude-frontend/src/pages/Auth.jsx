import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";

import {
  useGoogleLoginMutation,
  useLoginMutation,
  useRegisterMutation,
} from "../redux/services/authApi";

import { setCredentials } from "../redux/reducers/authSlice";

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (authUser) navigate("/profile");
  }, [authUser, navigate]);

  const [isLogin, setIsLogin] = useState(location.state?.login ?? true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
  });

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [googleLogin] = useGoogleLoginMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (isLogin) {
        response = await login({
          email: formData.email,
          password: formData.password,
        }).unwrap();
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match");
          return;
        }

        response = await register({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          password: formData.password,
          city: formData.city,
        }).unwrap();
      }

      dispatch(setCredentials({ user: response.user, token: response.token }));
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error?.data?.message || "Authentication failed");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await googleLogin(
        credentialResponse.credential,
      ).unwrap();

      dispatch(setCredentials({ user: response.user, token: response.token }));
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err?.data?.message || "Google login failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-16">
      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl w-full items-center">
        <div className="hidden lg:block">
          <p className="text-vd-green font-semibold uppercase tracking-widest">
            Vote Dude
          </p>

          <h1 className="text-5xl font-black text-slate-900 mt-4 leading-tight">
            Vote.
            <br />
            Play.
            <br />
            Lead.
          </h1>

          <p className="text-slate-600 mt-6 text-lg leading-8">
            Join thousands of men staying informed, participating in local
            events, joining sports leagues, discussing community issues and
            making their voices heard.
          </p>

          <div className="space-y-4 mt-10">
            <div className="bg-white rounded-xl shadow p-4">
              🗳️ Stay informed with trusted civic news.
            </div>
            <div className="bg-white rounded-xl shadow p-4">
              🏀 Join local sports leagues.
            </div>
            <div className="bg-white rounded-xl shadow p-4">
              🤝 Build a stronger community.
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-slate-500 mt-2">
              {isLogin
                ? "Sign in to continue."
                : "Join the VoteDude community."}
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Google Login Failed")}
            />
          </div>

          <div className="flex items-center gap-3 mb-6">
            <hr className="flex-1" />
            <span className="text-slate-400 text-sm">OR</span>
            <hr className="flex-1" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-vd-green"
                />
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-vd-green"
                />
              </div>
            )}

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-vd-green"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-vd-green"
            />

            {!isLogin && (
              <>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-vd-green"
                />
                <input
                  name="city"
                  type="text"
                  placeholder="City (Optional)"
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-vd-green"
                />
              </>
            )}

            <button
              type="submit"
              className="w-full bg-vd-green hover:bg-vd-green transition cursor-pointer text-white rounded-xl py-3 font-semibold"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="text-center mt-6">
            {isLogin ? (
              <p className="text-slate-600">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-vd-green font-semibold hover:underline cursor-pointer"
                >
                  Create Account
                </button>
              </p>
            ) : (
              <p className="text-slate-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-vd-green font-semibold hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/"
              className="text-slate-500 hover:text-vd-green text-sm cursor-pointer"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
