import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase/config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export function WelcomePage() {
  const [showForm, setShowForm] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      let userCredential;

      if (isRegistering) {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
      } else {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
      }

      const user = userCredential.user;

      dispatch(
        login({
          email: user.email,
          name: user.email.split("@")[0],
        }),
      );

      navigate("/starships");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
  <div
  className="
    min-h-screen w-full flex flex-col items-center justify-center 
    bg-black 
    md:bg-[url('/public/background/dsk_bg.png')]
    md:bg-cover md:bg-center
    px-4
  "
>



      {!showForm && (
        <div className="md:hidden mb-10">
          <img
            src={`${import.meta.env.BASE_URL}logo_mobile/star-wars-logo-png.png`}
            alt="Star Wars Logo"
            className="w-48 mx-auto object-contain"
          />
        </div>
      )}

      {!showForm ? (
        <div
          onClick={() => setShowForm(true)}
          className="cursor-pointer group flex flex-col items-center justify-start
             mt-10 md:mt-110 mr-18"
        >
          <div
            className="
      w-48 h-20 
      sm:w-64 sm:h-32 
      border-2 border-yellow-500/20 
      rounded-full flex items-center justify-center 
      transition-all
      shadow-[0_0_12px_rgba(255,255,0,0.3)]
      hover:shadow-[0_0_20px_rgba(255,255,0,0.6)]
      hover:scale-105
      animate-pulse
    "
          >
            <span
              className="
        text-yellow-500 
        text-[9px] sm:text-[10px] 
        tracking-[0.3em] sm:tracking-[1em] 
        uppercase transition-all
        opacity-100
        active:text-yellow-00 active:scale-105
       
      "
            >
              Enter
            </span>
          </div>
        </div>
      ) : (
        <div className="z-20 animate-fade-in w-full max-w-xs sm:max-w-sm">
          <form
            onSubmit={handleSubmit}
            className="
              space-y-4 
              bg-black/60 
              p-6 sm:p-8 
              rounded-lg 
              backdrop-blur-md 
              border border-white/10
            "
          >
            <h2 className="text-white text-center text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-6">
              {isRegistering ? "New Cadet Registration" : "Imperial Identity"}
            </h2>

            {error && (
              <p className="text-red-500 text-[10px] text-center uppercase mb-4 italic">
                {error}
              </p>
            )}

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL"
              className="
                w-full bg-transparent 
                border-b border-zinc-700 
                py-2 text-white text-center 
                focus:outline-none focus:border-yellow-500 
                text-sm
              "
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="PASSWORD"
              className="
                w-full bg-transparent 
                border-b border-zinc-700 
                py-2 text-white text-center 
                focus:outline-none focus:border-yellow-500 
                text-sm
              "
              required
            />

            <button
              type="submit"
              className="
                w-full border border-yellow-500 
                text-yellow-500 py-3 
                text-[10px] font-bold uppercase tracking-widest 
                hover:bg-yellow-500 hover:text-black 
                transition-all
              "
            >
              {isRegistering ? "Create Account" : "Login"}
            </button>

            <div className="flex flex-col gap-2 mt-4">
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-zinc-400 text-[9px] uppercase tracking-widest hover:text-yellow-500"
              >
                {isRegistering
                  ? "Already have an account? Login"
                  : "Don't have an account? Sign Up"}
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-zinc-600 text-[9px] uppercase hover:text-white"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
