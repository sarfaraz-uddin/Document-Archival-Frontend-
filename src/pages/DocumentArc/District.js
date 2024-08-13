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

const District = () => {
  document.title = "Ants Quality - Province";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // New state for editing mode
  const [editedUser, setEditedUser] = useState(null); // New state for edited user
  const [districts, setDistrict] = useState([]);
  const [uniqueProvinces, setUniqueProvinces] = useState([]);
  const [newUserData, setNewUserData] = useState({
    provinceTitle: "",
    set04code: "",
    set04title: "",
    set04remarks: "",
    set04status: false,
    set04deleted: false,
    set04set03uin: 0, // This will be set from the province
  });

  // const dispatch = useDispatch();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsEditMode(false); // Reset editing mode when the modal is closed
    setEditedUser(null); // Reset edited user when the modal is closed
    setNewUserData({
      provinceTitle: "",
      set04code: "",
      set04title: "",
      set04remarks: "",
      set04status: false,
      set04deleted: false,
      set04set03uin: 0, // This will be set from the province
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUserData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchDistrict = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7039/api/District/GetAll`
      );
      setDistrict(response);
      // Extract unique province titles
      const uniqueTitles = [
        ...new Set(response.map((item) => item.provinceTitle)),
      ];
      setUniqueProvinces(uniqueTitles);
    } catch (error) {
      console.error("Error fetching Districts:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      const selectedProvince = districts.find(
        (district) => district.provinceTitle === newUserData.provinceTitle
      );

      if (!selectedProvince) {
        console.error("Selected province not found.");
        return;
      }

      const newUser = {
        ...newUserData,
        set04set03uin: selectedProvince.set04set03uin,
      };

      console.log(newUser);

      const response = await axios.post(
        `https://localhost:7039/api/District/Create`,
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      toast.success("District added successfully!");
      fetchDistrict();
      toggleModal();
    } catch (error) {
      console.error("Error adding District:", error.message);
      toast.error("Failed to add the district!");
    }
  };

  const handleEditUser = (user) => {
    setIsModalOpen(true);
    setIsEditMode(true);
    setEditedUser(user);
    setNewUserData({
      set04code: user.set04code,
      set04uin: user.set04uin,
      provinceTitle: user.provinceTitle,
      set04set03uin: user.set04set03uin,
      set04title: user.set04title,
      set04remarks: user.set04remarks,
      set04status: user.set04status === true,
      set04deleted: user.set04deleted,
    });
  };

  const handleUpdateUser = async () => {
    try {
      const selectedProvince = districts.find(
        (district) => district.provinceTitle === newUserData.provinceTitle
      );

      if (!selectedProvince) {
        console.error("Selected province not found.");
        return;
      }

      const updatedUser = {
        ...editedUser, // Use editedUser as the base
        set04code: newUserData.set04code,
        set04title: newUserData.set04title,
        set04remarks: newUserData.set04remarks,
        set04status: newUserData.set04status === true,
        set04deleted: editedUser.set04deleted,
        set04set03uin: selectedProvince.set04set03uin,
      };

      const response = await axios.put(
        `https://localhost:7039/api/District/Edit/${editedUser.set04uin}`,
        updatedUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update response:", response);
      toast.success("District updated successfully!");
      fetchDistrict();
      toggleModal();
    } catch (error) {
      console.error("Error updating province:", error);
      toast.error("Failed to update the district!");
    }
  };

  const handleDeleteUser = async (set04uin) => {
    try {
      const id = set04uin;
      const response = await axios.delete(
        `https://localhost:7039/api/District/Delete/${id}`,
        {
          params: { id },
        }
      );

      console.log(response);
      toast.success("District deleted successfully!");
      fetchDistrict();
    } catch (error) {
      console.error("Error deleting province:", error);
      toast.error("Failed to delete District!");
    }
  };
  useEffect(() => {
    fetchDistrict();
  }, []);

  const columns = [
    {
      Header: "Id",
      accessor: "set04uin",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Province",
      accessor: "provinceTitle",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Code",
      accessor: "set04code",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Title",
      accessor: "set04title",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Remarks",
      accessor: "set04remarks",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Status",
      accessor: (row) => {
        if (row.set04status === false) {
          return (
            <div className="d-flex">
              <span className="badge text-bg-danger">InActive</span>
            </div>
          );
        } else if (row.set04status === true) {
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
            onClick={() => handleDeleteUser(row.original.set04uin)}
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
          <BreadCrumb title="District" pageTitle="Ants Quality" />
          <Col lg={12}>
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0 fs-5">District List</h5>
                  <div className="btn btn-success fw-700" onClick={toggleModal}>
                    Add
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <List columns={columns} data={districts} />
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {isEditMode ? (
            <div className="text-primary">Edit District</div>
          ) : (
            <div className="text-primary">Add New District</div>
          )}
        </ModalHeader>
        <ModalBody>
          <FormGroup className="d-flex justify-content-end">
            <Label className="form-label me-2">Status:</Label>
            <div className="form-check form-switch form-switch-md form-switch-dark">
              <Input
                className="form-check-input"
                name="set04status"
                type="checkbox"
                role="switch"
                id="statusToggle"
                onChange={handleInputChange}
                checked={newUserData.set04status}
              />
              <Label className="form-check-label" htmlFor="statusToggle">
                {newUserData.set04status ? "Active" : "InActive"}
              </Label>
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="province">Province</Label>
            <Input
              type="select"
              id="province"
              name="provinceTitle"
              onChange={handleInputChange}
              value={newUserData.provinceTitle}
              className="form-select"
            >
              <option value="">Choose...</option>
              {uniqueProvinces.map((provinceTitle, index) => (
                <option key={index} value={provinceTitle}>
                  {provinceTitle}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="code">Code</Label>
            <Input
              type="text"
              name="set04code"
              id="code"
              placeholder="Enter code"
              onChange={handleInputChange}
              value={newUserData.set04code}
            />
          </FormGroup>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="set04title"
              id="title"
              placeholder="Enter title"
              onChange={handleInputChange}
              value={newUserData.set04title}
            />
          </FormGroup>
          <FormGroup>
            <Label for="remarks">Remarks</Label>
            <Input
              type="text"
              name="set04remarks"
              id="remarks"
              placeholder="Enter remarks"
              onChange={handleInputChange}
              value={newUserData.set04remarks}
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

export default District;
