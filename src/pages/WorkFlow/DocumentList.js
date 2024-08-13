import React from "react";
import TableContainer from "../../Components/Common/TableContainer";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import { BiSolidShow } from "react-icons/bi";

const DocumentList = () => {
  const data = [
    {
      date: "2024-01-20",
      owner: "Binod Magar",
      role: "Project Manager",
      branch: "Koteshwor Branch",
      department: "Accounting",
      status: 0,
    },
    {
      date: "2024-02-15",
      owner: "John Doe",
      role: "Team Leader",
      branch: "Thamel Branch",
      department: "Marketing",
      status: 1,
    },
    {
      date: "2024-03-10",
      owner: "Jane Smith",
      role: "Developer",
      branch: "Patan Branch",
      department: "IT",
      status: 2,
    },
  ];

  const columns = [
    {
      Header: "SN",
      accessor: (row, index = 1) => index + 1,
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Date",
      accessor: "date",
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
      Header: "Role",
      accessor: "role",
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
      Header: "Status",
      accessor: "status",
      disableFilters: true,
      filterable: false,
      Cell: ({ value }) => {
        switch (value) {
          case 0:
            return <span className="badge text-bg-primary mx-3">Pending</span>;
          case 1:
            return <span className="badge text-bg-info mx-3">Process</span>;
          case 2:
            return (
              <span className="badge text-bg-success mx-3">Completed</span>
            );
          default:
            return null;
        }
      },
    },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <div className="hstack gap-3 flex-wrap">
          <Link to="/recommander" className="link-success fs-15">
            <Button className="btn btn-primary btn-sm">
              <BiSolidShow /> Details
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  const theadStyle = {
    backgroundColor: "#ffcc00", // Your desired color
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Recommander User" pageTitle="Recommander" />
          <Row>
            <Col lg={12}>
              <Card className="mx-0">
                <CardHeader className="bg">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0 fs-5">All Filled Files</h5>
                  </div>
                </CardHeader>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={data}
                    isPagination={true}
                    iscustomPageSize={false}
                    isBordered={true}
                    customPageSize={10}
                    SearchPlaceholder="Search..."
                    theadClass="bg-light"
                    className="table-striped"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DocumentList;
