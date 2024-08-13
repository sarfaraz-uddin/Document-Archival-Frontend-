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

const FunctionalTitle = () => {
  document.title = "Ants Quality - FunctionalTitle";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // New state for editing mode
  const [editedUser, setEditedUser] = useState(null); // New state for edited user
  const [functionalTitle, setFunctionalTitle] = useState([]);
  const [newUserData, setNewUserData] = useState({
    des02code: "",
    des02title: "",
    des02remarks: "",
    des02status: false,
    des02deleted: false,
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsEditMode(false); // Reset editing mode when the modal is closed
    setEditedUser(null); // Reset edited user when the modal is closed
    setNewUserData({
      des02code: "",
      des02title: "",
      des02remarks: "",
      des02status: false,
      des02deleted: false,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchFunctionalTitle = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7039/api/Functional_title`
      );
      setFunctionalTitle(response);
    } catch (error) {
      console.error("Error fetching Functional Title:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      const newUser = {
        ...newUserData,
      };

      const response = await axios.post(
        `https://localhost:7039/api/Functional_title`,
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      toast.success("Functional Title added successfully!");
      fetchFunctionalTitle();
      toggleModal();
    } catch (error) {
      console.error("Error adding Functional Title:", error.message);
      toast.error("Failed to add Functional title!");
    }
  };

  const handleEditUser = (user) => {
    setIsModalOpen(true);
    setIsEditMode(true);
    setEditedUser(user);
    setNewUserData({
      des02code: user.des02code,
      des02title: user.des02title,
      des02remarks: user.des02remarks,
      des02status: user.des02status === true,
      des02deleted: user.des02deleted,
    });
  };

  const handleUpdateUser = async () => {
    try {
      const updatedUser = {
        ...newUserData,
      };

      const response = await axios.put(
        `https://localhost:7039/api/Functional_title/${editedUser.des02uin}`,
        updatedUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update response:", response);
      toast.success("Functional Title Updated Successfully!");
      fetchFunctionalTitle();
      toggleModal();
    } catch (error) {
      console.error("Error updating Functional Title:", error);
      toast.error("Failed to update Functional Title!");
    }
  };

  const handleDeleteUser = async (des02uin) => {
    try {
      const response = await axios.delete(
        `https://localhost:7039/api/Functional_title/${des02uin}`
      );

      console.log(response);
      toast.success("Functional title Deleted successfully!");
      fetchFunctionalTitle();
    } catch (error) {
      console.error("Error deleting Functional Title:", error);
      toast.error("Failed to delete Functional title");
    }
  };

  useEffect(() => {
    fetchFunctionalTitle();
  }, []);

  const columns = [
    {
      Header: "Id",
      accessor: "des02uin",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Code",
      accessor: "des02code",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Title",
      accessor: "des02title",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Remarks",
      accessor: "des02remarks",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Status",
      accessor: (row) => {
        if (row.des02status === false) {
          return (
            <div className="d-flex">
              <span className="badge text-bg-danger">InActive</span>
            </div>
          );
        } else if (row.des02status === true) {
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
            onClick={() => handleDeleteUser(row.original.des02uin)}
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
          <BreadCrumb title="Functional Title" pageTitle="Ants Quality" />
          <Col lg={12}>
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0 fs-5">
                    Functional Title List
                  </h5>
                  <div className="btn btn-success fw-700" onClick={toggleModal}>
                    Add
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <List columns={columns} data={functionalTitle} />
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {isEditMode ? (
            <div className="text-primary">Edit Functional Title</div>
          ) : (
            <div className="text-primary">Add New Functional Title</div>
          )}
        </ModalHeader>
        <ModalBody>
          <FormGroup className="d-flex justify-content-end">
            <Label className="form-label me-2">Status:</Label>
            <div className="form-check form-switch form-switch-md form-switch-dark">
              <Input
                className="form-check-input"
                name="des02status"
                type="checkbox"
                role="switch"
                id="statusToggle"
                onChange={handleInputChange}
                checked={newUserData.des02status}
              />
              <Label className="form-check-label" htmlFor="statusToggle">
                {newUserData.des02status ? "Active" : "InActive"}
              </Label>
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="code">Code</Label>
            <Input
              type="text"
              name="des02code"
              id="des02code"
              placeholder="Enter code"
              onChange={handleInputChange}
              value={newUserData.des02code}
            />
          </FormGroup>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="des02title"
              id="des02title"
              placeholder="Enter title"
              onChange={handleInputChange}
              value={newUserData.des02title}
            />
          </FormGroup>
          <FormGroup>
            <Label for="remarks">Remarks</Label>
            <Input
              type="text"
              name="des02remarks"
              id="des02remarks"
              placeholder="Enter remarks"
              onChange={handleInputChange}
              value={newUserData.des02remarks}
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

export default FunctionalTitle;
