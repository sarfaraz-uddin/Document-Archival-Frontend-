import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "remixicon/fonts/remixicon.css";
import "./pswdresetpagecss/reset.css";
import authBg from "../../assets/images/auth-one-bg.jpg";

const LoginPage = () => {
  return (
    <>
      <div class="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
        <div class="bg-overlay"></div>
        <div class="auth-page-content overflow-hidden pt-lg-5">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="card overflow-hidden">
                  <div class="row g-0">
                    <div
                      class="col-lg-6"
                      style={{
                        backgroundImage: `url(${authBg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                      }}
                    >
                      <div
                        class="p-lg-5 p-4 h-100"
                        style={{ backgroundColor: "rgba(173, 216, 230, 0.5)" }}
                      >
                        <div class="bg-overlay"></div>
                        <div class="position-relative h-100 d-flex flex-column">
                          <div class="mt-auto">
                            <div class="mb-3">
                              <i class="ri-double-quotes-l display-4 text-success"></i>
                            </div>

                            <div
                              id="qoutescarouselIndicators"
                              class="carousel slide"
                              data-bs-ride="carousel"
                            >
                              <div class="carousel-indicators">
                                <button
                                  type="button"
                                  data-bs-target="#qoutescarouselIndicators"
                                  data-bs-slide-to="0"
                                  class="active"
                                  aria-current="true"
                                  aria-label="Slide 1"
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#qoutescarouselIndicators"
                                  data-bs-slide-to="1"
                                  aria-label="Slide 2"
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#qoutescarouselIndicators"
                                  data-bs-slide-to="2"
                                  aria-label="Slide 3"
                                ></button>
                              </div>
                              <div class="carousel-inner text-center text-white-50 pb-5">
                                <div class="carousel-item active">
                                  <p class="fs-15 fst-italic">
                                    " Great! Clean code, clean design, easy for
                                    customization. Thanks very much! "
                                  </p>
                                </div>
                                <div class="carousel-item">
                                  <p class="fs-15 fst-italic">
                                    " The theme is really great with an amazing
                                    customer support."
                                  </p>
                                </div>
                                <div class="carousel-item">
                                  <p class="fs-15 fst-italic">
                                    " Great! Clean code, clean design, easy for
                                    customization. Thanks very much! "
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-6">
                      <div class="p-lg-5 p-4">
                        <div>
                          <h5 class="text-primary">Welcome Back !</h5>
                          <p class="text-muted">
                            Login to continue to Document Archival.
                          </p>
                        </div>

                        <div class="mt-4">
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
                              <div class="float-end">
                                <a
                                  href="auth-pass-reset-cover.html"
                                  class="text-muted"
                                >
                                  Forgot password?
                                </a>
                              </div>
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
        </div>
      </div>
    </>
  );
};

export default LoginPage;
