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

const Designation = () => {
  document.title = "Ants Quality - Designation";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // New state for editing mode
  const [editedUser, setEditedUser] = useState(null); // New state for edited user
  const [designation, setDesignation] = useState([]);
  const [newUserData, setNewUserData] = useState({
    des01code: "",
    des01title: "",
    des01description: "",
    des01status: false,
    des01deleted: false,
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsEditMode(false); // Reset editing mode when the modal is closed
    setEditedUser(null); // Reset edited user when the modal is closed
    setNewUserData({
      des01code: "",
      des01title: "",
      des01description: "",
      des01status: false,
      des01deleted: false,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchDesignation = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7039/api/Designation`
      );
      setDesignation(response);
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
        `https://localhost:7039/api/Designation`,
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      toast.success("Designation added successfully!");
      fetchDesignation();
      toggleModal();
    } catch (error) {
      console.error("Error adding Designation:", error.message);
      toast.error("Failed to add Designation!");
    }
  };

  const handleEditUser = (user) => {
    setIsModalOpen(true);
    setIsEditMode(true);
    setEditedUser(user);
    setNewUserData({
      des01code: user.des01code,
      des01title: user.des01title,
      des01description: user.des01description,
      des01status: user.des01status === true,
      des01deleted: user.des01deleted,
    });
  };

  const handleUpdateUser = async () => {
    try {
      const updatedUser = {
        ...newUserData,
      };

      const response = await axios.put(
        `https://localhost:7039/api/Designation/${editedUser.des01uin}`,
        updatedUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update response:", response);
      toast.success("Designation Updated successfully!");
      fetchDesignation();
      toggleModal();
    } catch (error) {
      console.error("Error updating Designation:", error);
      toast.error("Failed to update Designation!");
    }
  };

  const handleDeleteUser = async (des01uin) => {
    try {
      const response = await axios.delete(
        `https://localhost:7039/api/Designation/${des01uin}`
      );

      console.log(response);
      toast.success("Designation deleted successfully!");
      fetchDesignation();
    } catch (error) {
      console.error("Error deleting Designation:", error);
      toast.error("Failed to delete Designation!");
    }
  };

  useEffect(() => {
    fetchDesignation();
  }, []);

  const columns = [
    {
      Header: "Id",
      accessor: "des01uin",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Code",
      accessor: "des01code",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Title",
      accessor: "des01title",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Description",
      accessor: "des01description",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Status",
      accessor: (row) => {
        if (row.des01status === false) {
          return (
            <div className="d-flex">
              <span className="badge text-bg-danger">InActive</span>
            </div>
          );
        } else if (row.des01status === true) {
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
            onClick={() => handleDeleteUser(row.original.des01uin)}
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
          <BreadCrumb title="Designation" pageTitle="Ants Quality" />
          <Col lg={12}>
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0 fs-5">Designation List</h5>
                  <div className="btn btn-success fw-700" onClick={toggleModal}>
                    Add
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <List columns={columns} data={designation} />
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {isEditMode ? (
            <div className="text-primary">Edit Designation</div>
          ) : (
            <div className="text-primary">Add New Designation</div>
          )}
        </ModalHeader>
        <ModalBody>
          <FormGroup className="d-flex justify-content-end">
            <Label className="form-label me-2">Status:</Label>
            <div className="form-check form-switch form-switch-md form-switch-dark">
              <Input
                className="form-check-input"
                name="des01status"
                type="checkbox"
                role="switch"
                id="statusToggle"
                onChange={handleInputChange}
                checked={newUserData.des01status}
              />
              <Label className="form-check-label" htmlFor="statusToggle">
                {newUserData.des01status ? "Active" : "InActive"}
              </Label>
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="code">Code</Label>
            <Input
              type="text"
              name="des01code"
              id="des01code"
              placeholder="Enter code"
              onChange={handleInputChange}
              value={newUserData.des01code}
            />
          </FormGroup>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="des01title"
              id="des01title"
              placeholder="Enter title"
              onChange={handleInputChange}
              value={newUserData.des01title}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="des01description"
              id="des01description"
              placeholder="Enter description"
              onChange={handleInputChange}
              value={newUserData.des01description}
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

export default Designation;
