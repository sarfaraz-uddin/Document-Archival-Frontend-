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
import { fetchUser } from "../../slices/qaManagment/UserManagement/reducer";

const Department = () => {
  document.title = "Ants Quality - Department";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // New state for editing mode
  const [editedUser, setEditedUser] = useState(null); // New state for edited user
  const [departments, setDepartments] = useState([]);
  const [newUserData, setNewUserData] = useState({
    dep01title: "",
    dep01code: "",
    dep01status: false, // Initialize with boolean value
    dep01deleted: false,
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsEditMode(false); // Reset editing mode when the modal is closed
    setEditedUser(null); // Reset edited user when the modal is closed
    setNewUserData({
      dep01title: "",
      dep01code: "",
      dep01status: false, // Initialize with boolean value
      dep01deleted: false,
    });
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setNewUserData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const fetchDepartment = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7039/Department/GetAll`
      );

      // const filteredDepartments = response.filter(
      //   (department) => department.dep01deleted === false
      // );
      setDepartments(response);
    } catch (error) {
      console.error("Error fetching Departments:", error);
    }
  };

  const handleAddUser = async () => {
    const newUser = {
      ...newUserData,
    };
    const response = await axios.post(
      `https://localhost:7039/Department/Create`,
      newUser,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    toast.success("Department added successfully!");
    fetchDepartment();
    toggleModal();
  };

  const handleEditUser = (user) => {
    setIsModalOpen(true);
    setIsEditMode(true);
    setEditedUser(user);
    setNewUserData({
      dep01title: user.dep01title,
      dep01code: user.dep01code,
      dep01status: user.dep01status === true,
      dep01deleted: user.dep01deleted === true,
    });
  };

  const handleUpdateUser = async () => {
    try {
      const updatedUser = {
        dep01uin: editedUser.dep01uin,
        dep01title: newUserData.dep01title,
        dep01code: newUserData.dep01code,
        dep01status: newUserData.dep01status,
        dep01deleted: newUserData.dep01deleted,
      };
      await axios.put(
        `https://localhost:7039/Department/Edit/${editedUser.dep01uin}`,
        updatedUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Department updated successfully!");
      fetchDepartment();
      toggleModal();
    } catch (error) {
      console.error("Error updating Department:", error);
      toast.error("Failed to update Department!");
    }
  };

  const handleDeleteUser = async (dep01uin) => {
    try {
      const response = await axios.delete(
        `https://localhost:7039/Department/Delete/${dep01uin}`
      );

      console.log(response);
      toast.success("Department deleted successfully!");
      fetchDepartment();
    } catch (error) {
      console.error("Error deleting province:", error);
      toast.error("Failed to delete Department!");
    }
  };

  const columns = [
    {
      Header: "Id",
      accessor: "dep01uin",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Code",
      accessor: "dep01code",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Title",
      accessor: "dep01title",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Status",
      accessor: (row) => {
        if (row.dep01status === false) {
          return (
            <div className="d-flex">
              <span className="badge text-bg-danger">InActive</span>
            </div>
          );
        } else if (row.dep01status === true) {
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
            onClick={() => handleDeleteUser(row.original.dep01uin)}
          >
            <i className="ri-delete-bin-line"></i>
          </Link>
        </div>
      ),
    },
  ];
  useEffect(() => {
    fetchDepartment();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Department" pageTitle="Ants Quality" />
          <Col lg={12}>
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0 fs-5">Department List</h5>
                  <div className="btn btn-success fw-700" onClick={toggleModal}>
                    Add
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <List columns={columns} data={departments} />
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {isEditMode ? (
            <div className="text-primary">Edit Department</div>
          ) : (
            <div className="text-primary">Add New Department</div>
          )}
        </ModalHeader>
        <ModalBody>
          <FormGroup className="d-flex justify-content-end">
            <Label className="form-label me-2">Status:</Label>
            <div className="form-check form-switch form-switch-md form-switch-dark">
              <Input
                className="form-check-input"
                name="dep01status"
                type="checkbox"
                role="switch"
                id="statusToggle"
                onChange={handleInputChange}
                checked={newUserData.dep01status}
              />
              <Label className="form-check-label" htmlFor="statusToggle">
                {newUserData.dep01status ? "Active" : "InActive"}
              </Label>
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="code">Code</Label>
            <Input
              type="text"
              name="dep01code"
              id="code"
              placeholder="Enter code"
              onChange={handleInputChange}
              value={newUserData.dep01code}
            />
          </FormGroup>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="dep01title"
              id="title"
              placeholder="Enter title"
              onChange={handleInputChange}
              value={newUserData.dep01title}
            />
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

export default Department;
