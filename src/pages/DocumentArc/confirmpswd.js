import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./pswdresetpagecss/reset.css";

const ConfirmPswd = () => {
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Minimum 8 characters required")
      .matches(/[a-z]/, "At least one lowercase letter required")
      .matches(/[A-Z]/, "At least one uppercase letter required")
      .matches(/\d/, "At least one number required")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert("Password reset successful!");
      // Handle form submission (e.g., API call)
    },
  });

  return (
    <>
      <div className="auth-page-wrapper pt-5">
        <div
          className="auth-one-bg-position"
          style={{ backgroundColor: "#3D38F5" }}
          id="auth-particles"
        >
          <div className="bg-overlay"></div>

          <div className="shape">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
              <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
            </svg>
          </div>
        </div>

        <div className="auth-page-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <p className="mt-3 fs-15 fw-bold">Document Archival Logo</p>
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6 col-xl-5">
                <div className="card mt-4">
                  <div className="card-body p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Create new password</h5>
                      <p className="text-muted">
                        Your new password must be different from previous used
                        password.
                      </p>
                    </div>

                    <div className="p-2">
                      <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="password-input"
                          >
                            Password
                          </label>
                          <div className="position-relative auth-pass-inputgroup">
                            <input
                              type="password"
                              className={`form-control pe-5 password-input ${
                                formik.touched.password &&
                                formik.errors.password
                                  ? "is-invalid"
                                  : ""
                              }`}
                              onPaste={(e) => e.preventDefault()}
                              placeholder="Enter password"
                              id="password-input"
                              {...formik.getFieldProps("password")}
                            />
                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                              type="button"
                              id="password-addon"
                            >
                              <i className="ri-eye-fill align-middle"></i>
                            </button>
                          </div>
                          {formik.touched.password && formik.errors.password ? (
                            <div className="invalid-feedback">
                              {formik.errors.password}
                            </div>
                          ) : (
                            <div id="passwordInput" className="form-text">
                              Must be at least 8 characters.
                            </div>
                          )}
                        </div>

                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="confirm-password-input"
                          >
                            Confirm Password
                          </label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <input
                              type="password"
                              className={`form-control pe-5 password-input ${
                                formik.touched.confirmPassword &&
                                formik.errors.confirmPassword
                                  ? "is-invalid"
                                  : ""
                              }`}
                              onPaste={(e) => e.preventDefault()}
                              placeholder="Confirm password"
                              id="confirm-password-input"
                              {...formik.getFieldProps("confirmPassword")}
                            />
                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                              type="button"
                              id="confirm-password-addon"
                            >
                              <i className="ri-eye-fill align-middle"></i>
                            </button>
                          </div>
                          {formik.touched.confirmPassword &&
                          formik.errors.confirmPassword ? (
                            <div className="invalid-feedback">
                              {formik.errors.confirmPassword}
                            </div>
                          ) : null}
                        </div>

                        <div
                          id="password-contain"
                          className="p-3 bg-light mb-2 rounded"
                        >
                          <h5 className="fs-13">Password must contain:</h5>
                          <p
                            id="pass-length"
                            className={`fs-12 mb-2 ${
                              formik.values.password.length >= 8
                                ? "valid"
                                : "invalid"
                            }`}
                          >
                            Minimum <b>8 characters</b>
                          </p>
                          <p
                            id="pass-lower"
                            className={`fs-12 mb-2 ${
                              /[a-z]/.test(formik.values.password)
                                ? "valid"
                                : "invalid"
                            }`}
                          >
                            At least <b>one lowercase</b> letter (a-z)
                          </p>
                          <p
                            id="pass-upper"
                            className={`fs-12 mb-2 ${
                              /[A-Z]/.test(formik.values.password)
                                ? "valid"
                                : "invalid"
                            }`}
                          >
                            At least <b>one uppercase</b> letter (A-Z)
                          </p>
                          <p
                            id="pass-number"
                            className={`fs-12 mb-0 ${
                              /\d/.test(formik.values.password)
                                ? "valid"
                                : "invalid"
                            }`}
                          >
                            At least <b>one number</b> (0-9)
                          </p>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="auth-remember-check"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="auth-remember-check"
                          >
                            Remember me
                          </label>
                        </div>

                        <div className="mt-4">
                          <button className="resetLinkBtn w-100" type="submit">
                            Reset Password
                          </button>
                        </div>
                        {formik.status && (
                          <div
                            className="alert alert-warning mt-2"
                            role="alert"
                          >
                            {formik.status}
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Wait, I remember my password...{" "}
                    <a
                      href="auth-signin-basic.html"
                      className="fw-semibold text-decoration-underline"
                      style={{ color: "#3D38F5" }}
                    >
                      {" "}
                      Go to LoginPage{" "}
                    </a>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmPswd;
