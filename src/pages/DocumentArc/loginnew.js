import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "remixicon/fonts/remixicon.css";
// import "./pswdresetpagecss/reset.css";
import authBg from "../../assets/images/document.jpg";

const LoginNew = () => {
  return (
    <>
      <div class="auth-page-wrapper pt-5">
        <div
          class="auth-one-bg-position"
          style={{
            backgroundColor: "#3D38F5",
          }}
          id="auth-particles"
        >
          <div class="bg-overlay"></div>

          <div class="shape">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              //   xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 1440 120"
            >
              <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
            </svg>
          </div>
        </div>

        <div class="auth-page-content">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <a href="index.html" class="d-inline-block auth-logo">
                      <img
                        src="assets/images/logo-light.png"
                        alt=""
                        height="20"
                      />
                    </a>
                  </div>
                  <p class="mt-3 fs-15 fw-bold">Document Archival Logo</p>
                </div>
              </div>
            </div>

            <div class="row justify-content-center">
              <div class="col-md-8 col-lg-6 col-xl-5">
                <div class="card mt-4">
                  <div class="card-body p-4">
                    <div class="text-center mt-2">
                      <h5 style={{ color: "#3D38F5" }}>Welcome Back !</h5>
                      <p class="text-muted">Sign in to continue to Velzon.</p>
                    </div>
                    <div class="p-2 mt-4">
                      <form action="index.html">
                        <div class="mb-3">
                          <label for="username" class="form-label">
                            Username
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="username"
                            placeholder="Enter username"
                          />
                        </div>

                        <div class="mb-3">
                          <div class="float-end">
                            <a
                              href="auth-pass-reset-basic.html"
                              class="text-muted"
                            >
                              Forgot password?
                            </a>
                          </div>
                          <label class="form-label" for="password-input">
                            Password
                          </label>
                          <div class="position-relative auth-pass-inputgroup mb-3">
                            <input
                              type="password"
                              class="form-control pe-5 password-input"
                              placeholder="Enter password"
                              id="password-input"
                            />
                            <button
                              class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                              type="button"
                              id="password-addon"
                            >
                              <i class="ri-eye-fill align-middle"></i>
                            </button>
                          </div>
                        </div>

                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="auth-remember-check"
                          />
                          <label
                            class="form-check-label"
                            for="auth-remember-check"
                          >
                            Remember me
                          </label>
                        </div>

                        <div class="mt-4">
                          <button class="resetLinkBtn w-100" type="submit">
                            Sign In
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginNew;
