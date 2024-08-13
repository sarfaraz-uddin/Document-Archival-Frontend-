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

const DocumentType = () => {
  document.title = "Ants Quality - Document Type";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [doctype, setdoctype] = useState([]);
  const [newUserData, setNewUserData] = useState({
    fil09title: "",
    fil09created_at: "2024-06-11T14:30:00Z",
    fil09created_by: "ram",
    fil09updated_at: "",
    fil09updated_by: "",
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsEditMode(false);
    setEditedUser(null);
    setNewUserData({
      fil09title: "",
      fil09created_at: "2024-06-11T14:30:00Z",
      fil09created_by: "ram",
      fil09updated_at: "",
      fil09updated_by: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchDocumentTypes = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7039/api/DocumentType`
      );
      setdoctype(response);
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
      await axios.post("https://localhost:7039/api/DocumentType", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Document Type added Successfully!");
      fetchDocumentTypes();
      toggleModal();
    } catch (error) {
      console.error("Error adding document type:", error.message);
      toast.error("Failed to add Document Type!");
    }
  };

  const handleEditUser = (user) => {
    console.log(user);
    setIsModalOpen(true);
    setIsEditMode(true);
    setEditedUser(user);
    setNewUserData({
      fil09uin: user.fil09uin,
      fil09title: user.fil09title,
      fil09created_at: user.fil09created_at,
      fil09created_by: user.fil09created_by,
      fil09updated_at: "2024-06-11T14:30:00Z",
      fil09updated_by: "shyam",
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
        `https://localhost:7039/api/DocumentType/${editedUser.fil09uin}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Document Type Updated Successfully!");
      fetchDocumentTypes();
      toggleModal();
    } catch (error) {
      console.error("Error updating document type:", error);
      toast.error("Failed to update Document Type!");
    }
  };

  const handleDeleteUser = async (fil09uin) => {
    try {
      await axios.delete(`https://localhost:7039/api/DocumentType/${fil09uin}`);
      fetchDocumentTypes();
      toast.success("Document Type deleted successfully!");
    } catch (error) {
      console.error("Error deleting document type:", error);
      toast.error("Failed to delete Document Type!");
    }
  };

  useEffect(() => {
    fetchDocumentTypes();
  }, []);

  const columns = [
    {
      Header: "Id",
      accessor: "fil09uin",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Title",
      accessor: "fil09title",
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
            onClick={() => handleDeleteUser(row.original.fil09uin)}
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
                  <h5 className="card-title mb-0 fs-5">Document Type List</h5>
                  <div className="btn btn-success fw-700" onClick={toggleModal}>
                    Add
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <List columns={columns} data={doctype} />
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {isEditMode ? (
            <div className="text-primary">Edit DocumentType</div>
          ) : (
            <div className="text-primary">Add New DocumentType</div>
          )}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="fil09title"
              id="title"
              placeholder="Enter title"
              onChange={handleInputChange}
              value={newUserData.fil09title}
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

export default DocumentType;
