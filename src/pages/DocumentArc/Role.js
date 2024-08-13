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

const Role = () => {
  document.title = "Ants Quality - Employee";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [role, setRole] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [newUserData, setNewUserData] = useState({
    rol01emp01uin: "",
    rol01title: "",
    rol01deleted: false,
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsEditMode(false);
    setEditedUser(null);
    setNewUserData({
      rol01emp01uin: "",
      rol01title: "",
      rol01deleted: false,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchRole = async () => {
    try {
      const response = await axios.get(`https://localhost:7039/api/Role/Get`);
      setRole(response);
    } catch (error) {
      console.error("Error fetching Role:", error);
    }
  };
  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`https://localhost:7039/api/Employee`);
      setEmployee(response);
    } catch (error) {
      console.error("Error fetching Employee:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      const newUser = { ...newUserData };
      await axios.post("https://localhost:7039/api/Role/Create", newUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Role added successfully!");
      fetchRole();
      toggleModal();
    } catch (error) {
      console.error("Error adding Role:", error.message);
      toast.error("Failed to add Role!");
    }
  };

  const handleEditUser = (user) => {
    console.log(user);
    setIsModalOpen(true);
    setIsEditMode(true);
    setEditedUser(user);
    setNewUserData({
      rol01title: user.rol01title,
      rol01emp01uin: user.rol01emp01uin,
      rol01deleted: user.rol01deleted,
    });
  };

  const handleUpdateUser = async () => {
    try {
      const updatedUser = { ...newUserData };
      await axios.put(
        `https://localhost:7039/api/Role/Edit/${editedUser.rol01uin}`,
        updatedUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Role updated successfully!");
      fetchRole();
      toggleModal();
    } catch (error) {
      console.error("Error updating Role:", error);
      toast.error("Failed to update Role!");
    }
  };

  const handleDeleteUser = async (rol01uin) => {
    try {
      await axios.delete(`https://localhost:7039/api/Role/Delete/${rol01uin}`);
      toast.success("Role deleted successfully!");
      fetchRole();
    } catch (error) {
      console.error("Error deleting Role:", error);
      toast.error("Failed to delete the Role!");
    }
  };

  useEffect(() => {
    fetchRole();
    fetchEmployee();
  }, []);

  const columns = [
    {
      Header: "Id",
      accessor: "rol01uin",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Title",
      accessor: "rol01title",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Employee",
      accessor: "rol01emp01uin",
      disableFilters: true,
      filterable: false,
      Cell: ({ value }) => {
        const Employee = employee.find((type) => type.emp01uin === value);
        return Employee ? Employee.emp01name : "Unknown";
      },
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
            onClick={() => handleDeleteUser(row.original.rol01uin)}
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
          <BreadCrumb title="Role" pageTitle="Ants Quality" />
          <Col lg={12}>
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0 fs-5">Role List</h5>
                  <div className="btn btn-success fw-700" onClick={toggleModal}>
                    Add
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <List columns={columns} data={role} />
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {isEditMode ? (
            <div className="text-primary">Edit Role</div>
          ) : (
            <div className="text-primary">Add New Role</div>
          )}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="code">Title</Label>
            <Input
              type="text"
              name="rol01title"
              id="title"
              placeholder="Enter title"
              onChange={handleInputChange}
              value={newUserData.rol01title}
            />
          </FormGroup>
          <FormGroup>
            <Label for="employee">Employee</Label>
            <Input
              type="select"
              id="employee"
              name="rol01emp01uin"
              onChange={handleInputChange}
              value={newUserData.rol01emp01uin}
              className="form-select"
            >
              <option value="">Choose...</option>
              {employee.map((emp) => (
                <option key={emp.emp01uin} value={emp.emp01uin}>
                  {emp.emp01name}
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

export default Role;
