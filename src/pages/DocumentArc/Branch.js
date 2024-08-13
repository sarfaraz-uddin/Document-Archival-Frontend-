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

const Branch = () => {
  document.title = "Ants Quality - Branch";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // New state for editing mode
  const [editedUser, setEditedUser] = useState(null); // New state for edited user
  const [branches, setBranch] = useState([]);
  const [uniqueBranches, setUniqueBranches] = useState([]);
  const [newUserData, setNewUserData] = useState({
    municipalityTitle: "",
    bra01code: "",
    bra01is_head_office: false,
    bra01name: "",
    bra01address: "",
    bra01telephone: "",
    bra01status: false,
    bra01deleted: false,
    bra01set05uin_muncipality: 0,
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsEditMode(false); // Reset editing mode when the modal is closed
    setEditedUser(null); // Reset edited user when the modal is closed
    setNewUserData({
      municipalityTitle: "",
      bra01code: "",
      bra01is_head_office: false,
      bra01name: "",
      bra01address: "",
      bra01telephone: "",
      bra01status: false,
      bra01deleted: false,
      bra01set05uin_muncipality: 0,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = value;

    if (name === "bra01is_head_office" || name === "bra01status") {
      val = value === "true";
    }

    setNewUserData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : val,
    }));
  };

  const fetchBranch = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7039/Branches/GetAll`
      );
      setBranch(response);
      // Extract unique province titles
      const uniqueTitles = [
        ...new Set(response.map((item) => item.municipalityTitle)),
      ];
      setUniqueBranches(uniqueTitles);
    } catch (error) {
      console.error("Error fetching Municipality:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      const selectedMunicipality = branches.find(
        (branch) => branch.municipalityTitle === newUserData.municipalityTitle
      );

      if (!selectedMunicipality) {
        console.error("Selected Municipality not found.");
        return;
      }

      const newUser = {
        ...newUserData,
        bra01set05uin_muncipality:
          selectedMunicipality.bra01set05uin_muncipality,
      };

      console.log(newUser);

      const response = await axios.post(
        `https://localhost:7039/Branches/Create`,
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      toast.success("Branch added successfully!");
      fetchBranch();
      toggleModal();
    } catch (error) {
      console.error("Error adding Branch:", error.message);
      toast.error("Failed to add branch.!");
    }
  };

  const handleEditUser = (user) => {
    setIsModalOpen(true);
    setIsEditMode(true);
    setEditedUser(user);
    setNewUserData({
      bra01code: user.bra01code,
      municipalityTitle: user.municipalityTitle,
      bra01name: user.bra01name,
      bra01is_head_office: user.bra01is_head_office === true,
      bra01address: user.bra01address,
      bra01telephone: user.bra01telephone,
      bra01status: user.bra01status === true,
      bra01deleted: user.bra01deleted,
    });
  };

  const handleUpdateUser = async () => {
    try {
      const selectedMunicipality = branches.find(
        (branch) => branch.municipalityTitle === newUserData.municipalityTitle
      );

      if (!selectedMunicipality) {
        console.error("Selected Municipality not found.");
        return;
      }

      const updatedUser = {
        ...editedUser, // Use editedUser as the base
        bra01code: newUserData.bra01code,
        bra01name: newUserData.bra01name,
        bra01is_head_office: newUserData.bra01is_head_office === true,
        bra01address: newUserData.bra01address,
        bra01telephone: newUserData.bra01telephone,
        bra01status: newUserData.bra01status === true,
        bra01deleted: editedUser.bra01deleted,
        bra01set05uin_muncipality:
          selectedMunicipality.bra01set05uin_muncipality,
      };

      const response = await axios.put(
        `https://localhost:7039/Branches/Edit/${editedUser.bra01uin}`,
        updatedUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update response:", response);
      toast.success("Branch updated successfully!");
      fetchBranch();
      toggleModal();
    } catch (error) {
      console.error("Error updating Municipality:", error);
      toast.error("Failed to update branch!");
    }
  };
  const handleDeleteUser = async (bra01uin) => {
    try {
      const id = bra01uin;
      const response = await axios.delete(
        `https://localhost:7039/Branches/Delete/${id}`,
        {
          params: { id },
        }
      );

      console.log(response);
      toast.success("Branh Deleted Successfully!");
      fetchBranch();
    } catch (error) {
      console.error("Error deleting province:", error);
      toast.error("Failed to delete branch!");
    }
  };
  useEffect(() => {
    fetchBranch();
  }, []);

  const columns = [
    {
      Header: "Id",
      accessor: "bra01uin",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Code",
      accessor: "bra01code",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Municipality",
      accessor: "municipalityTitle",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Name",
      accessor: "bra01name",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Address",
      accessor: "bra01address",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Telephone",
      accessor: "bra01telephone",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Head Office",
      accessor: (row) => {
        if (row.bra01is_head_office === false) {
          return (
            <div className="d-flex">
              <span className="badge text-bg-danger">No</span>
            </div>
          );
        } else if (row.bra01is_head_office === true) {
          return (
            <div className="d-flex">
              <span className="badge text-bg-success">Yes</span>
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
        if (row.bra01status === false) {
          return (
            <div className="d-flex">
              <span className="badge text-bg-danger">InActive</span>
            </div>
          );
        } else if (row.bra01status === true) {
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
            onClick={() => handleDeleteUser(row.original.bra01uin)}
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
          <BreadCrumb title="Branch" pageTitle="Ants Quality" />
          <Col lg={12}>
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0 fs-5">Branch List</h5>
                  <div className="btn btn-success fw-700" onClick={toggleModal}>
                    Add
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <List columns={columns} data={branches} />
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {isEditMode ? (
            <div className="text-primary">Edit Branch</div>
          ) : (
            <div className="text-primary">Add New Branch</div>
          )}
        </ModalHeader>
        <ModalBody>
          <FormGroup className="d-flex justify-content-end">
            <Label className="form-label me-2">Status:</Label>
            <div className="form-check form-switch form-switch-md form-switch-dark">
              <Input
                className="form-check-input"
                name="bra01status"
                type="checkbox"
                role="switch"
                id="statusToggle"
                onChange={handleInputChange}
                checked={newUserData.bra01status}
              />
              <Label className="form-check-label" htmlFor="statusToggle">
                {newUserData.bra01status ? "Active" : "InActive"}
              </Label>
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="code">Code</Label>
            <Input
              type="text"
              name="bra01code"
              id="code"
              placeholder="Enter code"
              onChange={handleInputChange}
              value={newUserData.bra01code}
            />
          </FormGroup>
          <FormGroup>
            <Label for="municipality">Municipality</Label>
            <Input
              type="select"
              id="municipality"
              name="municipalityTitle"
              onChange={handleInputChange}
              value={newUserData.municipalityTitle}
              className="form-select"
            >
              <option value="">Choose...</option>
              {uniqueBranches.map((municipalityTitle, index) => (
                <option key={index} value={municipalityTitle}>
                  {municipalityTitle}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="bra01name"
              id="name"
              placeholder="Enter name"
              onChange={handleInputChange}
              value={newUserData.bra01name}
            />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input
              type="text"
              name="bra01address"
              id="address"
              placeholder="Enter address"
              onChange={handleInputChange}
              value={newUserData.bra01address}
            />
          </FormGroup>
          <FormGroup>
            <Label for="telephone">Telephone</Label>
            <Input
              type="text"
              name="bra01telephone"
              id="telephone"
              placeholder="Enter telephone"
              onChange={handleInputChange}
              value={newUserData.bra01telephone}
            />
          </FormGroup>
          <FormGroup>
            <Label for="head_office">Head Office</Label>
            <Input
              type="select"
              name="bra01is_head_office"
              id="headoffice"
              onChange={handleInputChange}
              value={newUserData.bra01is_head_office ? "true" : "false"}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
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

export default Branch;
