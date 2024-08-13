import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import axios from "axios";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import List from "../../Components/QAManagementComponent/Datatable/List";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeLevel = () => {
  document.title = "Ants Quality - EmployeeLevel";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // New state for editing mode
  const [editedUser, setEditedUser] = useState(null); // New state for edited user
  const [employeeLevel, setEmployeeLevel] = useState([]);
  const [newUserData, setNewUserData] = useState({
    lvl01code: "",
    lvl01title: "",
    lvl01description: "",
    lvl01status: false,
    lvl01deleted: false,
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsEditMode(false); // Reset editing mode when the modal is closed
    setEditedUser(null); // Reset edited user when the modal is closed
    setNewUserData({
      lvl01code: "",
      lvl01title: "",
      lvl01description: "",
      lvl01status: false,
      lvl01deleted: false,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchEmployeeLevel = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7039/api/Employee_level`
      );
      setEmployeeLevel(response);
    } catch (error) {
      console.error("Error fetching Designation:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      const newUser = {
        ...newUserData,
      };

      const response = await axios.post(
        `https://localhost:7039/api/Employee_level`,
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      toast.success("Employee Level added successfully!");
      fetchEmployeeLevel();
      toggleModal();
    } catch (error) {
      console.error("Error adding Designation:", error.message);
      toast.error("Failed to add Employee Level!");
    }
  };

  const handleEditUser = (user) => {
    setIsModalOpen(true);
    setIsEditMode(true);
    setEditedUser(user);
    setNewUserData({
      lvl01code: user.lvl01code,
      lvl01title: user.lvl01title,
      lvl01description: user.lvl01description,
      lvl01status: user.lvl01status === true,
      lvl01deleted: user.lvl01deleted,
    });
  };

  const handleUpdateUser = async () => {
    try {
      const updatedUser = {
        ...newUserData,
      };

      const response = await axios.put(
        `https://localhost:7039/api/Employee_level/${editedUser.lvl01uin}`,
        updatedUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update response:", response);
      toast.success("Employee level updated successfully!");
      fetchEmployeeLevel();
      toggleModal();
    } catch (error) {
      console.error("Error updating Designation:", error);
      toast.error("Failed to update Employee Level!");
    }
  };

  const handleDeleteUser = async (lvl01uin) => {
    try {
      const response = await axios.delete(
        `https://localhost:7039/api/Employee_level/${lvl01uin}`
      );

      console.log(response);
      toast.success("Employee Level Deleted Successfully!");
      fetchEmployeeLevel();
    } catch (error) {
      console.error("Error deleting Designation:", error);
      toast.error("Failed to delete Employee Level!");
    }
  };

  useEffect(() => {
    fetchEmployeeLevel();
  }, []);

  const columns = [
    {
      Header: "Id",
      accessor: "lvl01uin",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Code",
      accessor: "lvl01code",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Title",
      accessor: "lvl01title",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Description",
      accessor: "lvl01description",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Status",
      accessor: (row) => {
        if (row.lvl01status === false) {
          return (
            <div className="d-flex">
              <span className="badge text-bg-danger">InActive</span>
            </div>
          );
        } else if (row.lvl01status === true) {
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
            onClick={() => handleDeleteUser(row.original.lvl01uin)}
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
          <BreadCrumb title="EmployeeLevel" pageTitle="Ants Quality" />
          <Col lg={12}>
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0 fs-5">Employee Level List</h5>
                  <div className="btn btn-success fw-700" onClick={toggleModal}>
                    Add
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <List columns={columns} data={employeeLevel} />
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {isEditMode ? (
            <div className="text-primary">Edit Employee Level</div>
          ) : (
            <div className="text-primary">Add New Employee Level</div>
          )}
        </ModalHeader>
        <ModalBody>
          <FormGroup className="d-flex justify-content-end">
            <Label className="form-label me-2">Status:</Label>
            <div className="form-check form-switch form-switch-md form-switch-dark">
              <Input
                className="form-check-input"
                name="lvl01status"
                type="checkbox"
                role="switch"
                id="statusToggle"
                onChange={handleInputChange}
                checked={newUserData.lvl01status}
              />
              <Label className="form-check-label" htmlFor="statusToggle">
                {newUserData.lvl01status ? "Active" : "InActive"}
              </Label>
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="code">Code</Label>
            <Input
              type="text"
              name="lvl01code"
              id="lvl01code"
              placeholder="Enter code"
              onChange={handleInputChange}
              value={newUserData.lvl01code}
            />
          </FormGroup>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="lvl01title"
              id="lvl01title"
              placeholder="Enter title"
              onChange={handleInputChange}
              value={newUserData.lvl01title}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="lvl01description"
              id="lvl01description"
              placeholder="Enter description"
              onChange={handleInputChange}
              value={newUserData.lvl01description}
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

export default EmployeeLevel;
