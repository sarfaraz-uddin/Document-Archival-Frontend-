import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
  Form,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEdit, FaTimes } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Fab, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import "../../assets/scss/pages/documentSub.scss";
import axios from "axios";
import UserList from "../../Components/QAManagementComponent/Datatable/UserList";
import { Link, useNavigate } from "react-router-dom";
import InputTags from "../../Components/Common/ReactTags";
import Dropzone from "react-dropzone";

const DocumentSub = () => {
  const [branchSelects, setBranchSelects] = useState([{ id: 0 }]);
  const [departmentSelects, setDepartmentSelects] = useState([{ id: 0 }]);
  const [roleSelects, setRoleSelects] = useState([{ id: 0 }]);
  const [userSelects, setUserSelects] = useState([{ id: 0 }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [formData, setFormData] = useState([]);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const [files, setFiles] = useState([]);
  const navigate=useNavigate();

  const passData = formData.flatMap((data) => data.documentDetails);
  const columns = [
    {
      Header: "SN",
      accessor: (row, index = 1) => index + 1,
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Title",
      accessor: "fil02DocTitle",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Type",
      accessor: "fil02DocType",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Expiry",
      accessor: "fil02ExpiryDate",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Confidential",
      accessor: "fil02IsConfidential",
      Cell: ({ value }) => <span>{value ? "Yes" : "No"}</span>,
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Version",
      accessor: "fil02Version",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: "Location",
      accessor: "fil02DocPhysicalLocation",
      disableFilters: true,
      filterable: false,
    },

    {
      Header: "Action",
      Cell: ({ row }) => (
        <div className="hstack gap-3 flex-wrap">
          <Link
            className="link-success fs-15"
            onClick={() => onEditUser(row.original)}
          >
            <i className="ri-edit-2-line"></i>
          </Link>
          <Link
            className="link-danger fs-15"
            onClick={() => handleDeleteUser(row.original.id)}
          >
            <i className="ri-delete-bin-line"></i>
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    setFormData(storedData);
    if (storedData.length > 0) {
      const data = storedData[0];
      console.log(storedData);
      formik.setValues((prevValues) => ({
        ...prevValues,
        fil01Owner: data.fil01Owner || "",
        fil01Bra01Uin: data.fil01Bra01Uin || "",
        fil01Dep01Uin: data.fil01Dep01Uin || "",
      }));
    }
  }, []);

  const handleFileUpload = (index, acceptedFiles) => {
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      console.log(updatedFiles);
      updatedFiles[index] = acceptedFiles;
      return updatedFiles;
    });

    const updatedDocuments = [...formik.values.documentDetails];
    const existingAttachDocuments = updatedDocuments[index].attachDocuments;
    acceptedFiles.forEach((file) => {
      existingAttachDocuments.forEach((doc) => {
        doc.fil03Size = String(file.size);
        doc.fil03Path = URL.createObjectURL(file);
      });
    });

    updatedDocuments[index].attachDocuments = existingAttachDocuments;
    formik.setFieldValue(
      `documentDetails[${index}].attachDocuments`,
      updatedDocuments[index].attachDocuments
    );
  };

  const handleFileDelete = (fileToDelete, index) => {
    // Filter out the file to delete from the files array
    const updatedFiles = files.filter((file) => file !== fileToDelete);
    setFiles(updatedFiles);

    // Remove the file details from formik values
    const updatedDocuments = [...formik.values.documentDetails];
    const existingAttachDocuments = updatedDocuments[
      index
    ].attachDocuments.filter(
      (doc) => doc.fil03Path !== URL.createObjectURL(fileToDelete[0])
    );
    updatedDocuments[index].attachDocuments = existingAttachDocuments;
    formik.setFieldValue(
      `documentDetails[${index}].attachDocuments`,
      updatedDocuments[index].attachDocuments
    );
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleToggle = () => {
    setStatus(!status);
  };
  const options = [
    { value: "test1", label: "test1" },
    { value: "strawberry", label: "test2" },
    { value: "test3", label: "test3" },
  ];
  const animatedComponents = makeAnimated();

  const handleAddBranchSelect = () => {
    setBranchSelects([...branchSelects, { id: branchSelects.length }]);
  };

  const handleRemoveBranchSelect = (id) => {
    setBranchSelects(branchSelects.filter((select) => select.id !== id));
  };

  const handleAddDepartmentSelect = () => {
    setDepartmentSelects([
      ...departmentSelects,
      { id: departmentSelects.length },
    ]);
  };

  const handleRemoveDepartmentSelect = (id) => {
    setDepartmentSelects(
      departmentSelects.filter((select) => select.id !== id)
    );
  };

  const handleAddRoleSelect = () => {
    setRoleSelects([...roleSelects, { id: roleSelects.length }]);
  };

  const handleRemoveRoleSelect = (id) => {
    setRoleSelects(roleSelects.filter((select) => select.id !== id));
  };

  const handleAddUserSelect = () => {
    setUserSelects([...userSelects, { id: userSelects.length }]);
  };

  const handleRemoveUserSelect = (id) => {
    setUserSelects(userSelects.filter((select) => select.id !== id));
  };

  const documentSchema = Yup.object().shape({
    fil01Owner: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("fil01Owner is required!"),
    fil01Dep01Uin: Yup.string().required("Department needs to be selected!"),
    fil01Bra01Uin: Yup.string().required("Branch needs to be selected!"),
    documentDetails: Yup.array().of(
      Yup.object().shape({
        fil02DocTitle: Yup.string().required("Document Title is required"),
        fil02DocType: Yup.string().required("Document Type is required"),
        fil02ExpiryDate: Yup.string().required("Expiry Date is required"),
        fil02IsConfidential: Yup.boolean(),
        fil02Version: Yup.string().required("Version is required"),
        fil02Description: Yup.string().required("Description is required"),
        fil02DocPhysicalLocation: Yup.string().required(
          "Physical Location is required"
        ),
        fil02DocCategory: Yup.string().required("Category is required"),
        attachDocuments: Yup.array().of(
          Yup.object().shape({
            fil03Size: Yup.string().required("Size is required"),
            fil03Name: Yup.string().required("Name is required"),
            fil03Path: Yup.string().required("Path is required"),
            branchPermissions: Yup.array().of(
              Yup.object().shape({
                fil05Bra01Uin: Yup.string().required("Branch UIN is required"),
                fil05PermissionType: Yup.string().required(
                  "Permission Type is required"
                ),
              })
            ),
            departmentPermissions: Yup.array().of(
              Yup.object().shape({
                fil06Dep01Uin: Yup.string().required(
                  "Department UIN is required"
                ),
                fil06PermissionType: Yup.string().required(
                  "Permission Type is required"
                ),
              })
            ),
            rolePermissions: Yup.array().of(
              Yup.object().shape({
                fil07Rol01Uin: Yup.string().required("Role UIN is required"),
                fil07PermissionType: Yup.string().required(
                  "Permission Type is required"
                ),
              })
            ),
            userPermissions: Yup.array().of(
              Yup.object().shape({
                fil08Emp01Uin: Yup.string().required("User UIN is required"),
                fil08PermissionType: Yup.string().required(
                  "Permission Type is required"
                ),
              })
            ),
          })
        ),
        tags: Yup.array().min(1, "At least one tag is required"),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      fil01Bra01Uin: "",
      fil01Dep01Uin: "",
      fil01Owner: "",
      documentDetails: [
        {
          fil02DocTitle: "",
          fil02DocType: "",
          fil02ExpiryDate: "",
          fil02IsConfidential: false,
          fil02Version: "",
          fil02Description: "",
          fil02DocPhysicalLocation: "",
          fil02DocCategory: "",
          attachDocuments: [
            {
              fil03Size: "",
              fil03Name: "",
              fil03Path: "",
              branchPermissions: [
                {
                  fil05Bra01Uin: "",
                  fil05PermissionType: "",
                },
              ],
              departmentPermissions: [
                {
                  fil06Dep01Uin: "",
                  fil06PermissionType: "",
                },
              ],
              rolePermissions: [
                {
                  fil07Rol01Uin: "",
                  fil07PermissionType: "",
                },
              ],
              userPermissions: [
                {
                  fil08Emp01Uin: "",
                  fil08PermissionType: "",
                },
              ],
            },
          ],
          tags: [],
        },
      ],
    },
    validationSchema: submitButtonClicked ? null : documentSchema,
    onSubmit: async (values) => {
      console.log("fdf");
      console.log("not stored", values);
      try {
        console.log(values);
        if (!submitButtonClicked) {
          const existingData =
            JSON.parse(localStorage.getItem("formData")) || [];
          console.log("Existing Data", existingData);
          console.log("to add", values.documentDetails);
          if (existingData.length > 0) {
            existingData[0].fil01Bra01Uin = values.fil01Bra01Uin;
            existingData[0].fil01Dep01Uin = values.fil01Dep01Uin;
            existingData[0].fil01Owner = values.fil01Owner;
            if (existingData[0].documentDetails) {
              existingData[0].documentDetails.push(...values.documentDetails);
            }
          } else {
            existingData.push(values);
          }
          localStorage.setItem("formData", JSON.stringify(existingData));
          setFormData(existingData);
          formik.resetForm({
            values: {
              fil01Bra01Uin: values.fil01Bra01Uin,
              fil01Dep01Uin: values.fil01Dep01Uin,
              fil01Owner: values.fil01Owner,
              documentDetails: [
                {
                  fil02DocTitle: "",
                  fil02DocType: "",
                  fil02DocCategory: "",
                  fil02ExpiryDate: "",
                  fil02IsConfidential: false,
                  fil02Version: "",
                  fil02Description: "",
                  fil02DocPhysicalLocation: "",
                  attachDocuments: [
                    {
                      fil03Category: "",
                      fil03Size: "",
                      fil03Name: "",
                      fil03Path: "",
                      branchPermissions: [
                        {
                          fil05Bra01Uin: "",
                          fil05PermissionType: "",
                        },
                      ],
                      departmentPermissions: [
                        {
                          fil06Dep01Uin: "",
                          fil06PermissionType: "",
                        },
                      ],
                      rolePermissions: [
                        {
                          fil07Rol01Uin: "",
                          fil07PermissionType: "",
                        },
                      ],
                      userPermissions: [
                        {
                          fil08Emp01Uin: "",
                          fil08PermissionType: "",
                        },
                      ],
                    },
                  ],
                  tags: [],
                },
              ],
            },
          });
          setTags([]);
          setFiles([]);
          setBranchSelects([{ id: 0 }]);
          // Reset department selects
          setDepartmentSelects([{ id: 0 }]);
          // Reset role selects
          setRoleSelects([{ id: 0 }]);
          setUserSelects([{ id: 0 }]);
        } else {
          const localData = JSON.parse(localStorage.getItem("formData"));
          const data = localData[0];
          console.log("localstorage", data);
          const response = await axios.post(
            `https://localhost:7039/api/ArchiveDocument/archive-documents`,
            data
          );
          if(response.status===200){
            navigate('/documentSubmission/read-only');
          }
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const [tags, setTags] = useState(() => []);

  const handleDelete = (i, index) => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags(newTags);
    console.log(newTags);
    const obj = newTags.map(({ text }) => ({ fil04Title: text }));
    formik.setFieldValue(`documentDetails[${index}].tags`, []);
    formik.setFieldValue(`documentDetails[${index}].tags`, obj);
  };

  const handleAddition = (index, tag) => {
    const newTags = [...tags, tag];
    setTags(newTags);
    console.log(newTags);
    const obj = newTags.map(({ text }) => ({ fil04Title: text }));
    console.log(obj);
    formik.setFieldValue(`documentDetails[${index}].tags`, []);
    formik.setFieldValue(`documentDetails[${index}].tags`, obj);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid style={{ marginTop: "-10px" }}>
          <BreadCrumb
            title="Document Submission"
            pageTitle="Document Archival"
            className="mb-0"
          />
          <Form
            className="rounded"
            onSubmit={formik.handleSubmit}
            style={{ marginTop: "-12px" }}
          >
            <Row className="bg-white mt-2 pt-3 px-4 rounded mx-0">
              <Col md={4}>
                <FormGroup>
                  <Label for="examplePassword">
                    Owner<span className="text-danger"> *</span>
                  </Label>
                  <Input
                    id="fil01Owner"
                    name="fil01Owner"
                    placeholder="Enter Company Name"
                    type="text"
                    value={formik.values.fil01Owner}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.fil01Owner && formik.errors.fil01Owner ? (
                    <span className="error text-danger">
                      {formik.errors.fil01Owner}
                    </span>
                  ) : null}
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleEmail">
                    Branch<span className="text-danger"> *</span>
                  </Label>
                  <Input
                    id="fil01Bra01Uin"
                    name="fil01Bra01Uin"
                    type="select"
                    value={formik.values.fil01Bra01Uin}
                    onChange={(event) => {
                      const value = parseInt(event.currentTarget.value, 10); // Parse value as integer
                      formik.setFieldValue("fil01Bra01Uin", value); // Update fil01Bra01Uin
                    }}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Branch</option>
                    <option value="2">Branch 1</option>
                    <option value="2">Branch 2</option>
                  </Input>
                  {formik.touched.fil01Bra01Uin &&
                  formik.errors.fil01Bra01Uin ? (
                    <span className="error text-danger">
                      {formik.errors.fil01Bra01Uin}
                    </span>
                  ) : null}
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="examplePassword">
                    Department<span className="text-danger"> *</span>
                  </Label>
                  <Input
                    id="fil01Dep01Uin"
                    name="fil01Dep01Uin"
                    type="select"
                    value={formik.values.fil01Dep01Uin}
                    onChange={(event) => {
                      const value = parseInt(event.currentTarget.value, 10); // Parse value as integer
                      formik.setFieldValue("fil01Dep01Uin", value); // Update fil01Bra01Uin
                    }}
                    onBlur={formik.handleBlur}
                  >
                    <option value="Select Department">Select Department</option>
                    <option value="1">Dept 1</option>
                    <option value="1">Dept 2</option>
                    <option value="1">Dept 3</option>
                    <option value="1">Dept 5</option>
                    <option value="1">Dept 6</option>
                  </Input>
                  {formik.touched.fil01Dep01Uin &&
                  formik.errors.fil01Dep01Uin ? (
                    <span className="error text-danger">
                      {formik.errors.fil01Dep01Uin}
                    </span>
                  ) : null}
                </FormGroup>
              </Col>
            </Row>
            {formik.values.documentDetails.map((detail, index) => (
              <React.Fragment key={index}>
                <Row className="bg-white mt-2 pt-3 px-4 rounded mx-0 pe-0">
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label for={`documentDetails[${index}].fil02DocTitle`}>
                          Document Title<span className="text-danger"> *</span>
                        </Label>
                        <Input
                          id={`documentDetails[${index}].fil02DocTitle`}
                          name={`documentDetails[${index}].fil02DocTitle`}
                          placeholder="Enter Document Title"
                          type="text"
                          value={
                            formik.values.documentDetails[index].fil02DocTitle
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.documentDetails &&
                        formik.touched.documentDetails[index] &&
                        formik.touched.documentDetails[index].fil02DocTitle &&
                        formik.errors.documentDetails &&
                        formik.errors.documentDetails[index] &&
                        formik.errors.documentDetails[index].fil02DocTitle ? (
                          <span className="error text-danger">
                            {formik.errors.documentDetails[index].fil02DocTitle}
                          </span>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for={`documentDetails[${index}].fil02DocType`}>
                          Document Type<span className="text-danger"> *</span>
                        </Label>
                        <Input
                          id={`documentDetails[${index}].fil02DocType`}
                          name={`documentDetails[${index}].fil02DocType`}
                          type="select"
                          value={
                            formik.values.documentDetails[index].fil02DocType
                          }
                          onChange={(event) =>
                            formik.setFieldValue(
                              `documentDetails[${index}].fil02DocType`,
                              parseInt(event.currentTarget.value, 10)
                            )
                          }
                          onBlur={formik.handleBlur}
                        >
                          <option value="">Select Type</option>
                          <option value="1">Type 1</option>
                          <option value="1">Type 2</option>
                          <option value="1">Type 3</option>
                          <option value="1">Type 4</option>
                          <option value="1">Type 5</option>
                        </Input>
                        {formik.touched.documentDetails &&
                        formik.touched.documentDetails[index] &&
                        formik.touched.documentDetails[index].fil02DocType &&
                        formik.errors.documentDetails &&
                        formik.errors.documentDetails[index] &&
                        formik.errors.documentDetails[index].fil02DocType ? (
                          <span className="error text-danger">
                            {formik.errors.documentDetails[index].fil02DocType}
                          </span>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label
                          for={`documentDetails[${index}].fil02DocCategory`}
                        >
                          Document Category
                          <span className="text-danger"> *</span>
                        </Label>
                        <Input
                          id={`documentDetails[${index}].fil02DocCategory`}
                          name={`documentDetails[${index}].fil02DocCategory`} // name="documentCategory"
                          type="select"
                          value={
                            formik.values.documentDetails[index]
                              .fil02DocCategory
                          }
                          // value={formik.values.documentCategory}
                          onChange={(event) =>
                            formik.setFieldValue(
                              `documentDetails[${index}].fil02DocCategory`,
                              parseInt(event.currentTarget.value, 10)
                            )
                          }
                          onBlur={formik.handleBlur}
                        >
                          <option value="">Select Category</option>
                          <option value="1">Category 1</option>
                          <option value="1">Category 2</option>
                          <option value="1">3</option>
                          <option value="1">4</option>
                          <option value="1">5</option>
                        </Input>
                        {formik.touched.documentDetails &&
                        formik.touched.documentDetails[index] &&
                        formik.touched.documentDetails[index]
                          .fil02DocCategory &&
                        formik.errors.documentDetails &&
                        formik.errors.documentDetails[index] &&
                        formik.errors.documentDetails[index]
                          .fil02DocCategory ? (
                          <span className="error text-danger">
                            {
                              formik.errors.documentDetails[index]
                                .fil02DocCategory
                            }
                          </span>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <FormGroup>
                      <Label for={`documentDetails[${index}].fil02Description`}>
                        Description<span className="text-danger"> *</span>
                      </Label>
                      <Input
                        id={`documentDetails[${index}].fil02Description`}
                        name={`documentDetails[${index}].fil02Description`}
                        type="textarea"
                        rows="7"
                        value={
                          formik.values.documentDetails[index].fil02Description
                        }
                        // value={formik.values.documentDescription}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.documentDetails &&
                      formik.touched.documentDetails[index] &&
                      formik.touched.documentDetails[index].fil02Description &&
                      formik.errors.documentDetails &&
                      formik.errors.documentDetails[index] &&
                      formik.errors.documentDetails[index].fil02Description ? (
                        <span className="error text-danger">
                          {
                            formik.errors.documentDetails[index]
                              .fil02Description
                          }
                        </span>
                      ) : null}
                    </FormGroup>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for={`documentDetails[${index}].fil04Title`}>
                          Tags<span className="text-danger"> *</span>
                        </Label>

                        <InputTags
                          tags={tags}
                          value
                          handleDelete={() => handleDelete(index)}
                          handleAddition={(tag) => handleAddition(index, tag)}
                        />
                        {/* <Select
                          id={`documentDetails[${index}].fil04Title`}
                          name={`documentDetails[${index}].tags[${index}].fil04Title`}
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          options={options}
                          placeholder="select tags"
                          value={
                            formik.values.documentDetails[index].file04Title
                          }
                          onChange={(selectedOptions) => {
                            const selectedTags = selectedOptions.map(
                              (option) => ({ fil04Title: option.value })
                            );
                            selectedTags.forEach((tag, i) => {
                              formik.setFieldValue(
                                `documentDetails[${index}].tags[${i}]`,
                                tag
                              );
                            });
                          }}
                          onBlur={formik.handleBlur}
                        /> */}
                        {formik.touched.documentDetails &&
                        formik.touched.documentDetails[index] &&
                        formik.touched.documentDetails[index].tags &&
                        formik.errors.documentDetails &&
                        formik.errors.documentDetails[index] &&
                        formik.errors.documentDetails[index].tags ? (
                          <span className="error text-danger">
                            {formik.errors.documentDetails[index].tags}
                          </span>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label
                          for={`documentDetails[${index}].fil02ExpiryDate`}
                        >
                          Expiry Date<span className="text-danger"> *</span>
                        </Label>
                        <Input
                          id={`documentDetails[${index}].fil02ExpiryDate`}
                          name={`documentDetails[${index}].fil02ExpiryDate`}
                          placeholder="Select Expiry Date"
                          type="datetime-local"
                          value={
                            formik.values.documentDetails[index].fil02ExpiryDate
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.documentDetails &&
                        formik.touched.documentDetails[index] &&
                        formik.touched.documentDetails[index].fil02ExpiryDate &&
                        formik.errors.documentDetails &&
                        formik.errors.documentDetails[index] &&
                        formik.errors.documentDetails[index].fil02ExpiryDate ? (
                          <span className="error text-danger">
                            {
                              formik.errors.documentDetails[index]
                                .fil02ExpiryDate
                            }
                          </span>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for={`documentDetails[${index}].fil02Version`}>
                          Version<span className="text-danger"> *</span>
                        </Label>
                        {/* <Input
                          id={`documentDetails[${index}].fil02Version`}
                          name={`documentDetails[${index}].fil02Version`}
                          placeholder="Enter Version"
                          type="text"
                          value={
                            formik.values.documentDetails[index].fil02Version
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        /> */}
                        <Input
                          type="select"
                          id={`documentDetails[${index}].fil02Version`}
                          name={`documentDetails[${index}].fil02Version`}
                          value={
                            formik.values.documentDetails[index].fil02Version
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="custom-select" // Add a class for custom styling if needed
                        >
                          <option value="">Select Version</option>
                          <option value="Version 1">Version 1</option>
                          <option value="Version 2">Version 2</option>
                          {/* Add more options as needed */}
                        </Input>

                        {formik.touched.fil02Version &&
                        formik.errors.fil02Version ? (
                          <span className="error text-danger">
                            {formik.errors.fil02Version}
                          </span>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label
                          for={`documentDetails[${index}].fil02DocPhysicalLocation`}
                        >
                          Document Physical Location
                          <span className="text-danger"> *</span>
                        </Label>
                        <Input
                          id={`documentDetails[${index}].fil02DocPhysicalLocation`}
                          name={`documentDetails[${index}].fil02DocPhysicalLocation`}
                          placeholder="Enter Physical Location"
                          type="text"
                          value={
                            formik.values.documentDetails[index]
                              .fil02DocPhysicalLocation
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.documentDetails &&
                        formik.touched.documentDetails[index] &&
                        formik.touched.documentDetails[index]
                          .fil02DocPhysicalLocation &&
                        formik.errors.documentDetails &&
                        formik.errors.documentDetails[index] &&
                        formik.errors.documentDetails[index]
                          .fil02DocPhysicalLocation ? (
                          <span className="error text-danger">
                            {
                              formik.errors.documentDetails[index]
                                .fil02DocPhysicalLocation
                            }
                          </span>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="d-flex mb-2">
                      <Label for="examplePassword" className="mb-0 me-2">
                        Confidential
                      </Label>
                      <div className="form-check form-switch">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          role="switch"
                          id={`documentDetails[${index}].fil02IsConfidential`}
                          checked={status}
                          onClick={handleToggle}
                          value={status}
                          name={`documentDetails[${index}].fil02IsConfidential`}
                          onChange={(e) =>
                            formik.setFieldValue(
                              `documentDetails[${index}].fil02IsConfidential`,
                              e.target.checked
                            )
                          }
                        />
                        <label
                          className="form-check-label normal-label"
                          htmlFor={`documentDetails[${index}].fil02IsConfidential`}
                        >
                          {status ? "Active" : "InActive"}
                        </label>
                      </div>
                    </div>
                  </Row>
                </Row>
                <Row className="mt-2 gap-3 mx-0">
                  <Col md={12} className="bg-white pt-3 px-4 rounded">
                    <FormGroup className="mx-2">
                      <h5 className="bold-label mb-0">File</h5>
                      <Label for="file" className="text-secondary normal-label">
                        Select & name document archive
                      </Label>
                      <hr className="mt-0" />
                      <Row>
                        <Col md={12}>
                          <Label
                            for={`documentDetails[${index}].attachDocuments[0].fil03Name`}
                          >
                            File Name
                            <span className="text-danger"> *</span>
                          </Label>
                          <Input
                            placeholder="Enter File Name . . ."
                            id={`documentDetails[${index}].attachDocuments[0].fil03Name`}
                            name={`documentDetails[${index}].attachDocuments[0].fil03Name`}
                            value={
                              formik.values.documentDetails[index]
                                .attachDocuments[0].fil03Name
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.documentDetails &&
                          formik.touched.documentDetails[index] &&
                          formik.touched.documentDetails[index]
                            .attachDocuments &&
                          formik.touched.documentDetails[index]
                            .attachDocuments[0] &&
                          formik.touched.documentDetails[index]
                            .attachDocuments[0].fil03Name &&
                          formik.errors.documentDetails &&
                          formik.errors.documentDetails[index] &&
                          formik.errors.documentDetails[index]
                            .attachDocuments &&
                          formik.errors.documentDetails[index]
                            .attachDocuments[0] &&
                          formik.errors.documentDetails[index]
                            .attachDocuments[0].fil03Name ? (
                            <span className="error text-danger">
                              {
                                formik.errors.documentDetails[index]
                                  .attachDocuments[0].fil03Name
                              }
                            </span>
                          ) : null}
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col md={12}>
                          <Dropzone
                            acceptedFiles={["image/jpeg", "application/pdf"]}
                            onDrop={(acceptedFiles) =>
                              handleFileUpload(index, acceptedFiles)
                            }
                          >
                            {({ getRootProps, getInputProps }) => (
                              <div
                                {...getRootProps()}
                                style={{
                                  border: "2px dashed #cccccc",
                                  padding: "20px",
                                  textAlign: "center",
                                  borderRadius: "5px",
                                }}
                              >
                                <input {...getInputProps()} />
                                <i class="display-4 text-muted ri-upload-cloud-2-fill"></i>
                                <p className="fs-4 fw-bold">
                                  Drag and drop files here, or click to select
                                  files
                                </p>
                              </div>
                            )}
                          </Dropzone>
                          {files.map((file) => {
                            console.log(file); // Logging the contents of the file object
                            return (
                              <div className="d-flex p-2" key={file[0].name}>
                                {/* Your existing JSX code */}
                              </div>
                            );
                          })}
                          {/* // Displaying selected files on the UI */}
                          {files.map((file) => (
                            <div className="d-flex p-2">
                              {" "}
                              <div className="flex-shrink-0 me-3">
                                {" "}
                                <div
                                  className="avatar-sm bg-light rounded"
                                  style={{ width: "200px", height: "100px" }}
                                >
                                  {" "}
                                  {/* <img
                                    data-dz-thumbnail
                                    className="img-fluid rounded d-block"
                                    src={URL.createObjectURL(file[0])}
                                    alt="file"
                                  /> */}
                                  {file[0].type.startsWith("image/") ? (
                                    <img
                                      data-dz-thumbnail
                                      className="img-fluid rounded d-block"
                                      src={URL.createObjectURL(file[0])}
                                      alt="file"
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                      }}
                                    />
                                  ) : file[0].type === "application/pdf" ? (
                                    <iframe
                                      className="pdf-viewer"
                                      src={URL.createObjectURL(file[0])}
                                      width="100%"
                                      height="100%"
                                      style={{ border: "none" }}
                                    ></iframe>
                                  ) : (
                                    <p>Unsupported file type</p>
                                  )}
                                </div>{" "}
                              </div>{" "}
                              <div className="flex-grow-1">
                                {" "}
                                <div className="pt-1">
                                  {" "}
                                  <h5 className="fs-14 mt-4" data-dz-name>
                                    {file[0].name}
                                  </h5>{" "}
                                  <p
                                    className="fs-13 text-muted mb-0"
                                    data-dz-size
                                  >
                                    <strong>{file[0].size}</strong> KB
                                  </p>{" "}
                                  <strong
                                    className="error text-danger"
                                    data-dz-errormessage
                                  />{" "}
                                </div>{" "}
                              </div>{" "}
                              <div className="flex-shrink-0 ms-3">
                                {" "}
                                <button
                                  onClick={() => handleFileDelete(file, index)}
                                  data-dz-remove
                                  className="btn btn-sm btn-danger mt-4"
                                >
                                  Delete
                                </button>{" "}
                              </div>{" "}
                            </div>
                          ))}
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="mt-2 gap-2 mx-0">
                  <Col md={6} className="bg-white pt-3 px-4 rounded">
                    <FormGroup>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="bold-label">Branch</h5>
                        <Button
                          className="btn btn-success btn-sm fw-bolder px-2 py-0 fs-5"
                          onClick={handleAddBranchSelect}
                        >
                          +
                        </Button>
                      </div>
                      <Label
                        for="exampleEmail"
                        className="text-secondary normal-label mt-0"
                      >
                        Select branch with document access
                      </Label>
                      <hr className="mt-0" style={{ color: "#091E42" }} />
                      {branchSelects.map((select, branchIndex) => (
                        <Row
                          className="d-flex align-items-center"
                          key={select.id}
                        >
                          <Col md={5}>
                            <Input
                              type="select"
                              key={index}
                              id={`documentDetails[${index}].attachDocuments[0].branchPermissions[${branchIndex}].fil05Bra01Uin`}
                              name={`documentDetails[${index}].attachDocuments[0].branchPermissions[${branchIndex}].fil05Bra01Uin`}
                              value={
                                formik.values[
                                  `documentDetails[${index}].attachDocuments[0].branchPermissions[${branchIndex}].fil05Bra01Uin`
                                ]
                              }
                              onChange={formik.handleChange}
                              className="mb-2"
                            >
                              <option value="">Select branch</option>
                              <option value="2">Branch 1</option>
                              <option value="2">Branch 2</option>
                            </Input>
                          </Col>

                          <Col
                            className="d-flex mt-2 justify-content-end"
                            md={7}
                          >
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              id={`documentDetails[${index}].attachDocuments[0].branchPermissions[${branchIndex}].fil05PermissionType`}
                              name={`documentDetails[${index}].attachDocuments[0].branchPermissions[${branchIndex}].fil05PermissionType`}
                              onChange={(event) =>
                                formik.setFieldValue(
                                  `documentDetails[${index}].attachDocuments[0].branchPermissions[${branchIndex}].fil05PermissionType`,
                                  parseInt(event.currentTarget.value, 10)
                                )
                              }
                              value={
                                formik.values[
                                  `documentDetails[${index}].attachDocuments[0].branchPermissions[${branchIndex}].fil05PermissionType`
                                ]
                              }
                            >
                              <FormControlLabel
                                className="smaller-font reduced-margin"
                                value="0"
                                control={<Radio size="small" />}
                                label={
                                  <span className="smaller-font">Read</span>
                                }
                              />
                              <FormControlLabel
                                className="smaller-font reduced-margin"
                                value="1"
                                control={<Radio size="small" />}
                                label={
                                  <span className="smaller-font">
                                    Read/Write
                                  </span>
                                }
                              />
                              <FormControlLabel
                                className="smaller-font reduced-margin"
                                value="2"
                                control={<Radio size="small" />}
                                label={
                                  <span className="smaller-font">Download</span>
                                }
                              />
                            </RadioGroup>
                            <RiDeleteBin6Line
                              className="text-danger fs-5 cross"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                handleRemoveBranchSelect(select.id)
                              }
                            />
                            {/* <div className="d-flex gap-1">
                              <Input
                                id={`checkbox-read-${select.id}`}
                                type="checkbox"
                              />
                              <Label id={`checkbox-read-${select.id}`}>
                                Read
                              </Label>
                            </div>
                            <div className="d-flex gap-1">
                              <Input
                                id={`checkbox-readwrite-${select.id}`}
                                type="checkbox"
                              />
                              <Label id={`checkbox-readwrite-${select.id}`}>
                                Read/Write
                              </Label>
                            </div>
                            <div className="d-flex gap-1">
                              <Input
                                id={`checkbox-download-${select.id}`}
                                type="checkbox"
                              />
                              <Label id={`checkbox-download-${select.id}`}>
                                Download
                              </Label>
                              <FaTimes
                                className="text-danger mt-1"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  handleRemoveBranchSelect(select.id)
                                }
                              />
                            </div> */}
                          </Col>
                        </Row>
                      ))}
                    </FormGroup>
                  </Col>
                  <Col className="bg-white pt-3 px-4 rounded">
                    <FormGroup>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="bold-label">Department</h5>
                        <Button
                          className="btn btn-success btn-sm fw-bolder px-2 py-0 fs-5"
                          onClick={handleAddDepartmentSelect}
                        >
                          +
                        </Button>
                      </div>
                      <Label
                        for="exampleEmail"
                        className="text-secondary normal-label mt-0"
                      >
                        Select department with document access
                      </Label>
                      <hr className="mt-0" />
                      {departmentSelects.map((select, departmentIndex) => (
                        <Row
                          className="d-flex align-items-center"
                          key={select.id}
                        >
                          <Col md={5}>
                            <Input
                              type="select"
                              key={index}
                              id={`documentDetails[${index}].attachDocuments[0].departmentPermissions[${departmentIndex}].fil06Dep01Uin`}
                              name={`documentDetails[${index}].attachDocuments[0].departmentPermissions[${departmentIndex}].fil06Dep01Uin`}
                              onChange={formik.handleChange}
                              className="mb-2"
                            >
                              <option value="">Select department</option>
                              <option value="1">Dept 1</option>
                              <option value="1">Dept 2</option>
                              <option value="1">Dept 3</option>
                              <option value="1">Dept 5</option>
                              <option value="1">Dept 6</option>
                            </Input>
                          </Col>

                          <Col
                            className="d-flex mt-2 justify-content-end"
                            md={7}
                          >
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              id={`documentDetails[${index}].attachDocuments[0].departmentPermissions[${departmentIndex}].fil06PermissionType`}
                              name={`documentDetails[${index}].attachDocuments[0].departmentPermissions[${departmentIndex}].fil06PermissionType`}
                              onChange={(event) =>
                                formik.setFieldValue(
                                  `documentDetails[${index}].attachDocuments[0].departmentPermissions[${departmentIndex}].fil06PermissionType`,
                                  parseInt(event.currentTarget.value, 10)
                                )
                              }
                              value={
                                formik.values[
                                  `documentDetails[${index}].attachDocuments[0].departmentPermissions[${departmentIndex}].fil06PermissionType`
                                ]
                              }
                            >
                              <FormControlLabel
                                className="smaller-font reduced-margin"
                                value="0"
                                control={<Radio size="small" />}
                                label={
                                  <span className="smaller-font">Read</span>
                                }
                              />
                              <FormControlLabel
                                className="smaller-font reduced-margin"
                                value="1"
                                control={<Radio size="small" />}
                                label={
                                  <span className="smaller-font">
                                    Read/Write
                                  </span>
                                }
                              />
                              <FormControlLabel
                                className="smaller-font reduced-margin"
                                value="2"
                                control={<Radio size="small" />}
                                label={
                                  <span className="smaller-font">Download</span>
                                }
                              />
                            </RadioGroup>
                            <RiDeleteBin6Line
                              className="text-danger fs-5 cross"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                handleRemoveDepartmentSelect(select.id)
                              }
                            />
                          </Col>
                        </Row>
                      ))}
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="mt-2 gap-2 mx-0">
                  <Col md={6} className="bg-white pt-3 px-4 rounded">
                    <FormGroup>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="bold-label">Role</h5>
                        <Button
                          className="btn btn-success btn-sm fw-bolder px-2 py-0 fs-5"
                          onClick={handleAddRoleSelect}
                        >
                          +
                        </Button>
                      </div>
                      <Label
                        for="exampleEmail"
                        className="text-secondary normal-label mt-0"
                      >
                        Select role with document access
                      </Label>
                      <hr className="mt-0" />
                      {roleSelects.map((select, roleIndex) => (
                        <Row
                          className="d-flex align-items-center"
                          key={select.id}
                        >
                          <Col md={5}>
                            <Input
                              type="select"
                              key={index}
                              id={`documentDetails[${index}].attachDocuments[0].rolePermissions[${roleIndex}].fil07Rol01Uin`}
                              name={`documentDetails[${index}].attachDocuments[0].rolePermissions[${roleIndex}].fil07Rol01Uin`}
                              onChange={formik.handleChange}
                              className="mb-2"
                            >
                              <option value="">Select Role</option>
                              <option value="3">1</option>
                              <option value="3">2</option>
                            </Input>
                          </Col>

                          <Col
                            className="d-flex mt-2 justify-content-end"
                            md={7}
                          >
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              id={`documentDetails[${index}].attachDocuments[0].rolePermissions[${roleIndex}].fil07PermissionType`}
                              name={`documentDetails[${index}].attachDocuments[0].rolePermissions[${roleIndex}].fil07PermissionType`}
                              onChange={(event) =>
                                formik.setFieldValue(
                                  `documentDetails[${index}].attachDocuments[0].rolePermissions[${roleIndex}].fil07PermissionType`,
                                  parseInt(event.currentTarget.value, 10)
                                )
                              }
                              value={
                                formik.values[
                                  `documentDetails[${index}].attachDocuments[0].rolePermissions[${roleIndex}].fil07PermissionType`
                                ]
                              }
                            >
                              <FormControlLabel
                                className="smaller-font reduced-margin"
                                value="0"
                                control={<Radio size="small" />}
                                label={
                                  <span className="smaller-font">Read</span>
                                }
                              />
                              <FormControlLabel
                                className="smaller-font reduced-margin"
                                value="1"
                                control={<Radio size="small" />}
                                label={
                                  <span className="smaller-font">
                                    Read/Write
                                  </span>
                                }
                              />
                              <FormControlLabel
                                className="smaller-font reduced-margin"
                                value="2"
                                control={<Radio size="small" />}
                                label={
                                  <span className="smaller-font">Download</span>
                                }
                              />
                            </RadioGroup>
                            <RiDeleteBin6Line
                              className="text-danger fs-5 cross"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleRemoveRoleSelect(select.id)}
                            />
                          </Col>
                        </Row>
                      ))}
                    </FormGroup>
                  </Col>
                  <Col className="bg-white pt-3 px-4 rounded">
                    <FormGroup>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="bold-label">User</h5>
                        <Button
                          className="btn btn-success btn-sm fw-bolder px-2 py-0 fs-5"
                          onClick={handleAddUserSelect}
                        >
                          +
                        </Button>
                      </div>
                      <Label
                        for="exampleEmail"
                        className="text-secondary normal-label mt-0"
                      >
                        Select User with document access
                      </Label>
                      <hr className="mt-0" />
                      {userSelects.map((select, userIndex) => (
                        <Row
                          className="d-flex align-items-center"
                          key={select.id}
                        >
                          <Col md={5}>
                            <Input
                              type="select"
                              key={index}
                              id={`documentDetails[${index}].attachDocuments[0].userPermissions[${userIndex}].fil08Emp01Uin`}
                              name={`documentDetails[${index}].attachDocuments[0].userPermissions[${userIndex}].fil08Emp01Uin`}
                              onChange={formik.handleChange}
                              className="mb-2"
                            >
                              <option value="">Select User</option>
                              <option value="1">1</option>
                              <option value="1">2</option>
                            </Input>
                          </Col>

                          <Col md={7}>
                            <div className="d-flex mt-2 justify-content-end">
                              <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                id={`documentDetails[${index}].attachDocuments[0].userPermissions[${userIndex}].fil08PermissionType`}
                                name={`documentDetails[${index}].attachDocuments[0].userPermissions[${userIndex}].fil08PermissionType`}
                                onChange={(event) =>
                                  formik.setFieldValue(
                                    `documentDetails[${index}].attachDocuments[0].userPermissions[${userIndex}].fil08PermissionType`,
                                    parseInt(event.currentTarget.value, 10)
                                  )
                                }
                                value={
                                  formik.values[
                                    `documentDetails[${index}].attachDocuments[0].userPermissions[${userIndex}].fil08PermissionType`
                                  ]
                                }
                              >
                                <FormControlLabel
                                  className="smaller-font reduced-margin"
                                  value="0"
                                  control={<Radio size="small" />}
                                  label={
                                    <span className="smaller-font">Read</span>
                                  }
                                />
                                <FormControlLabel
                                  className="smaller-font reduced-margin"
                                  value="1"
                                  control={<Radio size="small" />}
                                  label={
                                    <span className="smaller-font">
                                      Read/Write
                                    </span>
                                  }
                                />
                                <FormControlLabel
                                  className="smaller-font reduced-margin"
                                  value="2"
                                  control={<Radio size="small" />}
                                  label={
                                    <span className="smaller-font">
                                      Download
                                    </span>
                                  }
                                />
                              </RadioGroup>
                              <RiDeleteBin6Line
                                className="text-danger fs-5 cross"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  handleRemoveUserSelect(select.id)
                                }
                              />
                            </div>
                          </Col>
                        </Row>
                      ))}
                    </FormGroup>
                  </Col>
                </Row>
              </React.Fragment>
            ))}
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-primary my-2 d-flex"
                onClick={() => {
                  setSubmitButtonClicked(false);
                }}
                type="submit"
              >
                Add File
              </button>
            </div>
            <Col lg={12}>
              <Card className="mx-0">
                <CardHeader>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0 fs-5">All Filled Files</h5>
                  </div>
                </CardHeader>
                <CardBody>
                  <UserList columns={columns} municipalities={passData} />
                  <div className="d-flex justify-content-end">
                    <button
                      type="submit"
                      className="btn btn-primary my-3 d-flex"
                      onClick={() => {
                        setSubmitButtonClicked(true);
                        formik.handleSubmit();
                      }}
                    >
                      Save
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Form>
        </Container>
        <div
          className="floatingActionButton"
          style={{
            position: "fixed",
            bottom: "30px",
            right: "16px",
            zIndex: 100,
          }}
        >
          <Fab color="primary" aria-label="edit" onClick={toggleModal}>
            <FaEdit />
          </Fab>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        toggle={toggleModal}
        className="modal-dialog modal-xl modal-dialog-centered"
      >
        <ModalHeader toggle={toggleModal}>All Filled Datas</ModalHeader>
        <ModalBody>
          <Table>
            <thead>
              <tr>
                <th>SNo.</th>
                <th>Document Title</th>
                <th>Document Type</th>
                <th>Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              {formData.length > 0 ? (
                formData.map((item, tableIndex) =>
                  item.documentDetails.map((detail, detailIndex) => (
                    <tr key={`${tableIndex}-${detailIndex}`}>
                      <td scope="row">{detailIndex + 1}</td>
                      <td>{detail.fil02DocTitle}</td>
                      <td>{detail.fil02DocType}</td>
                      <td>{detail.fil02ExpiryDate}</td>
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <div className="d-flex">
            <button color="light" onClick={toggleModal}>
              Save
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default DocumentSub;
