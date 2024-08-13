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
  Col, Input, Button, Container, InputGroup, Card, CardBody, CardHeader, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label
} from 'reactstrap';



import BreadCrumb from '../../Components/Common/BreadCrumb';
import { getLoggedInUser } from '../../helpers/fakebackend_helper';
import FeatherIcon from 'feather-icons-react';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ModuleCard from '../../Components/QAManagementComponent/ModuleCard';
import { useParams } from 'react-router-dom';
import {fetchModulesForProject, addModuleForProject, updateModuleByID} from '../../slices/qaManagment/module/thunk';
import { nanoid } from 'nanoid';
import { getProjects } from '../../slices/qaManagment/project/thunk';
import toast from 'react-hot-toast';


const ModuleList = () => {

 const dispatch= useDispatch();
 const projects = useSelector((state) => state.Project.project);
 const {id} = useParams();
 useEffect(() => {
  // Fetch users when the component mounts
  dispatch(getProjects());
}, [dispatch]);
 
console.log("projecq34qwt:", projects);
const proj= projects.find((p) => p.id ===  id)
console.log("id:", id); // Check the value of id
console.log("project:", proj);
  const authUser = getLoggedInUser();
  const isAdmin = authUser.role === "admin";
  
  useEffect(() => {
    //Fetch all the modules for the project
    dispatch(fetchModulesForProject(id));

  }, [dispatch, id]);
 
  // Get the fetched module data from the Redux store
  const moduleData = useSelector(state => state.Module.module);
  console.log("moduleData:", moduleData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newModuleData, setNewModuleData] = useState({ module_name: '' });
  const [isEditMode, setIsEditMode] = useState(false); // New state for editing mode
  const [editedModule, setEditedModule] = useState(null); // New state for edited user

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsEditMode(false); // Reset editing mode when the modal is closed
    setEditedModule(null); // Reset edited user when the modal is closed
    setNewModuleData({
      module_name: '',
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewModuleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleAddModule = () => {
    try {
      const newModule = {
        id: nanoid(5), // Generate a unique ID
        project_id: id,
        ...newModuleData,
      };
      // Dispatch action to add new module here
      dispatch(addModuleForProject(id, newModule)); // Assuming you have a addModule action
      dispatch(fetchModulesForProject(id));
      setIsModalOpen(false);
      toast.success("Module Added Successfully");

    } catch (error) {
      console.log(error)
    }
    
  }

  const handleEditModule = (module) => {
    setIsModalOpen(true);
    setIsEditMode(true);
    setEditedModule(module);
    setNewModuleData(
      {
        module_name: module.module_name,
      }
    );
  }

  const handleUpdateModule = () => {
    console.log("editedModule", editedModule)
    console.log("newModuleData", newModuleData)
    // Dispatch action to update module here
    dispatch(updateModuleByID(editedModule.id, newModuleData)); 
    //close Modal
    setIsModalOpen(false);
    toast.success("Module Updated Successfully");
  }



  return (
    <React.Fragment>
    <div className="page-content">               
        <Container fluid>
            {/* breadcrumb */}
            <BreadCrumb title={proj ? proj.title : "Empty"} pageTitle="Ants Quality" />
            <Col lg={12}>
                        <Card>
                            <CardHeader>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="card-title mb-0">Module List</h5>
                                    {isAdmin ? <div className='p-1 rounded-1' onClick={toggleModal} style={{backgroundColor:"#4D44B5", color:"white", cursor:"pointer"}}> <FeatherIcon icon="plus"/></div> : null}
                                </div>
                            </CardHeader>
                            <CardBody>
                               <Row>
                               {moduleData.map(module => (
                                <Col  sm={10} md={3} key={module.id}>
                                  <ModuleCard title={module?.module_name} id={module.id} onEditModule={handleEditModule}/>
                                </Col>
                            ))}
                       
                                  
                              </Row>
                            </CardBody>
                        </Card>
            </Col>
        </Container>
    </div>
    <Modal isOpen={isModalOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>
      {isEditMode ? <div className='text-primary'>Edit Modulel</div> : <div className='text-primary'>Add New Module</div>}
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="module_name">Module Name</Label>
            <Input
              name='module_name'
              type="text"
              id="module_name"
              value={newModuleData.module_name}
              onChange={handleInputChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
      {isEditMode ? (
                        <Button color="primary" onClick={handleUpdateModule}>Update</Button>
                    ) : (
                        <Button color="primary" onClick={handleAddModule}>Submit</Button>
                    )}
        <Button color="secondary" onClick={toggleModal}>Cancel</Button>
      </ModalFooter>

      </Modal>
</React.Fragment>
   
  )
}

export default ModuleList;