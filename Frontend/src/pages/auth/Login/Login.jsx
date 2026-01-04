import  {  useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, loginActionReset } from "../../../Redux/Auth/action";
import backgroundImage from "../../../assets/images/login_background.png";
import logoImage from "../../../assets/images/app_logo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    identifier: "",
    password: "",
  });
  const dispatch = useDispatch();

  const store = useSelector((state) => state);
  const loginReducerData = store?.loginReducer?.data;
  const loginError = store?.loginReducer?.error;

  // LOGIN HANDLER
  const handleLogin = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setErrors({});

    let newErrors = {};

    if (!credentials.identifier.trim()) {
      newErrors.identifier = "Email or username is required";
    }

    if (!credentials.password.trim())
      newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(loginAction({ identifier: credentials.identifier, password: credentials.password }));
  };

  useEffect(() => {
    if (loginReducerData) {
      if (loginReducerData?.status === 200) {
        toast.success(loginReducerData?.message);
        navigate('/dashboard');
        dispatch(loginActionReset());
      }
    }
    
    if (loginError) {
      toast.error(loginError?.message || "Login failed");
      dispatch(loginActionReset());
    }
  }, [loginReducerData, loginError, navigate, dispatch]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
      }}
    >
      {/* DARK OVERLAY */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      ></div>

      <div className="container" style={{ zIndex: 2 }}>
        <div className="row" style={{ minHeight: "100vh" }}>
          {/* LEFT SECTION */}
          <div className="col-6 d-flex justify-content-center align-items-center">
            <div className="text-center text-white">
              <img
                src={logoImage}
                alt="Logo"
                width="159"
                height="238"
                className="mb-4"
              />
              <h2 style={{ fontSize: "37px", fontWeight: "700" }}>
                Lorem Ipsum is simply
              </h2>
              <p style={{ fontSize: "20px" }}>Lorem Ipsum is simply</p>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="col-6 d-flex justify-content-center align-items-center">
            <Card
              style={{
                width: "539px",
                borderRadius: "15px",
                padding: "35px",
                boxShadow: "0 4px 35px rgba(0,0,0,0.25)",
                background: "rgba(255,255,255,0.97)",
              }}
            >
              <div className="row">
                <div className="col-9">
                  <p className="mb-0" style={{ fontSize: "21px" }}>
                    Welcome to{" "}
                    <span className="text-danger fw-bold">Chapel farm</span>
                  </p>
                  <p className="mb-4" style={{ fontSize: "31px" }}>
                    Sign in
                  </p>
                </div>
              </div>

              <form onSubmit={handleLogin}>
                {/* USERNAME */}
                <div className="mb-3">
                  <label className="form-label">
                    Enter your email or username
                  </label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    placeholder="Email or Username"
                    value={credentials.identifier}
                    onChange={(e) => {
                      let value = e.target.value;
                      if (value.length > 0 && value[0] === " ") {
                        value = value.trimStart();
                      }
                      setCredentials({
                        ...credentials,
                        identifier: value,
                      });
                      if (errors.identifier) {
                        setErrors({
                          ...errors,
                          identifier: "",
                        });
                      }
                    }}
                  />
                  {errors.identifier && (
                    <small className="text-danger">{errors.identifier}</small>
                  )}
                </div>

                {/* PASSWORD */}
                <div className="mb-2">
                  <label className="form-label">Password</label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control custom-input"
                      placeholder="Password"
                      value={credentials.password}
                      onChange={(e) => {
                        let value = e.target.value;
                        if (value.length > 0 && value[0] === " ") {
                          value = value.trimStart();
                        }
                        setCredentials({
                          ...credentials,
                          password: value,
                        });
                        if (errors.password) {
                          setErrors({
                            ...errors,
                            password: "",
                          });
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="btn position-absolute"
                      style={{
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        border: "none",
                        background: "transparent",
                        padding: "0",
                        color: "#6c757d",
                      }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        </svg>
                      ) : (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <small className="text-danger">{errors.password}</small>
                  )}
                </div>

                {/* LOGIN BUTTON */}
                <div className="d-grid gap-2 mb-3">
                  <button
                    type="submit"
                    className="btn btn-danger"
                    style={{
                      padding: "12px",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Sign In
                  </button>
                </div>

                {/* SIGNUP LINK */}
                <div className="text-center">
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      className="btn btn-link p-0 text-decoration-none"
                      onClick={() => navigate('/signup')}
                      style={{ color: "#800020", fontWeight: "600" }}
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;