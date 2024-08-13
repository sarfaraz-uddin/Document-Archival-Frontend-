import "./pswdresetpagecss/reset.css";

const ResetPswd = () => {
  return (
    <>
      <div class="auth-page-wrapper pt-5">
        <div
          class="auth-one-bg-position"
          style={{ backgroundColor: "#3D38F5" }}
          id="auth-particles"
        >
          <div class="bg-overlay"></div>

          <div class="shape">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
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
                  <p class="mt-3 fs-15 fw-bold">Document Archival Logo</p>
                </div>
              </div>
            </div>

            <div class="row justify-content-center">
              <div class="col-md-8 col-lg-6 col-xl-5">
                <div class="card mt-4">
                  <div class="card-body p-4">
                    <div class="text-center mt-2">
                      <h5 style={{ color: "#3D38F5" }}>Forgot Password?</h5>
                      <p class="text-muted">
                        Don’t worry, happens to all of us. Enter your email
                        below to recover your password
                      </p>

                      <lord-icon
                        src="https://cdn.lordicon.com/rhvddzym.json"
                        trigger="loop"
                        colors="primary:#3D38F5"
                        class="avatar-xl"
                      ></lord-icon>
                    </div>

                    <div
                      class="alert border-0 alert-warning text-center mb-2 mx-2"
                      role="alert"
                    >
                      Enter your email and instructions will be sent to you!
                    </div>
                    <div class="p-2">
                      <form>
                        <div class="mb-4">
                          <label class="form-label">Email</label>
                          <input
                            type="email"
                            class="form-control"
                            id="email"
                            placeholder="Enter Email"
                          />
                        </div>

                        <div class="text-center mt-4">
                          <button class="resetLinkBtn w-100" type="submit">
                            Send Reset Link
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div class="mt-4 text-center">
                  <p class="mb-0">
                    Wait, I remember my password...{" "}
                    <a
                      href="auth-signin-basic.html"
                      class="fw-semibold text-decoration-underline"
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

      {/* <div className="center-container">
        <div className="container">
          <div className="logo">
            <h1>LOGO</h1>
          </div>
          <div className="forgot mb-4">
            <h4 className="mb-1">Forgot Your password?</h4>
            <p>
              Don’t worry, happens to all of us. Enter your email below to
              recover your password
            </p>
          </div>
          <div className="form-container">
            <form className="reset-form">
              <div className="mb-4">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email here . . ."
                />
              </div>
              <button type="submit" className="resetLinkBtn">
                Send Reset Link
              </button>
            </form>
          </div>
          <div className="back">
            <a href="#">Back to Login</a>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ResetPswd;
