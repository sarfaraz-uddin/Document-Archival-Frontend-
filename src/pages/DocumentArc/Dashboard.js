import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { FaTimes } from "react-icons/fa";
import ReactSelect from "react-select";

const Dashboard = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
        <div className="row">
          <div className="col-md-6 col-xl-3">
            <div className="card-animate card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1 overflow-hidden">
                    <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                      Total Earnings
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <h5 className="fs-14 mb-0 text-success">
                      <i className="fs-13 align-middle ri-arrow-right-up-line"></i>{" "}
                      +16.24 %
                    </h5>
                  </div>
                </div>
                <div className="d-flex align-items-end justify-content-between mt-4">
                  <div>
                    <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                      <span className="counter-value" data-target="559.25">
                        <span>$559.25k</span>
                      </span>
                    </h4>
                    <a
                      className="text-decoration-underline text-muted"
                      href="/velzon/react/saas/dashboard"
                    >
                      View net earnings
                    </a>
                  </div>
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title rounded fs-3 bg-success-subtle">
                      <i className="text-success bx bx-dollar-circle"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-3">
            <div className="card-animate card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1 overflow-hidden">
                    <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                      Orders
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <h5 className="fs-14 mb-0 text-danger">
                      <i className="fs-13 align-middle ri-arrow-right-down-line"></i>{" "}
                      -3.57 %
                    </h5>
                  </div>
                </div>
                <div className="d-flex align-items-end justify-content-between mt-4">
                  <div>
                    <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                      <span className="counter-value" data-target="559.25">
                        <span>36,894</span>
                      </span>
                    </h4>
                    <a
                      className="text-decoration-underline text-muted"
                      href="/velzon/react/saas/dashboard"
                    >
                      View all orders
                    </a>
                  </div>
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title rounded fs-3 bg-info-subtle">
                      <i className="text-info bx bx-shopping-bag"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-3">
            <div className="card-animate card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1 overflow-hidden">
                    <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                      Customers
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <h5 className="fs-14 mb-0 text-success">
                      <i className="fs-13 align-middle ri-arrow-right-up-line"></i>{" "}
                      +29.08 %
                    </h5>
                  </div>
                </div>
                <div className="d-flex align-items-end justify-content-between mt-4">
                  <div>
                    <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                      <span className="counter-value" data-target="559.25">
                        <span>183.35M</span>
                      </span>
                    </h4>
                    <a
                      className="text-decoration-underline text-muted"
                      href="/velzon/react/saas/dashboard"
                    >
                      See details
                    </a>
                  </div>
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title rounded fs-3 bg-warning-subtle">
                      <i className="text-warning bx bx-user-circle"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-3">
            <div className="card-animate card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1 overflow-hidden">
                    <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                      My Balance
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <h5 className="fs-14 mb-0 text-muted"> +0.00 %</h5>
                  </div>
                </div>
                <div className="d-flex align-items-end justify-content-between mt-4">
                  <div>
                    <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                      <span className="counter-value" data-target="559.25">
                        <span>$165.89k</span>
                      </span>
                    </h4>
                    <a
                      className="text-decoration-underline text-muted"
                      href="/velzon/react/saas/dashboard"
                    >
                      Withdraw money
                    </a>
                  </div>
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title rounded fs-3 bg-primary-subtle">
                      <i className="text-primary bx bx-wallet"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
