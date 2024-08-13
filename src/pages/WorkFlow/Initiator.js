import React, { useState } from "react";
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
import { FaAngleDoubleRight, FaChevronDown, FaTimes } from "react-icons/fa";
import ReactQuill from "react-quill";
import { MdOutlineAssignmentReturn, MdOutlineDone } from "react-icons/md";
import ReactSelect from "react-select";

const Initiator = () => {
  const [showApproverPanel, setShowApproverPanel] = useState(true);
  const [recommenderSelects, setRecommenderSelects] = useState([{ id: 0 }]);
  const [content, setContent] = useState("");

  const toggleApproverPanel = () => setShowApproverPanel(!showApproverPanel);

  const handleAddRecommenderSelect = () => {
    setRecommenderSelects([
      ...recommenderSelects,
      { id: recommenderSelects.length },
    ]);
  };

  const handleRemoveRecommenderSelect = (id) => {
    setRecommenderSelects(
      recommenderSelects.filter((select) => select.id !== id)
    );
  };
  const options = [
    { value: "test1", label: "test1" },
    { value: "strawberry", label: "test2" },
    { value: "test3", label: "test3" },
  ];
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Initiator" pageTitle="Document-Submision" />

          <Row>
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
                            <Label
                              className="form-label fw-bold"
                              for="ownerName"
                            >
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
                            // onClick={toggleDetailModel}
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
                            // onClick={toggleDetailModel}
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
                            // onClick={toggleDetailModel}
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
                            // onClick={toggleDetailModel}
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
                  {showApproverPanel && (
                    <Row>
                      <Col md={6}>
                        <Card body>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h5>Choose Recommenders</h5>
                            <Button
                              className="btn btn-success btn-sm fw-bolder px-2 py-0 fs-5"
                              onClick={handleAddRecommenderSelect}
                            >
                              +
                            </Button>
                          </div>{" "}
                          <hr className="mt-0 mb-1" />
                          {recommenderSelects.map((select, index) => (
                            <Row
                              className="d-flex align-items-center"
                              key={select.id}
                            >
                              <Col className="d-flex">
                                <ReactSelect
                                  key={index}
                                  id={`recommender-${select.id}`}
                                  name={`recommender-${select.id}`}
                                  options={options}
                                  placeholder="select recommenders"
                                  className="flex-grow-1 mt-2 me-4"
                                />
                                <FaTimes
                                  className="text-danger mt-3 me-2"
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    handleRemoveRecommenderSelect(select.id)
                                  }
                                />
                              </Col>
                            </Row>
                          ))}
                        </Card>
                      </Col>
                      <Col md={6}>
                        <Card body>
                          <h5>Choose Approvers</h5>
                          <hr className="mt-0" />
                          <ReactSelect
                            id={`approver`}
                            name={`approver}`}
                            options={options}
                            placeholder="select approvers"
                            className="flex-grow-1"
                          />
                        </Card>
                      </Col>
                    </Row>
                  )}
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
                    <Col
                      lg={12}
                      className="mb-3 p-4 d-flex justify-content-center"
                    >
                      <strong>No Previous Recommander</strong>
                    </Col>
                    {/* <Col lg={12} className=" mb-3 p-4">
                    <Row>
                      <Col lg={9}>
                        <h5 className=" h4">
                          Subash Danuwar{" "}
                          <strong className="text-uppercase">
                            - Department
                          </strong>
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
                      <strong>Complete Document</strong>
                    </Row>

                    <hr />
                  </Col>
                  <Col lg={12} className=" mb-3 p-4">
                    <Row>
                      <Col lg={9}>
                        <h5 className=" h4">
                          Rahul Shrestha{" "}
                          <strong className="text-uppercase">
                            - Department
                          </strong>
                        </h5>
                        <strong className="h5">(Manager)</strong>
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
                      <strong>All Done</strong>
                    </Row>

                    <hr />
                  </Col> */}

                    {/* <Col lg={9}>
                    <h5 className="text-uppercase h4">Subash Danuwar</h5>
                    <strong className="h5">Admin</strong>
                  </Col>
                  <Col lg={3}>
                    <strong>2021-08-7 15:02</strong>
                    <span className="badge text-bg-primary mx-3">
                      Recommanded
                    </span>
                  </Col> */}
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
                        <span className="badge text-bg-primary">
                          Bibek Neupane
                        </span>
                        <FaAngleDoubleRight />
                        <span className="badge text-bg-success">
                          Binod Magar
                        </span>
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Initiator;
