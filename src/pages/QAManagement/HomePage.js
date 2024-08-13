import React from 'react'
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
  Col, Input, Button, Container, InputGroup, Card, CardBody, CardHeader,
  Modal, ModalBody, ModalHeader, ModalFooter, Form, FormGroup, Label
} from 'reactstrap';
import ProjectListCard from '../../Components/QAManagementComponent/ProjectListCard';

import BreadCrumb from '../../Components/Common/BreadCrumb';
import { getLoggedInUser } from '../../helpers/fakebackend_helper';
import FeatherIcon from 'feather-icons-react';
import { useDispatch,useSelector } from 'react-redux';
import { getProjects, updateProjectByID } from '../../slices/qaManagment/project/thunk';
import { createProject } from '../../slices/qaManagment/project/thunk';
import { useEffect,useState } from 'react';
import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';

const HomePage = () => {

 const dispatch= useDispatch();

  const projects = useSelector((state) => state.Project.project);
  console.log("projects:", projects);

  const authUser = getLoggedInUser();
  const isAdmin = authUser.role === "admin";


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectData, setNewProjectData] = useState({ title: '', deadline: '' });
  const [isEditMode, setIsEditMode] = useState(false); // New state for editing mode
  const [editedProject, setEditedProject] = useState(null); // New state for edited user

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsEditMode(false); // Reset editing mode when the modal is closed
    setEditedProject(null); // Reset edited user when the modal is closed
    setNewProjectData({
      title: '',
      deadline: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleAddProject = () => {
    const newProject = {
      id: nanoid(5), // Generate a unique ID
      ...newProjectData,
    };

    // Dispatch action to add new project here
    dispatch(createProject(newProject)); // Assuming you have a createProject action

    setIsModalOpen(false);
    toast.success("New Project Successfully Created");
  };

  const handleEditProject = (project) => {
    setIsModalOpen(true);
    setIsEditMode(true);
    setEditedProject(project);
    setNewProjectData(
      {
        title: project.title,
        deadline: project.deadline,
      }
    );
  }

  const handleUpdateProject = () => {
    console.log("editedProject:", editedProject.id, "editedData:", newProjectData); 
    // Dispatch action to update project 
    dispatch(updateProjectByID(editedProject.id, newProjectData)); 
    //close model
    setIsModalOpen(false);
    toast.success("Project Data Updated Successfully");
  }

  useEffect(() => {
    // Fetch users when the component mounts
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <React.Fragment>
    <div className="page-content">               
        <Container fluid>
            {/* breadcrumb */}
            <BreadCrumb title="Projects" pageTitle="Ants Quality" />

            <Col lg={12}>
                        <Card>
                            <CardHeader>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="card-title mb-0">Project List</h5>
                                    {isAdmin ? <div className='p-1 rounded-1' onClick={toggleModal} style={{backgroundColor:"#4D44B5", color:"white",cursor:"pointer"}}> <FeatherIcon icon="plus"/></div> : null}
                                </div>
                            </CardHeader>
                            <CardBody>
                               <Row>
                                {projects.map(project=><Col sm={10} md={3} key={project.id} > <ProjectListCard title={project.title} Deadline={project.deadline} id={project.id} onEditProject={handleEditProject} />  </Col>)}
                                  
                              </Row>
                            </CardBody>
                        </Card>
                    </Col>

           

        </Container>
    </div>
    <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
        {isEditMode ? <div className='text-primary'>Edit Project</div> : <div className='text-primary'>Add New Project</div>}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Project Title</Label>
              <Input
              name='title'
                type="text"
                id="title"
                value={newProjectData.title}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="deadline">Deadline</Label>
              <Input
              name='deadline'
                type="date"
                id="deadline"
                value={newProjectData.deadline}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          {isEditMode ? (
                        <Button color="primary" onClick={handleUpdateProject}>Update</Button>
                    ) : (
                        <Button color="primary" onClick={handleAddProject}>Submit</Button>
                    )}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
</React.Fragment>
 
  )
}

export default HomePage;