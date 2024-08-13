

import React, { useState } from 'react';
import { Row, Col, Container, Card, CardBody, CardHeader, Modal, ModalHeader, ModalBody, ModalFooter, Button, From, FormGroup,Label,Input } from 'reactstrap';
import UserList from '../../Components/QAManagementComponent/Datatable/UserList';
import { useDispatch } from 'react-redux';
import { addUsers, updateUserById } from '../../slices/thunks';
//import nanoid from nanoid
import { nanoid } from 'nanoid';

// import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';

const UserManagement = () => {
    document.title = "Ants Quality - User Management";

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false); // New state for editing mode
    const [editedUser, setEditedUser] = useState(null); // New state for edited user


    const dispatch = useDispatch();

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setIsEditMode(false); // Reset editing mode when the modal is closed
        setEditedUser(null); // Reset edited user when the modal is closed
        setNewUserData({
            username: '',
            firstname: '',
            lastname: '',
            password: '',
            role: '',
        });
    };

    const [newUserData, setNewUserData] = useState({
        username: '',
        firstname: '',
        lastname: '',
        password: '',
        role: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddUser = () => {
        // Generate a random id (you might need to use a more robust method)
        const id = nanoid(5);

        // Create a new user object with the generated id and the rest of the data
        const newUser = {
            id,
            ...newUserData,
        };

        // Dispatch the addUser action to add the new user to the Redux store
        dispatch(addUsers(newUser));

        // Close the modal after adding the user
        toggleModal();
    };

    const handleEditUser = (user) => {
        setIsModalOpen(true);
        setIsEditMode(true);
        setEditedUser(user);
        setNewUserData({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            password: user.password,
            role: user.role,
        });
    };

    const handleUpdateUser = () => {
        // Dispatch the updateUserById action to update the user data
        console.log ( "editeduser.id:" , editedUser.id ,"editedData:", newUserData )
        dispatch(updateUserById(editedUser.id, newUserData));

        // Close the modal after updating the user
        toggleModal();
    };


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="User Management" pageTitle="Ants Quality" />
                    {/* Tile Boxs Widgets */}
                    <Col lg={12}>
                        <Card>
                            <CardHeader>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="card-title mb-0">User List</h5>
                                    <div className="btn btn-outline-primary" onClick={toggleModal}>+ Add</div>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <UserList onEditUser={handleEditUser}/>
                            </CardBody>
                        </Card>
                    </Col>
                </Container>
            </div>

            {/* Add User Modal */}
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>
                {isEditMode ? <div className='text-primary'>Edit User</div> : <div className='text-primary'>Add New User</div>}
                    </ModalHeader>
                <ModalBody>
                    {/* Form for adding a new user */}
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text" name="username" id="username" placeholder="Enter username" onChange={handleInputChange} value={newUserData.username} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="firstname">First Name</Label>
                        <Input type="text" name="firstname" id="firstname" placeholder="Enter first name" onChange={handleInputChange} value={newUserData.firstname} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastname">Last Name</Label>
                        <Input type="text" name="lastname" id="lastname" placeholder="Enter last name" onChange={handleInputChange} value={newUserData.lastname} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Enter password" onChange={handleInputChange} value={newUserData.password} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="role">Role</Label>
                        <Input type="text" name="role" id="role" placeholder="Enter role" onChange={handleInputChange} value={newUserData.role} />
                    </FormGroup>
                </ModalBody>
                {/* <ModalFooter>
                    <Button color="light" onClick={toggleModal}>Cancel</Button>
                    <Button color="primary" onClick={handleAddUser}>Submit</Button>{' '}
                </ModalFooter> */}
                <ModalFooter>
                    <Button color="light" onClick={toggleModal}>Cancel</Button>
                    {isEditMode ? (
                        <Button color="primary" onClick={handleUpdateUser}>Update</Button>
                    ) : (
                        <Button color="primary" onClick={handleAddUser}>Submit</Button>
                    )}
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
};

export default UserManagement;
