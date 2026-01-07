import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { signupAction, signupActionReset } from "../../../Redux/Auth/action";
import backgroundImage from "../../../assets/images/login_background.png";
import logoImage from "../../../assets/images/app_logo.png";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, error } = useSelector((state) => state.signupReducer);

  useEffect(() => {
    if (data && data.success) {
      toast.dismiss("signup-loading");
      toast.success(data.message || "User registered successfully");
      dispatch(signupActionReset());
      navigate("/login");
    }
    if (error) {
      toast.dismiss("signup-loading");
      toast.error(error.message || "Registration failed");
      dispatch(signupActionReset());
    }
  }, [data, error, dispatch, navigate]);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    let newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.userName.trim()) {
      newErrors.userName = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to terms and conditions";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    toast.loading("Creating account...", { toastId: "signup-loading" });
    
    dispatch(signupAction({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      username: formData.userName,
      password: formData.password,
      treamandcondition: formData.agreeTerms
    }));
  };

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
                <div className="col-8">
                  <p className="mb-0" style={{ fontSize: "21px" }}>
                    Welcome to{" "}
                    <span className="text-danger fw-bold">Chapel farm</span>
                  </p>
                  <p className="mb-4" style={{ fontSize: "31px" }}>
                    Sign up
                  </p>
                </div>
                <div className="col-4 d-flex pt-2">
                  <div className="mb-3" style={{ fontSize: "13px" }}>
                    <p className="mb-0">Have an Account?</p>
                    <p
                      className="text-danger fw-semibold"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
              
                
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        className="form-control custom-input"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) => {
                          let value = e.target.value;
                          if (value.length > 0 && value[0] === " ") {
                            value = value.trimStart();
                          }
                          setFormData({ ...formData, firstName: value });
                          if (errors.firstName) {
                            setErrors({ ...errors, firstName: "" });
                          }
                        }}
                      />
                      {errors.firstName && (
                        <small className="text-danger">{errors.firstName}</small>
                      )}
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-control custom-input"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) => {
                          let value = e.target.value;
                          if (value.length > 0 && value[0] === " ") {
                            value = value.trimStart();
                          }
                          setFormData({ ...formData, lastName: value });
                          if (errors.lastName) {
                            setErrors({ ...errors, lastName: "" });
                          }
                        }}
                      />
                      {errors.lastName && (
                        <small className="text-danger">{errors.lastName}</small>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    placeholder="Username"
                    value={formData.userName}
                    onChange={(e) => {
                      let value = e.target.value;
                      if (value.length > 0 && value[0] === " ") {
                        value = value.trimStart();
                      }
                      setFormData({ ...formData, userName: value });
                      if (errors.userName) {
                        setErrors({ ...errors, userName: "" });
                      }
                    }}
                  />
                  {errors.userName && (
                    <small className="text-danger">{errors.userName}</small>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control custom-input"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => {
                      let value = e.target.value;
                      if (value.length > 0 && value[0] === " ") {
                        value = value.trimStart();
                      }
                      setFormData({ ...formData, email: value });
                      if (errors.email) {
                        setErrors({ ...errors, email: "" });
                      }
                    }}
                  />
                  {errors.email && (
                    <small className="text-danger">{errors.email}</small>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control custom-input"
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => {
                        let value = e.target.value;
                        if (value.length > 0 && value[0] === " ") {
                          value = value.trimStart();
                        }
                        setFormData({ ...formData, password: value });
                        if (errors.password) {
                          setErrors({ ...errors, password: "" });
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
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.4.53-2.2.53-2.76 0-5-2.24-5-5 0-.8.2-1.53.53-2.2z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <small className="text-danger">{errors.password}</small>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <div className="position-relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control custom-input"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={(e) => {
                        let value = e.target.value;
                        if (value.length > 0 && value[0] === " ") {
                          value = value.trimStart();
                        }
                        setFormData({ ...formData, confirmPassword: value });
                        if (errors.confirmPassword) {
                          setErrors({ ...errors, confirmPassword: "" });
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
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.4.53-2.2.53-2.76 0-5-2.24-5-5 0-.8.2-1.53.53-2.2z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <small className="text-danger">{errors.confirmPassword}</small>
                  )}
                </div>

                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={(e) => {
                        setFormData({ ...formData, agreeTerms: e.target.checked });
                        if (errors.agreeTerms) {
                          setErrors({ ...errors, agreeTerms: "" });
                        }
                      }}
                    />
                    <label className="form-check-label" htmlFor="agreeTerms">
                      I agree to all terms and conditions
                    </label>
                  </div>
                  {errors.agreeTerms && (
                    <small className="text-danger">{errors.agreeTerms}</small>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn w-100 mt-3 text-white"
                  style={{
                    background: "linear-gradient(to bottom, #800020, rgb(159 35 25))",
                    border: "none",
                    padding: "12px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    height: "54px",
                  }}
                  disabled={loading}
                >
                   {loading ? "Registering..." : "Register"} 
                  {/* Register */}

                </button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
