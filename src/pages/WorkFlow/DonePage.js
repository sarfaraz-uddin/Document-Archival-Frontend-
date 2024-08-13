import React, { useRef, useState } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
  ModalBody,
  ModalHeader,
  Modal,
  ModalFooter,
  Button,
  Label,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import "../../App.css";

import ReactQuill from "react-quill";
import { FaChevronDown } from "react-icons/fa";

const DonePage = () => {
  const [content, setContent] = useState("");
  const [detailModel, setDetailModel] = useState(false);
  const toggleDetailModel = () => setDetailModel(!detailModel);
  const [showApproverPanel, setShowApproverPanel] = useState(false);
  const toggleApproverPanel = () => setShowApproverPanel(!showApproverPanel);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Details" pageTitle="Recommander" />

          <Col lg={12}>
            <Card>
              <CardHeader className="bg">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0 fs-5">Basic Information</h5>
                </div>
              </CardHeader>
              <CardBody>
                <Row className="">
                  <Col md={6}>
                    <div className="container-fluid">
                      <div className="row form-group justify-content-center d-flex align-items-center">
                        <div className="col-4">
                          <Label
                            className="form-label fw-light"
                            for="ownerName"
                          >
                            Branch:
                          </Label>
                        </div>
                        <div className="col-8">
                          <Label className="form-label fw-bold" for="ownerName">
                            Sorakhutte Branch
                          </Label>
                        </div>
                      </div>
                      <div className="row form-group justify-content-center d-flex align-items-center">
                        <div className="col-4">
                          <Label className="form-label fw-light" for="branch">
                            Department:
                          </Label>
                        </div>
                        <div className="col-8">
                          <Label className="form-label fw-bold" for="branch">
                            IT Department
                          </Label>
                        </div>
                      </div>
                      <div className="row form-group justify-content-center d-flex align-items-center">
                        <div className="col-4">
                          <Label
                            className="form-label fw-light"
                            for="documentTitle"
                          >
                            Role:
                          </Label>
                        </div>
                        <div className="col-8">
                          <Label
                            className="form-label fw-bold"
                            for="documentTitle"
                          >
                            Admin
                          </Label>
                        </div>
                      </div>
                    </div>
                  </Col>
                  {/* <Col md={6}>
                    <div className="container-fluid">
                      <div className="row form-group justify-content-center d-flex align-items-center">
                        <div className="col-4">
                          <Label
                            className="form-label fw-light"
                            for="documentType"
                          >
                            Document Type:
                          </Label>
                        </div>
                        <div className="col-8">
                          <Label
                            className="form-label fw-bold"
                            for="documentType"
                          >
                            Nepali Document
                          </Label>
                        </div>
                      </div>
                      <div className="row form-group justify-content-center d-flex align-items-center">
                        <div className="col-4">
                          <Label
                            className="form-label fw-light"
                            for="documentCategory"
                          >
                            Document Category:
                          </Label>
                        </div>
                        <div className="col-8">
                          <Label
                            className="form-label fw-bold"
                            for="documentCategory"
                          >
                            Test Category
                          </Label>
                        </div>
                      </div>
                      <div className="row form-group justify-content-center d-flex align-items-center">
                        <div className="col-4">
                          <Label className="form-label fw-light" for="tags">
                            Tags:
                          </Label>
                        </div>
                        <div className="col-8">
                          <Label className="form-label fw-bold" for="tags">
                            Test Tag
                          </Label>
                        </div>
                      </div>
                      <div className="row form-group justify-content-center d-flex align-items-center">
                        <div className="col-4">
                          <Label
                            className="form-label fw-light"
                            for="expireDate"
                          >
                            Expire Date:
                          </Label>
                        </div>
                        <div className="col-8">
                          <Label
                            className="form-label fw-bold"
                            for="expireDate"
                          >
                            2019-21-2
                          </Label>
                        </div>
                      </div>
                      <div className="row form-group justify-content-center d-flex align-items-center">
                        <div className="col-4">
                          <Label
                            className="form-label fw-light"
                            for="documentLocation"
                          >
                            Document Physical Location:
                          </Label>
                        </div>
                        <div className="col-8">
                          <Label
                            className="form-label fw-bold"
                            for="documentLocation"
                          >
                            Pokhara Bazar
                          </Label>
                        </div>
                      </div>
                    </div>
                  </Col> */}
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg={12}>
            <Card>
              <CardHeader className="bg">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0 fs-5">Uploaded Files</h5>
                </div>
              </CardHeader>
              <CardBody>
                <Table className="table-striped">
                  <thead className="bg-light">
                    <tr>
                      <th>SNo.</th>
                      <th>File Name</th>
                      <th>Document Type</th>
                      <th>Document Category</th>
                      <th>Expiry Date</th>
                      <th>File</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td scope="row">1</td>
                      <td>File1</td>
                      <td>Document1</td>
                      <td>Test</td>
                      <td>2019-09-12</td>
                      <td>
                        <a href="">File.pdf</a>
                      </td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={toggleDetailModel}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">2</td>
                      <td>File2</td>
                      <td>Document2</td>
                      <td>Category 2</td>
                      <td>2019-10-12</td>
                      <td>
                        <a href="">File.pdf</a>
                      </td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={toggleDetailModel}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">3</td>
                      <td>File3</td>
                      <td>Document3</td>
                      <td>Test</td>
                      <td>2019-09-12</td>
                      <td>
                        <a href="">File.pdf</a>
                      </td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={toggleDetailModel}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">4</td>
                      <td>File4</td>
                      <td>Document4</td>
                      <td>Test</td>
                      <td>2019-08-22</td>
                      <td>
                        <a href="">File.pdf</a>
                      </td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={toggleDetailModel}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          <Col lg={12}>
            <Card>
              <CardHeader className="bg">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0 fs-5">Recommander Panel</h5>
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col lg={12} className=" mb-3 p-4">
                    <Row>
                      <Col lg={9}>
                        <h5 className=" h4">
                          Rohan Dahal{" "}
                          <strong className="text-uppercase">- Manager</strong>
                        </h5>
                        <strong className="h5">(Admin)</strong>
                      </Col>
                      <Col lg={3}>
                        <strong>2021-08-7 15:02</strong>
                        <span className="badge text-bg-primary mx-3">
                          Recommanded
                        </span>
                      </Col>
                    </Row>

                    <hr />
                    <Row>
                      <strong>Check Document</strong>
                    </Row>

                    <hr />
                  </Col>
                </Row>
                <Row>
                  <Col lg={12} className=" mb-3 p-4">
                    <Row>
                      <Col lg={9}>
                        <h5 className=" h4">
                          Rahul Shretha{" "}
                          <strong className="text-uppercase">
                            - Department
                          </strong>
                        </h5>
                        <strong className="h5">(User)</strong>
                      </Col>
                      <Col lg={3}>
                        <strong>2021-08-7 15:02</strong>
                        <span className="badge text-bg-success mx-3">
                          Completed
                        </span>
                      </Col>
                    </Row>

                    <hr />
                    <Row>
                      <strong>Complete Document</strong>
                    </Row>

                    <hr />
                  </Col>
                </Row>
                <Row>
                  <Col lg={12} className=" mb-3 p-4">
                    <Row>
                      <Col lg={9}>
                        <h5 className=" h4">
                          Bibek Neupane{" "}
                          <strong className="text-uppercase">
                            - Department
                          </strong>
                        </h5>
                        <strong className="h5">(User)</strong>
                      </Col>
                      <Col lg={3}>
                        <strong>2021-08-7 15:02</strong>
                        <span className="badge text-bg-success mx-3">
                          Completed
                        </span>
                      </Col>
                    </Row>

                    <hr />
                    <Row>
                      <strong>Complete Document</strong>
                    </Row>

                    <hr />
                  </Col>
                </Row>
                <Row>
                  <Col lg={12} className=" mb-3 p-4">
                    <Row>
                      <Col lg={9}>
                        <h5 className=" h4">
                          Binod Magar{" "}
                          <strong className="text-uppercase">
                            - Department
                          </strong>
                        </h5>
                        <strong className="h5">(User)</strong>
                      </Col>
                      <Col lg={3}>
                        <strong>2021-08-7 15:02</strong>
                        <span className="badge text-bg-success mx-3">
                          Approved
                        </span>
                      </Col>
                    </Row>

                    <hr />
                    <Row>
                      <strong>All complement Document</strong>
                    </Row>

                    <hr />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>
      <Modal isOpen={detailModel} toggle={toggleDetailModel} size="xl">
        <ModalHeader toggle={toggleDetailModel}>Document Details</ModalHeader>
        <ModalBody>
          <div className="border px-5 mx-3 my-3 rounded-2 py-5 ">
            <Row>
              <Col md={6}>
                <p>
                  Document Title:{" "}
                  <span className="badge text-bg-success">
                    Nepal Rasta Bank
                  </span>
                </p>
                <p>
                  Document Type :<strong> Test Format </strong>
                </p>
                <p>
                  Location:
                  <strong> Kathmandu, Bagmati</strong>
                </p>
              </Col>
              <Col md={6}>
                <p className="text-bold">
                  Document Category: <strong>Check Document</strong>
                </p>
                <p>
                  Tags:
                  <strong>Test Tags</strong>
                </p>
                <p>
                  File Name:
                  <strong>Test.pdf</strong>
                </p>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <p>
                  Branch: <strong> SoraKhutte, Kathmandu</strong>
                </p>
                <p>
                  Department: <strong> Department Static</strong>
                </p>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <p>
                  Expiry Date: <strong> 2019-01-23</strong>
                </p>
                <p>
                  Version: <strong> Version Static</strong>
                </p>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <p>
                  Role: <strong> Admin</strong>
                </p>
                <p>
                  User: <strong> Subash danuwar</strong>
                </p>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <p>
                  Description:{" "}
                  <strong>
                    This is a sample description of the document that provides
                    more detailed information about the content and purpose of
                    the document.
                  </strong>
                </p>
              </Col>
            </Row>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleDetailModel}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default DonePage;
