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

const Municipality = () => {
  document.title = "Ants Quality - Municipality";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // New state for editing mode
  const [editedUser, setEditedUser] = useState(null); // New state for edited user
  const [municipalities, setMunicipality] = useState([]);
  const [uniqueDistricts, setUniqueDistricts] = useState([]);
  const [newUserData, setNewUserData] = useState({
    districtTitle: "",
    set05code: "",
    set05type: "",
    set05title: "",
    set05remarks: "",
    set05address: "",
    set05telphone: "",
    set05status: false,
    set05deleted: false,
    set05set04uin: 0,
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsEditMode(false); // Reset editing mode when the modal is closed
    setEditedUser(null); // Reset edited user when the modal is closed
    setNewUserData({
      districtTitle: "",
      set05code: "",
      set05type: "",
      set05title: "",
      set05remarks: "",
      set05address: "",
      set05telphone: "",
      set05status: false,
      set05deleted: false,
      set05set04uin: 0,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchMunicipality = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7039/api/Municipality/GetAll`
      );
      setMunicipality(response);
      // Extract unique province titles
      const uniqueTitles = [
        ...new Set(response.map((item) => item.districtTitle)),
      ];
      setUniqueDistricts(uniqueTitles);
    } catch (error) {
      console.error("Error fetching Municipality:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      const selectedDistrict = municipalities.find(
        (municipality) =>
          municipality.districtTitle === newUserData.districtTitle
      );

      if (!selectedDistrict) {
        console.error("Selected district not found.");
        return;
      }

      const newUser = {
        ...newUserData,
        set05set04uin: selectedDistrict.set05set04uin,
      };

      console.log(newUser);

      const response = await axios.post(
        `https://localhost:7039/api/Municipality/Create`,
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      toast.success("Municipality Added Successfully!");
      fetchMunicipality();
      toggleModal();
    } catch (error) {
      console.error("Error adding District:", error.message);
      toast.error("Failed to add Municipality!");
    }
  };

  const handleEditUser = (user) => {
    setIsModalOpen(true);
    setIsEditMode(true);
    setEditedUser(user);
    setNewUserData({
      set05code: user.set05code,
      districtTitle: user.districtTitle,
      set05type: user.set05type,
      set05title: user.set05title,
      set05remarks: user.set05remarks,
      set05address: user.set05address,
      set05telphone: user.set05telphone,
      set05status: user.set05status === true,
      set05deleted: user.set05deleted,
    });
  };

  const handleUpdateUser = async () => {
    try {
      const selectedDistrict = municipalities.find(
        (municipality) =>
          municipality.districtTitle === newUserData.districtTitle
      );

      if (!selectedDistrict) {
        console.error("Selected district not found.");
        return;
      }

      const updatedUser = {
        ...editedUser, // Use editedUser as the base
        set05code: newUserData.set05code,
        set05title: newUserData.set05title,
        set05type: newUserData.set05type,
        set05remarks: newUserData.set05remarks,
        set05address: newUserData.set05address,
        set05telphone: newUserData.set05telphone,
        set05status: newUserData.set05status === true,
        set05deleted: editedUser.set05deleted,
        set05set04uin: selectedDistrict.set05set04uin,
      };

      const response = await axios.put(
        `https://localhost:7039/api/Municipality/Edit/${editedUser.set05uin}`,
        updatedUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update response:", response);
      toast.success("Municipality updated Successfully!");
      fetchMunicipality();
      toggleModal();
    } catch (error) {
      console.error("Error updating province:", error);
      toast.error("Failed to update Municipality!");
    }
  };

  const handleDeleteUser = async (set05uin) => {
    try {
      const id = set05uin;
      const response = await axios.delete(
        `https://localhost:7039/api/Municipality/Delete/${id}`,
        {
          params: { id },
        }
      );

      console.log(response);
      toast.success("Municipality Deleted Successfully!");
      fetchMunicipality();
    } catch (error) {
      console.error("Error deleting province:", error);
      toast.error("Failed to delete Municipality!");
    }
  };

  useEffect(() => {
    fetchMunicipality();
  }, []);

  const columns = [
    {
      Header: "Id",
      accessor: "set05uin",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Code",
      accessor: "set05code",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "District",
      accessor: "districtTitle",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Type",
      accessor: "set05type",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Title",
      accessor: "set05title",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Remarks",
      accessor: "set05remarks",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Address",
      accessor: "set05address",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Telephone",
      accessor: "set05telphone",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Status",
      accessor: (row) => {
        if (row.set05status === false) {
          return (
            <div className="d-flex">
              <span className="badge text-bg-danger">InActive</span>
            </div>
          );
        } else if (row.set05status === true) {
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
            onClick={() => handleDeleteUser(row.original.set05uin)}
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
          <BreadCrumb title="Municipality" pageTitle="Ants Quality" />
          <Col lg={12}>
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0 fs-5">Municipality List</h5>
                  <div className="btn btn-success fw-700" onClick={toggleModal}>
                    Add
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <List columns={columns} data={municipalities} />
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {isEditMode ? (
            <div className="text-primary">Edit Municipality</div>
          ) : (
            <div className="text-primary">Add New Municipality</div>
          )}
        </ModalHeader>
        <ModalBody>
          <FormGroup className="d-flex justify-content-end">
            <Label className="form-label me-2">Status:</Label>
            <div className="form-check form-switch form-switch-md form-switch-dark">
              <Input
                className="form-check-input"
                name="set05status"
                type="checkbox"
                role="switch"
                id="statusToggle"
                onChange={handleInputChange}
                checked={newUserData.set05status}
              />
              <Label className="form-check-label" htmlFor="statusToggle">
                {newUserData.set05status ? "Active" : "InActive"}
              </Label>
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="district">District</Label>
            <Input
              type="select"
              id="district"
              name="districtTitle"
              onChange={handleInputChange}
              value={newUserData.districtTitle}
              className="form-select"
            >
              <option value="">Choose...</option>
              {uniqueDistricts.map((districtTitle, index) => (
                <option key={index} value={districtTitle}>
                  {districtTitle}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="code">Code</Label>
            <Input
              type="text"
              name="set05code"
              id="set05code"
              placeholder="Enter code"
              onChange={handleInputChange}
              value={newUserData.set05code}
            />
          </FormGroup>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="set05title"
              id="set05title"
              placeholder="Enter title"
              onChange={handleInputChange}
              value={newUserData.set05title}
            />
          </FormGroup>
          <FormGroup>
            <Label for="type">Type</Label>
            <Input
              type="text"
              name="set05type"
              id="set05type"
              placeholder="Enter type"
              onChange={handleInputChange}
              value={newUserData.set05type}
            />
          </FormGroup>
          <FormGroup>
            <Label for="remarks">Remarks</Label>
            <Input
              type="text"
              name="set05remarks"
              id="set05remarks"
              placeholder="Enter remarks"
              onChange={handleInputChange}
              value={newUserData.set05remarks}
            />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input
              type="text"
              name="set05address"
              id="set05address"
              placeholder="Enter address"
              onChange={handleInputChange}
              value={newUserData.set05address}
            />
          </FormGroup>
          <FormGroup>
            <Label for="telephone">Telephone</Label>
            <Input
              type="text"
              name="set05telphone"
              id="set05telphone"
              placeholder="Enter telephone"
              onChange={handleInputChange}
              value={newUserData.set05telphone}
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

export default Municipality;
