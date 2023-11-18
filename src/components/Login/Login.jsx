import auth from "../../firebase/config";
import {
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, signInWithGithub } =
    useContext(AuthContext);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const email = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();

    // reseting the error state
    setError("");
    setSuccess("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    const emailReg = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
    if (!(email && emailReg.test(email))) {
      setError("Pleaes Enter a valid email!");
      return;
    }
    if (!(password.length >= 6)) {
      setError("Password must be at least 6 characters!");
      return;
    }

    if (!/[a-z]/g.test(password)) {
      setError("Password must includes lowercase character");
      return;
    }
    if (!/[A-Z]/g.test(password)) {
      setError("Password must includes uppercase character");
      return;
    }
    if (!/[0-9]/g.test(password)) {
      setError("Password must includes numeric value");
      return;
    }

    // All the above condition is satisfied: now login with the newly created user
    signIn(email, password)
      .then((res) => {
        console.log(res.user);
        if (!res.user.emailVerified) {
          sendEmailVerification(res.user)
            .then(() => {
              setSuccess("Verification email has sent to you!");
            })
            .catch((error) => setError(error.message));
          setError("You are not verified. Check your email to verify!");
          return;
        } else {
          setSuccess("You have logged in successfully!");
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleResetPassword = () => {
    setError("");

    if (!email.current.value) {
      setError("You must provide email to reset password!");
      return;
    }

    // send password reset email
    sendPasswordResetEmail(auth, email.current.value)
      .then(() => setSuccess("Password reset email sent. Check Email."))
      .catch((error) => setError(error.message));
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((res) => {
        console.log(res.user);
        navigate("/dashboard");
      })
      .catch((error) => console.error(error));
  };

  const handleGithubLogin = () => {
    signInWithGithub()
      .then((res) => {
        console.log(res.user);
        navigate("/dashboard");
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                ref={email}
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label" onClick={handleResetPassword}>
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div>
              <p>
                Don't have an account?{" "}
                <Link className="underline text-blue" to={"/register"}>
                  Register Here
                </Link>
              </p>
            </div>
            {error && <p className="text-error">{error}</p>}
            {success && <p className="text-success">{success}</p>}
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>

          <div className="text-center">OR</div>
          <div className="flex justify-center gap-4 pb-10">
            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline btn-sm mt-3"
            >
              Google
            </button>
            <button
              onClick={handleGithubLogin}
              className="btn btn-outline btn-sm mt-3"
            >
              Github
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
