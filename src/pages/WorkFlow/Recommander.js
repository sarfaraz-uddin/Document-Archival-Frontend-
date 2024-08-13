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
  Input,
  Form,
  Alert,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import "../../App.css";
import {
  MdAssignmentLate,
  MdOutlineAssignmentReturn,
  MdOutlineDone,
} from "react-icons/md";

import ReactQuill from "react-quill";
import { FaAngleDoubleRight, FaChevronDown } from "react-icons/fa";

const Recommander = () => {
  const [showApproverPanel, setShowApproverPanel] = useState(false);
  const [content, setContent] = useState("");
  const [detailModel, setDetailModel] = useState(false);
  const toggleDetailModel = () => setDetailModel(!detailModel);

  const toggleApproverPanel = () => setShowApproverPanel(!showApproverPanel);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Details" pageTitle="Recommander" />
          {/* <Col lg={12}>
            <Card>
              <CardHeader className="bg">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0 fs-5">Document Information</h5>
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
                            Owner Name:
                          </Label>
                        </div>
                        <div className="col-8">
                          <Label className="form-label fw-bold" for="ownerName">
                            Sujan Dahal
                          </Label>
                        </div>
                      </div>
                      <div className="row form-group justify-content-center d-flex align-items-center">
                        <div className="col-4">
                          <Label className="form-label fw-light" for="branch">
                            Branch:
                          </Label>
                        </div>
                        <div className="col-8">
                          <Label className="form-label fw-bold" for="branch">
                            Sorakhutte Branch
                          </Label>
                        </div>
                      </div>
                      <div className="row form-group justify-content-center d-flex align-items-center">
                        <div className="col-4">
                          <Label
                            className="form-label fw-light"
                            for="documentTitle"
                          >
                            Document Title:
                          </Label>
                        </div>
                        <div className="col-8">
                          <Label
                            className="form-label fw-bold"
                            for="documentTitle"
                          >
                            Nepal Rasta Bank
                          </Label>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
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
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col> */}
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
                  <h5 className="card-title mb-0 fs-5">Approver Panel</h5>
                  <FaChevronDown
                    style={{ cursor: "pointer" }}
                    className="text-dark "
                    onClick={toggleApproverPanel}
                  />
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  {showApproverPanel && (
                    <Col lg={12} className="mb-3 p-4">
                      <Alert
                        variant="danger"
                        style={{ backgroundColor: "#cdd3ff" }}
                        className="px-5 py-4"
                      >
                        <ul>
                          <li>
                            Approver Information can be edited by initiator only
                          </li>
                          <li>Recommanders can be edited by initiator only</li>
                        </ul>
                      </Alert>
                    </Col>
                  )}
                </Row>
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
              <CardBody style={{ margin: 0, padding: 0 }}>
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
              </CardBody>
            </Card>
          </Col>
          <Col lg={12}>
            <Card>
              <CardHeader className="bg">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0 fs-5">Description</h5>
                </div>
              </CardHeader>
              <CardBody>
                <Row className="py-2">
                  <Col lg={4}>
                    {" "}
                    <strong>To:</strong>
                  </Col>
                  <Col lg={8}>
                    <Alert>
                      <span className="badge text-bg-primary">
                        Rahul Shrestha
                      </span>
                      <FaAngleDoubleRight />
                    </Alert>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4}>
                    {" "}
                    <strong>Document Comment:</strong>
                  </Col>
                  <Col lg={8}>
                    <ReactQuill
                      value={content}
                      onChange={setContent}
                      placeholder="Write Comment"
                    ></ReactQuill>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col lg={4}>Return to Recommander</Col>
                  <Col lg={4}>
                    <Input type="select">
                      <option>Select</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Input>
                  </Col>
                  <Col lg={1}>
                    <Button className="btn btn-danger btn-sm py-2">
                      {" "}
                      <MdOutlineAssignmentReturn /> Return
                    </Button>
                  </Col>
                  <Col lg={2}>
                    <Button className="btn btn-success btn-sm py-2">
                      <MdOutlineDone /> Submit
                    </Button>
                  </Col>
                </Row>

                {/* ref={editor}
                  value={content}
                  onBlur={(newContent) => setContent(newContent)}
                  onChange={(newContent) => setContent(newContent)}
                /> */}
                {/* <Row className="d-flex justify-content-end p-2">
                  <Col lg={3}>
                    <Button className="btn btn-success btn-sm m-1">
                      Approve
                    </Button>
                    <Button className="btn btn-danger btn-sm m-1">
                      Reject
                    </Button>
                    <Button className="btn btn-primary btn-sm m-1">
                      Return
                    </Button>
                  </Col>
                </Row> */}
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

export default Recommander;
