import { useState } from "react";
import auth from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // reseting the error state
    setError("");
    setSuccess("");

    const email = e.target.email.value;
    const password = e.target.password.value;
    const agreed = e.target.agree.checked;

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
    if (!agreed) {
      setError("You must agree with the terms and policy!");
      return;
    }

    // All the above condition is satisfied: now create user with the email and password to login
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        if (res.user) {
          setSuccess("Congratulations! You have created Account sucessfully.");
        }
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
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
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control flex-row">
              <input id="agree" type="checkbox" name="agree" />
              <label htmlFor="agree" className="label">
                <span className="label-text">
                  I agree with the terms and conditions
                </span>
              </label>
            </div>

            <div>
              <p>
                Already have an account?{" "}
                <Link className="underline text-blue" to={"/login"}>
                  Login Here
                </Link>
              </p>
            </div>

            {success && !error && <p className="text-success">{success}</p>}
            {error && !success && <p className="text-error">{error}</p>}

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
