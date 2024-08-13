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
import DocumentSubmissionsList from "../../Components/QAManagementComponent/Datatable/DocSubList";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { FaTimes } from "react-icons/fa";
import ReactSelect from "react-select";

const DocSubReadOnly = () => {
  const [detailModel, setDetailModel] = useState(false);
  const toggleDetailModel = () => setDetailModel(!detailModel);
  const [recommenderSelects, setRecommenderSelects] = useState([{ id: 0 }]);

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

  const columns = [
    {
      Header: "Id",
      accessor: "id",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Owner",
      accessor: "owner",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Branch",
      accessor: "branch",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Department",
      accessor: "department",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Title",
      accessor: "documentTitle",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Type",
      accessor: "documentType",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Category",
      accessor: "documentCategory",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Description",
      accessor: "description",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Tags",
      accessor: "tags",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Expiry Date",
      accessor: "expiryDate",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Location",
      accessor: "physicalLocation",
      disableFilters: true,
      filterable: false,
    },
  ];

  const data = [
    {
      id: 1,
      owner: "Alice Smith",
      branch: "New York",
      department: "HR",
      documentTitle: "Employee Handbook",
      documentType: "Policy",
      documentCategory: "Human Resources",
      description: "Comprehensive guide for company employees",
      tags: "HR",
      expiryDate: "2025-12-31",
      version: "1.0",
      physicalLocation: "NY-Office-File-123",
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Initiate Document" pageTitle="Document Archival" />
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
                  <h5 className="card-title mb-0 fs-5">WorkFlow Chain</h5>
                </div>
              </CardHeader>
              <CardBody>
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
              </CardBody>
            </Card>
          </Col>
          <Col lg={12} className="d-flex justify-content-end">
            <Button className="btn btn-success btn-sm">Submit</Button>
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

export default DocSubReadOnly;
