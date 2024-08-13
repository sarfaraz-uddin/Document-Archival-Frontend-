import React, { useEffect, useState } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col, Input, Button, Container, InputGroup, Card, CardBody, CardHeader, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label
} from 'reactstrap';


import FeatherIcon from 'feather-icons-react';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import TestCaseCard from '../../Components/QAManagementComponent/TestCaseCard';
import { getLoggedInUser } from '../../helpers/fakebackend_helper';
import TestCaseTable from '../../Components/QAManagementComponent/Datatable/TestCaseTable';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestCaseForModule, updateTestCaseByID } from '../../slices/qaManagment/Test/thunk';
import { nanoid } from 'nanoid';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getModules } from '../../slices/qaManagment/module/thunk';
import { getProjects } from '../../slices/qaManagment/project/thunk';
import { addTestCaseForModule } from '../../slices/qaManagment/Test/thunk';
import toast from 'react-hot-toast';



const TestCase = () => {

  const testCaseData = useSelector(state => state.TestCase.testcase);
  const modules = useSelector((state) => state.Module.module);
  const projects = useSelector((state) => state.Project.project);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // New state for editing mode
  const [editedTestCase, setEditedTestCase] = useState(null); // New state for edited user

  const dispatch  = useDispatch();
  useEffect(() => {
    // Fetch users when the component mounts
    dispatch(getModules());
    dispatch(getProjects())
  },[dispatch]);

 
  const {id} = useParams();

const currentModule = modules.find(module => module.id === id);
const currentProject = projects.find(project => project.id === currentModule.project_id);
// console.log("currentProject:", currentProject);

  // console.log("All Modules", modules);
  const authUser = getLoggedInUser();
  const isAdmin = authUser.role === "admin";


useEffect(() => {
  //fetch all the testcases for the module
  dispatch(fetchTestCaseForModule(id));
},[dispatch, id])



  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsEditMode(false); // Reset editing mode when the modal is closed
    setEditedTestCase(null); // Reset edited user when the modal is closed
    setNewTestCaseData({
      testTitle: '',
      scenario: '',
      Description: '',
      ExpectedResult: '',
      PreRequisities:'',
      TestSteps:'',
      TestData:'',
 
    });
  }


  const [newTestCaseData, setNewTestCaseData] = useState({
    testTitle: '',
    scenario: '',
    Description: '',
    ExpectedResult: '',
    PreRequisities:'',
    TestSteps:'',
    TestData:'',

  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTestCaseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }


  const handleAddTestCase = () => {
    try {
      const newTestCase = {
        id: nanoid(5), // Generate a unique ID
        module_id: id,
        ...newTestCaseData,
      }
      // Dispatch action to add new module here
      dispatch(addTestCaseForModule(id, newTestCase)); // Assuming you have a addModule action
      setIsModalOpen(false);
      toast.success("Test Case Added Successfully");
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditTestCase = (testcase) => {
    setIsModalOpen(true);
    setIsEditMode(true);
    setEditedTestCase(testcase);
    setNewTestCaseData({
      testTitle: testcase.testTitle,
      scenario: testcase.scenario,
      Description: testcase.Description,
      ExpectedResult: testcase.ExpectedResult,
      PreRequisities:testcase.PreRequisities,
      TestSteps:testcase.TestSteps,
      TestData:testcase.TestData,
    });
  }
  const handleUpdateTestCase = () => {
    dispatch(updateTestCaseByID(editedTestCase.id, newTestCaseData));
    dispatch(fetchTestCaseForModule(id));
    
    // console.log("id", id)
    // console.log("testcases again fetched for ",id)
    toast.success("Test Case Updated Successfully");
    setIsModalOpen(false);
  }

  return (
    <React.Fragment>
    <div className="page-content">               
        <Container fluid>
            {/* breadcrumb */}
            {/* <BreadCrumb title="Teestcase" pageTitle="Module" /> */}
            <BreadCrumb
           title={currentModule ? currentModule.module_name : "Empty"} // Update the title here
            breadcrumbItems={[
              { title: 'Ants Quality', link: '/' },
              { title: currentProject ? currentProject.title :"Project", link: `/project/${currentProject?.id}` },
              { title: currentModule ? currentModule.module_name : "Module" },
            ]}
          />

            <Col lg={12}>
                        <Card>
                            <CardHeader>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="card-title mb-0">All Test Cases</h5>
                                    {isAdmin ? <div className='p-1 rounded-1' onClick={toggleModal} style={{backgroundColor:"#4D44B5", color:"white", cursor:"pointer"}}> <FeatherIcon icon="plus"/></div> : null}
                                </div>
                            </CardHeader>
                            <CardBody>
                               <Row>
                                {testCaseData.map(testcase => (
                                       !isAdmin ? (   
                                       <Col  sm={10} md={3}>
                                        <TestCaseCard title={testcase.testTitle} id={testcase.id} scenario={testcase.scenario} description= {testcase.Description} />
                                      </Col>
                                        ) : ( '')             
                                ))}   
                                {isAdmin ? (
                                   <TestCaseTable  id={id} onEditTest={handleEditTestCase} />
                                ) :''}
                              </Row>
                            </CardBody>
                        </Card>
                    </Col>
        </Container>
    </div>
    <Modal isOpen={isModalOpen} toggle={toggleModal} fullscreen >
  <ModalHeader toggle={toggleModal} className='bg-light px-5' >

    <div >New Test Case for</div>
    <BreadCrumb
          
            breadcrumbItems={[
              { title: currentProject ? currentProject.title :"Project", link: '/projects' },
              { title: currentModule ?( `${currentModule.module_name}, Module`) : "Module" },
            ]}
          />
   
  </ModalHeader>
  <ModalBody>
    <Form className='row gx-5 gy-4 mt-5 px-4'>
      <div className="col-12">
        <div className="row">
          <div className="col-6">
          <FormGroup>
        <Label for="testTitle">Test Title</Label>
        <Input
          className=' border-0 border-bottom rounded-0 border-black shadow-none  border-opacity-25 px-0'
          name='testTitle'
          type="text"
          id="testTitle"
          placeholder='TestCase Title here...'
          value={newTestCaseData.testTitle}
          onChange={handleInputChange}
        />
      </FormGroup>
          </div>
        </div>
     
      </div>
      <div className="col-6">
      <FormGroup>
        <Label for="scenario">Scenario</Label>
        <CKEditor
        editor={ClassicEditor}
        data={newTestCaseData.scenario}
        onChange={(event, editor) => {
          const data = editor.getData();
          setNewTestCaseData((prevData) => ({
            ...prevData,
            scenario: data,
          }));
        }}
        />
      </FormGroup>
      </div>
      
      <div className="col-6">
      <FormGroup>
        <Label for="Description">Description</Label>
        <CKEditor
        editor={ClassicEditor}
        data={newTestCaseData.Description}
        onChange={(event, editor) => {
          const data = editor.getData();
          setNewTestCaseData((prevData) => ({
            ...prevData,
            Description: data,
          }));
        }}
        />
      </FormGroup>
      </div>
   
   <div className="col-6">
   <FormGroup >
        <Label for="PreRequisities">Pre-Requisites</Label>
        <CKEditor
        editor={ClassicEditor}
        data={newTestCaseData.PreRequisities}
        onChange={(event, editor) => {
          const data = editor.getData();
          setNewTestCaseData((prevData) => ({
            ...prevData,
            PreRequisities: data,
          }));
        }}
        />
      </FormGroup>
   </div>
     
     <div className="col-6">

      <FormGroup>
    <Label for="TestSteps">Test Steps</Label>
    <CKEditor
      editor={ClassicEditor}
      data={newTestCaseData.TestSteps}
      onChange={(event, editor) => {
        const data = editor.getData();
        setNewTestCaseData((prevData) => ({
          ...prevData,
          TestSteps: data,
        }));
      }}
    />
  </FormGroup>
     </div>
     
     <div className="col-6">
     <FormGroup>
        <Label for="TestData">Test Data</Label>
        <CKEditor
        editor={ClassicEditor}
        data={newTestCaseData.TestData}
        onChange={(event, editor) => {
          const data = editor.getData();
          setNewTestCaseData((prevData) => ({
            ...prevData,
            TestData: data,
          }));
        }}
        />
      </FormGroup>
     </div>
    
    <div className="col-6">
    <FormGroup>
        <Label for="ExpectedResult">Expected Result</Label>
        <CKEditor
        editor={ClassicEditor}
        data={newTestCaseData.ExpectedResult}
        onChange={(event, editor) => {
          const data = editor.getData();
          setNewTestCaseData((prevData) => ({
            ...prevData,
            ExpectedResult: data,
          }));
        }}
        />
      </FormGroup>
    </div>
    </Form>
  </ModalBody>
  <ModalFooter>
    {/* <Button color="primary" onClick={handleAddTestCase} >Submit</Button> */}
    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
    {isEditMode ? (
                        <Button color="primary" onClick={handleUpdateTestCase}>Update</Button>
                    ) : (
                        <Button color="primary" onClick={handleAddTestCase}>Submit</Button>
                    )}
  </ModalFooter>
</Modal>

</React.Fragment>
  )
}

export default TestCase;