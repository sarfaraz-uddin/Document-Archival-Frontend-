

// import React, { useState } from 'react';
// import { Card, CardBody, CardFooter, CardHeader, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// import { Link } from 'react-router-dom';

// const ModuleCard = (props) => {
//     const [isHovered, setIsHovered] = useState(false);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//     const cardStyle = {
//         height: '200px',
//         borderRadius: '2px',
//         border: isHovered ? "2px solid #88C8AA" : "1px solid #88C8AA",
//         backgroundColor: "#F1F8F5",
//         transition: "transform 0.3s",
//         transform: isHovered ? "scale(1.05)" : "scale(1)",
//         boxShadow: isHovered ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none",
//     };

//     const toggleDropdown = () => {
//         setIsDropdownOpen(!isDropdownOpen);
//     };

//     return (
//         <Link to="/project/module/testcase">
//             <Card
//                 className='text-center d-flex'
//                 style={cardStyle}
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}>
//                 <CardHeader className='p-0 bg-transparent border-0 px-2 pt-2'>
//                     <div className="d-flex justify-content-end align-items-end">
//                         <i
//                             className='ri-more-2-fill'
//                             onMouseEnter={() => setIsDropdownOpen(true)}
//                             onMouseLeave={() => setIsDropdownOpen(false)}>
//                             Action
//                         </i>
//                         <Dropdown isOpen={isDropdownOpen} toggle={toggleDropdown} direction="left">
//                             <DropdownToggle tag="span" data-toggle="dropdown" aria-expanded={isDropdownOpen}>
//                                 {/* You can put some icon or text here */}
//                             </DropdownToggle>
//                             <DropdownMenu>
//                                 <DropdownItem>Edit</DropdownItem>
//                                 <DropdownItem>Delete</DropdownItem>
//                             </DropdownMenu>
//                         </Dropdown>
//                     </div>
//                 </CardHeader>
//                 <CardBody className='align-item-center justify-content-center d-flex flex-column'>
//                     {props.title}
//                 </CardBody>
//                 <CardFooter className='bg-transparent border-0' style={{ fontSize: '12px' }}>
//                     {/* Your footer content */}
//                 </CardFooter>
//             </Card>
//         </Link>
//     );
// };

// export default ModuleCard;

import React, { useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteModuleByID } from '../../slices/qaManagment/module/thunk';

const ModuleCard = (props) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const module={
       id:props.id,
       module_name:props.title,
    }

    const cardStyle = {
        height: '200px',
        borderRadius: '2px',
        border: isHovered ? "2px solid #88C8AA" : "1px solid #88C8AA",
        backgroundColor: "#F1F8F5",
        transition: "transform 0.3s",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        boxShadow: isHovered ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none",
    };

    const toggleDropdown = (e) => {
        e.stopPropagation()
        setIsHovered(false);
        setIsDropdownOpen(!isDropdownOpen);
        e.preventDefault();
    };

    const onMouseEnterDropdown = () => {
        setIsDropdownOpen(true);
    };

    const onMouseLeaveDropdown = () => {
        setIsDropdownOpen(false);
    };


   

    const deleteButtonHandler = (e) => {
        e.stopPropagation(); // Prevent the click event from bubbling up to the cardClickHandler
        dispatch(deleteModuleByID(props.id));
        
    };

    return (
       
        <Link  to={`/project/module/${props.id}`}>
            <Card
                className='text-center d-flex'
                style={cardStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <CardHeader className='p-0 bg-transparent border-0 px-2 pt-2'>
                <div className="d-flex justify-content-end align-items-end">
                        <i className='ri-more-2-fill' style={{cursor:'pointer'}}  onClick={toggleDropdown}>
                      
                        </i>
                        <Dropdown isOpen={isDropdownOpen} toggle={toggleDropdown} direction="left" onMouseEnter={onMouseEnterDropdown} onMouseLeave={onMouseLeaveDropdown}>
                            <DropdownToggle tag="span" data-toggle="dropdown" aria-expanded={isDropdownOpen}>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem className='text-danger '  onClick={deleteButtonHandler}><i className='ri-delete-bin-line me-2' style={{fontSize:"12px"}}></i>Delete</DropdownItem>
                                <DropdownItem onClick={()=>props.onEditModule(module)}> <i className='ri-edit-fill me-2 text-body-secondary'></i>Edit</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </CardHeader>
                <CardBody className='align-item-center justify-content-center d-flex flex-column'>
                    {props.title}
                </CardBody>
                <CardFooter className='bg-transparent border-0' style={{ fontSize: '12px' }}>
                    {/* Your footer content */}
                </CardFooter>
            </Card>
        </Link>
 
    );
};

export default ModuleCard;
