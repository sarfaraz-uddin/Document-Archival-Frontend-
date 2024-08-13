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

const DocumentCategory = () => {
  document.title = "Ants Quality - Document Category";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [docCategory, setdocCategory] = useState([]);
  const [docTypes, setDocTypes] = useState([]);
  const [newUserData, setNewUserData] = useState({
    fil10fil09uin: "",
    fil10title: "",
    fil10created_at: "2024-06-11T14:30:00Z",
    fil10created_by: "ram",
    fil10updated_at: "",
    fil10updated_by: "",
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsEditMode(false);
    setEditedUser(null);
    setNewUserData({
      fil10fil09uin: "",
      fil10title: "",
      fil10created_at: "2024-06-11T14:30:00Z",
      fil10created_by: "ram",
      fil10updated_at: "",
      fil10updated_by: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchDocumentCategory = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7039/api/DocumentCategory`
      );
      setdocCategory(response);
    } catch (error) {
      console.error("Error fetching document category:", error);
    }
  };
  const fetchDocumentTypes = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7039/api/DocumentType`
      ); // Adjust the endpoint to your actual API
      console.log(response);
      setDocTypes(response);
    } catch (error) {
      console.error("Error fetching document types:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      const newUser = { ...newUserData };
      const formData = new FormData();
      for (const key in newUser) {
        formData.append(key, newUser[key]);
      }
      await axios.post(
        "https://localhost:7039/api/DocumentCategory",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Document Category added successfully!");
      fetchDocumentCategory();
      toggleModal();
    } catch (error) {
      console.error("Error adding document category:", error.message);
      toast.error("Failed to add Document Category!");
    }
  };

  const handleEditUser = (user) => {
    console.log(user);
    setIsModalOpen(true);
    setIsEditMode(true);
    setEditedUser(user);
    setNewUserData({
      fil10fil09uin: user.fil10fil09uin,
      fil10uin: user.fil10uin,
      fil10title: user.fil10title,
      fil10created_at: user.fil10created_at,
      fil10created_by: user.fil10created_by,
      fil10updated_at: "2024-06-11T14:30:00Z",
      fil10updated_by: "shyam",
    });
  };

  const handleUpdateUser = async () => {
    try {
      const updatedUser = { ...newUserData };
      const formData = new FormData();
      for (const key in updatedUser) {
        formData.append(key, updatedUser[key]);
      }
      await axios.put(
        `https://localhost:7039/api/DocumentCategory/${editedUser.fil10uin}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Document Category Updated Successfully!");
      fetchDocumentCategory();
      toggleModal();
    } catch (error) {
      console.error("Error updating document Category:", error);
      toast.error("Failed to update Document Category!");
    }
  };

  const handleDeleteUser = async (fil10uin) => {
    try {
      await axios.delete(
        `https://localhost:7039/api/DocumentCategory/${fil10uin}`
      );
      toast.success("Document Category deleted successfully!");
      fetchDocumentCategory();
    } catch (error) {
      console.error("Error deleting document Category:", error);
      toast.error("Failed to delete Document Category!");
    }
  };

  useEffect(() => {
    fetchDocumentCategory();
    fetchDocumentTypes();
  }, []);

  const columns = [
    {
      Header: "Id",
      accessor: "fil10uin",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Document Type",
      accessor: "fil10fil09uin",
      disableFilters: true,
      filterable: false,
      Cell: ({ value }) => {
        const docType = docTypes.find((type) => type.fil09uin === value);
        return docType ? docType.fil09title : "Unknown";
      },
    },
    {
      Header: "Title",
      accessor: "fil10title",
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
            onClick={() => handleDeleteUser(row.original.fil10uin)}
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
          <BreadCrumb title="Document Type" pageTitle="Ants Quality" />
          <Col lg={12}>
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0 fs-5">
                    Document Category List
                  </h5>
                  <div className="btn btn-success fw-700" onClick={toggleModal}>
                    Add
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <List columns={columns} data={docCategory} />
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {isEditMode ? (
            <div className="text-primary">Edit DocumentCategory</div>
          ) : (
            <div className="text-primary">Add New DocumentCategory</div>
          )}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="district">Document Type</Label>
            <Input
              type="select"
              id="documentType"
              name="fil10fil09uin"
              onChange={handleInputChange}
              value={newUserData.fil10fil09uin}
              className="form-select"
            >
              <option value="">Choose...</option>
              {docTypes.map((doctype) => (
                <option key={doctype.fil09uin} value={doctype.fil09uin}>
                  {doctype.fil09title}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="fil10title"
              id="title"
              placeholder="Enter title"
              onChange={handleInputChange}
              value={newUserData.fil10title}
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

export default DocumentCategory;
