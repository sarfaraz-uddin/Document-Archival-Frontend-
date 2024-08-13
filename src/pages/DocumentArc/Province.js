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

const Province = () => {
  document.title = "Ants Quality - Province";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [newUserData, setNewUserData] = useState({
    set03code: "",
    set03title: "",
    set03remarks: "",
    set03status: false,
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsEditMode(false);
    setEditedUser(null);
    setNewUserData({
      set03code: "",
      set03title: "",
      set03remarks: "",
      set03status: false,
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

  const fetchProvinces = async () => {
    try {
      const response = await axios.get(`https://localhost:7039/Province/Get`);
      console.log(response);
      const filteredProvinces = response.filter(
        (province) => province.set03deleted === false
      );
      setProvinces(filteredProvinces);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      const newUser = {
        ...newUserData,
        // status: newUserData.set03status ? true : false,
      };
      console.log(newUser);
      const formData = new FormData();
      for (const key in newUser) {
        formData.append(key, newUser[key]);
      }
      await axios.post("https://localhost:7039/Province/Create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Province added successfully!");
      fetchProvinces();
      toggleModal();
    } catch (error) {
      console.error("Error adding province:", error.message);
      toast.error("Failed to add Province!");
    }
  };

  const handleEditUser = (user) => {
    console.log(user);
    setIsModalOpen(true);
    setIsEditMode(true);
    setEditedUser(user);
    setNewUserData({
      set03code: user.set03code,
      set03title: user.set03title,
      set03remarks: user.set03remarks,
      set03status: user.set03status === true,
    });
  };

  const handleUpdateUser = async () => {
    try {
      const updatedUser = {
        ...newUserData,
      };
      const formData = new FormData();
      for (const key in updatedUser) {
        formData.append(key, updatedUser[key]);
      }
      await axios.put(
        `https://localhost:7039/Province/Edit/${editedUser.set03uin}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Province updated successfully!");
      fetchProvinces();
      toggleModal();
    } catch (error) {
      console.error("Error updating province:", error);
      toast.error("Failed to update Province!");
    }
  };

  const handleDeleteUser = async (set03uin) => {
    try {
      console.log(set03uin);
      const id = set03uin;
      const response = await axios.delete(
        `https://localhost:7039/Province/Delete`,
        {
          params: { id },
        }
      );

      console.log(response);
      toast.success("Province deleted successfully!");
      fetchProvinces();
    } catch (error) {
      console.error("Error deleting province:", error);
      toast.error("Failed to delete province!");
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);
  console.log("Provinces state:", provinces);

  const columns = [
    {
      Header: "Id",
      accessor: "set03uin",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Code",
      accessor: "set03code",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Title",
      accessor: "set03title",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Remarks",
      accessor: "set03remarks",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Status",
      accessor: (row) => {
        if (row.set03status === false) {
          return (
            <div className="d-flex">
              <span className="badge text-bg-danger">InActive</span>
            </div>
          );
        } else if (row.set03status === true) {
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
            onClick={() => handleDeleteUser(row.original.set03uin)}
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
          <BreadCrumb title="Province" pageTitle="Ants Quality" />
          <Col lg={12}>
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0 fs-5">Province List</h5>
                  <div className="btn btn-success fw-700" onClick={toggleModal}>
                    Add
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <List columns={columns} data={provinces} />
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {isEditMode ? (
            <div className="text-primary">Edit Province</div>
          ) : (
            <div className="text-primary">Add New Province</div>
          )}
        </ModalHeader>
        <ModalBody>
          <FormGroup className="d-flex justify-content-end">
            <Label className="form-label me-2">Status:</Label>
            <div className="form-check form-switch form-switch-md form-switch-dark">
              <Input
                className="form-check-input"
                name="set03status"
                type="checkbox"
                role="switch"
                id="statusToggle"
                onChange={handleInputChange}
                checked={newUserData.set03status}
              />
              <Label className="form-check-label" htmlFor="statusToggle">
                {newUserData.set03status ? "Active" : "InActive"}
              </Label>
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="code">Code</Label>
            <Input
              type="text"
              name="set03code"
              id="code"
              placeholder="Enter code"
              onChange={handleInputChange}
              value={newUserData.set03code}
            />
          </FormGroup>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="set03title"
              id="title"
              placeholder="Enter title"
              onChange={handleInputChange}
              value={newUserData.set03title}
            />
          </FormGroup>
          <FormGroup>
            <Label for="remarks">Remarks</Label>
            <Input
              type="text"
              name="set03remarks"
              id="remarks"
              placeholder="Enter remarks"
              onChange={handleInputChange}
              value={newUserData.set03remarks}
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

export default Province;
