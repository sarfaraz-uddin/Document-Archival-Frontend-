import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Col,
  CardBody,
  CardHeader,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import List from "../../Components/QAManagementComponent/Datatable/List";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Employee = () => {
  document.title = "Ants Quality - Employee";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [employee, setEmployee] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [department, setDepartment] = useState([]);
  const [employeelevel, setEmployeeLevel] = useState([]);
  const [branch, setBranch] = useState([]);
  const [functionalTitle, setFunctionalTitle] = useState([]);
  const [newUserData, setNewUserData] = useState({
    emp01code: "",
    emp01des01uin: "",
    emp01dep01uin: "",
    emp01lvl01uin: "",
    emp01bra01uin: "",
    emp01des02uin: "",
    emp01name: "",
    emp01password: "",
    emp01address: "",
    emp01email: "",
    emp01mobile: "",
    emp01status: false,
    emp01deleted: false,
    emp01is_on_leave: "",
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsEditMode(false);
    setEditedUser(null);
    setNewUserData({
      emp01code: "",
      emp01des01uin: "",
      emp01dep01uin: "",
      emp01lvl01uin: "",
      emp01bra01uin: "",
      emp01des02uin: "",
      emp01name: "",
      emp01password: "",
      emp01address: "",
      emp01email: "",
      emp01mobile: "",
      emp01status: false,
      emp01deleted: false,
      emp01is_on_leave: false,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = value;

    if (name === "emp01is_on_leave" || name === "emp01status") {
      val = value === "true";
    }

    setNewUserData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : val,
    }));
  };

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`https://localhost:7039/api/Employee`);
      setEmployee(response);
    } catch (error) {
      console.error("Error fetching Employee:", error);
    }
  };
  const fetchDesignation = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7039/api/Designation`
      ); // Adjust the endpoint to your actual API
      setDesignation(response);
    } catch (error) {
      console.error("Error fetching Designation:", error);
    }
  };
  const fetchDepartment = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7039/Department/GetAll`
      ); // Adjust the endpoint to your actual API
      setDepartment(response);
    } catch (error) {
      console.error("Error fetching Designation:", error);
    }
  };
  const fetchEmployeeLevel = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7039/api/Employee_level`
      ); // Adjust the endpoint to your actual API
      setEmployeeLevel(response);
    } catch (error) {
      console.error("Error fetching Designation:", error);
    }
  };
  const fetchBranch = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7039/Branches/GetAll`
      ); // Adjust the endpoint to your actual API
      setBranch(response);
    } catch (error) {
      console.error("Error fetching Designation:", error);
    }
  };
  const fetchFunctionalTitle = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7039/api/Functional_title`
      ); // Adjust the endpoint to your actual API
      setFunctionalTitle(response);
    } catch (error) {
      console.error("Error fetching Designation:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      const newUser = { ...newUserData };
      await axios.post("https://localhost:7039/api/Employee", newUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Employee added successfully!");
      fetchEmployee();
      toggleModal();
    } catch (error) {
      console.error("Error adding document type:", error.message);
      toast.error("Failed to add Employee!");
    }
  };

  const handleEditUser = (user) => {
    console.log(user);
    setIsModalOpen(true);
    setIsEditMode(true);
    setEditedUser(user);
    setNewUserData({
      emp01code: user.emp01code,
      emp01des01uin: user.emp01des01uin,
      emp01dep01uin: user.emp01dep01uin,
      emp01lvl01uin: user.emp01lvl01uin,
      emp01bra01uin: user.emp01bra01uin,
      emp01des02uin: user.emp01des02uin,
      emp01name: user.emp01name,
      emp01password: user.emp01password,
      emp01address: user.emp01address,
      emp01email: user.emp01email,
      emp01mobile: user.emp01mobile,
      emp01status: user.emp01status === true,
      emp01deleted: user.emp01deleted,
      emp01is_on_leave: user.emp01is_on_leave === true,
    });
  };

  const handleUpdateUser = async () => {
    try {
      const updatedUser = { ...newUserData };
      await axios.put(
        `https://localhost:7039/api/Employee/${editedUser.emp01uin}`,
        updatedUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Employee updated successfully!");
      fetchEmployee();
      toggleModal();
    } catch (error) {
      console.error("Error updating document type:", error);
      toast.error("Failed to update Employee!");
    }
  };

  const handleDeleteUser = async (emp01uin) => {
    try {
      await axios.delete(`https://localhost:7039/api/Employee/${emp01uin}`);
      toast.success("Employee Deleted successfully!");
      fetchEmployee();
    } catch (error) {
      console.error("Error deleting document type:", error);
      toast.error("Failed to delete Employee!");
    }
  };

  useEffect(() => {
    fetchEmployee();
    fetchDesignation();
    fetchDepartment();
    fetchEmployeeLevel();
    fetchBranch();
    fetchFunctionalTitle();
  }, []);

  const columns = [
    {
      Header: "Id",
      accessor: "emp01uin",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Code",
      accessor: "emp01code",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Name",
      accessor: "emp01name",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Password",
      accessor: "emp01password",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Address",
      accessor: "emp01address",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Email",
      accessor: "emp01email",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Mobile",
      accessor: "emp01mobile",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Designation",
      accessor: "emp01des01uin",
      disableFilters: true,
      filterable: false,
      Cell: ({ value }) => {
        const Designation = designation.find((type) => type.des01uin === value);
        return Designation ? Designation.des01title : "Unknown";
      },
    },
    {
      Header: "Department",
      accessor: "emp01dep01uin",
      disableFilters: true,
      filterable: false,
      Cell: ({ value }) => {
        const Department = department.find((type) => type.dep01uin === value);
        return Department ? Department.dep01title : "Unknown";
      },
    },
    {
      Header: "Employee Level",
      accessor: "emp01lvl01uin",
      disableFilters: true,
      filterable: false,
      Cell: ({ value }) => {
        const EmployeeLevel = employeelevel.find(
          (type) => type.lvl01uin === value
        );
        return EmployeeLevel ? EmployeeLevel.lvl01title : "Unknown";
      },
    },
    {
      Header: "Branch",
      accessor: "emp01bra01uin",
      disableFilters: true,
      filterable: false,
      Cell: ({ value }) => {
        const Branch = branch.find((type) => type.bra01uin === value);
        return Branch ? Branch.bra01name : "Unknown";
      },
    },
    {
      Header: "Functional Title",
      accessor: "emp01des02uin",
      disableFilters: true,
      filterable: false,
      Cell: ({ value }) => {
        const FunctionalTitle = functionalTitle.find(
          (type) => type.des02uin === value
        );
        return FunctionalTitle ? FunctionalTitle.des02title : "Unknown";
      },
    },
    {
      Header: "On Leave",
      accessor: (row) => {
        if (row.emp01is_on_leave === true) {
          return (
            <div className="d-flex">
              <span className="badge text-bg-danger">On Holiday</span>
            </div>
          );
        } else if (row.emp01is_on_leave === false) {
          return (
            <div className="d-flex">
              <span className="badge text-bg-success">Working</span>
            </div>
          );
        }
        return null;
      },
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Status",
      accessor: (row) => {
        if (row.emp01status === false) {
          return (
            <div className="d-flex">
              <span className="badge text-bg-danger">InActive</span>
            </div>
          );
        } else if (row.emp01status === true) {
          return (
            <div className="d-flex">
              <span className="badge text-bg-success">Active</span>
            </div>
          );
        }
        return null;
      },
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <div className="hstack gap-3 flex-wrap">
          <Link
            className="link-success fs-15"
            onClick={() => handleEditUser(row.original)}
          >
            <i className="ri-edit-2-line"></i>
          </Link>
          <Link
            className="link-danger fs-15"
            onClick={() => handleDeleteUser(row.original.emp01uin)}
          >
            <i className="ri-delete-bin-line"></i>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Employee" pageTitle="Ants Quality" />
          <Col lg={12}>
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0 fs-5">Employee List</h5>
                  <div className="btn btn-success fw-700" onClick={toggleModal}>
                    Add
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <List columns={columns} data={employee} />
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {isEditMode ? (
            <div className="text-primary">Edit Employee</div>
          ) : (
            <div className="text-primary">Add New Employee</div>
          )}
        </ModalHeader>
        <ModalBody>
          <FormGroup className="d-flex justify-content-end">
            <Label className="form-label me-2">Status:</Label>
            <div className="form-check form-switch form-switch-md form-switch-dark">
              <Input
                className="form-check-input"
                name="emp01status"
                type="checkbox"
                role="switch"
                id="statusToggle"
                onChange={handleInputChange}
                checked={newUserData.emp01status}
              />
              <Label className="form-check-label" htmlFor="statusToggle">
                {newUserData.emp01status ? "Active" : "InActive"}
              </Label>
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="code">Code</Label>
            <Input
              type="text"
              name="emp01code"
              id="title"
              placeholder="Enter code"
              onChange={handleInputChange}
              value={newUserData.emp01code}
            />
          </FormGroup>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="emp01name"
              id="name"
              placeholder="Enter name"
              onChange={handleInputChange}
              value={newUserData.emp01name}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="text"
              name="emp01password"
              id="password"
              placeholder="Enter password"
              onChange={handleInputChange}
              value={newUserData.emp01password}
            />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input
              type="text"
              name="emp01address"
              id="address"
              placeholder="Enter address"
              onChange={handleInputChange}
              value={newUserData.emp01address}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="emp01email"
              id="email"
              placeholder="Enter email"
              onChange={handleInputChange}
              value={newUserData.emp01email}
            />
          </FormGroup>
          <FormGroup>
            <Label for="mobile">Mobile</Label>
            <Input
              type="number"
              name="emp01mobile"
              id="mobile"
              placeholder="Enter mobile"
              onChange={handleInputChange}
              value={newUserData.emp01mobile}
            />
          </FormGroup>
          <FormGroup>
            <Label for="on_leave">On Leave</Label>
            <Input
              type="select"
              name="emp01is_on_leave"
              id="onleave"
              onChange={handleInputChange}
              value={newUserData.emp01is_on_leave ? "true" : "false"}
            >
              <option value="true">On Holiday</option>
              <option value="false">Working</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="designation">Designation</Label>
            <Input
              type="select"
              id="designation"
              name="emp01des01uin"
              onChange={handleInputChange}
              value={newUserData.emp01des01uin}
              className="form-select"
            >
              <option value="">Choose...</option>
              {designation.map((desig) => (
                <option key={desig.des01uin} value={desig.des01uin}>
                  {desig.des01title}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="department">Department</Label>
            <Input
              type="select"
              id="department"
              name="emp01dep01uin"
              onChange={handleInputChange}
              value={newUserData.emp01dep01uin}
              className="form-select"
            >
              <option value="">Choose...</option>
              {department.map((depart) => (
                <option key={depart.dep01uin} value={depart.dep01uin}>
                  {depart.dep01title}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="employeelvl">Employee Level</Label>
            <Input
              type="select"
              id="employeelevel"
              name="emp01lvl01uin"
              onChange={handleInputChange}
              value={newUserData.emp01lvl01uin}
              className="form-select"
            >
              <option value="">Choose...</option>
              {employeelevel.map((emplvl) => (
                <option key={emplvl.lvl01uin} value={emplvl.lvl01uin}>
                  {emplvl.lvl01title}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="branch">Branch</Label>
            <Input
              type="select"
              id="branch"
              name="emp01bra01uin"
              onChange={handleInputChange}
              value={newUserData.emp01bra01uin}
              className="form-select"
            >
              <option value="">Choose...</option>
              {branch.map((bra) => (
                <option key={bra.bra01uin} value={bra.bra01uin}>
                  {bra.bra01name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="fucntionalTitle">Functional Title</Label>
            <Input
              type="select"
              id="fucntionaltitle"
              name="emp01des02uin"
              onChange={handleInputChange}
              value={newUserData.emp01des02uin}
              className="form-select"
            >
              <option value="">Choose...</option>
              {functionalTitle.map((functitle) => (
                <option key={functitle.des02uin} value={functitle.des02uin}>
                  {functitle.des02title}
                </option>
              ))}
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="light" onClick={toggleModal}>
            Cancel
          </Button>
          {isEditMode ? (
            <Button color="primary" onClick={handleUpdateUser}>
              Update
            </Button>
          ) : (
            <Button color="primary" onClick={handleAddUser}>
              Submit
            </Button>
          )}
        </ModalFooter>
      </Modal>
      <ToastContainer />
    </React.Fragment>
  );
};

export default Employee;
