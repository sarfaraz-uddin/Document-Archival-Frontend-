// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Col, Row } from 'reactstrap';

// const BreadCrumb = ({ title, pageTitle }) => {
//     return (
//         <React.Fragment>
//             <Row>
//                 <Col xs={12}>
//                     <div className="page-title-box d-sm-flex align-items-center justify-content-between">
//                         <h4 className="mb-sm-0">{title}</h4>

//                         <div className="page-title-right">
                            // <ol className="breadcrumb m-0">
                            //     <li className="breadcrumb-item"><Link to="#">{pageTitle}</Link></li>
                            //     <li className="breadcrumb-item active">{title}</li>
                            // </ol>
//                         </div>

//                     </div>
//                 </Col>
//             </Row>
//         </React.Fragment>
//     );
// };

// export default BreadCrumb;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Col, Row } from 'reactstrap';

// const BreadCrumb = ({ title, pageTitle, breadcrumbItems }) => {
//     return (
//         <React.Fragment>
//             <Row>
//                 <Col xs={12}>
//                     <div className="page-title-box d-sm-flex align-items-center justify-content-between">
//                         <h4 className="mb-sm-0">{title}</h4>

//                         <div className="page-title-right">
//                             <ol className="breadcrumb m-0">
//                                 {breadcrumbItems &&
//                                     breadcrumbItems.map((item, index) => (
//                                         <li key={index} className="breadcrumb-item">
//                                             {item.link ? <Link to={item.link}>{item.title}</Link> : <span>{item.title}</span>}
//                                         </li>
//                                     ))}
//                                 {pageTitle && (
//                                     <ol className="breadcrumb m-0">
//                                     <li className="breadcrumb-item"><Link to="#">{pageTitle}</Link></li>
//                                     <li className="breadcrumb-item active">{title}</li>
//                                 </ol>
//                                 )}
//                             </ol>
//                         </div>
//                     </div>
//                 </Col>
//             </Row>
//         </React.Fragment>
//     );
// };

// export default BreadCrumb;


import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

const BreadCrumb = ({ title, pageTitle, breadcrumbItems }) => {
    return (
        <React.Fragment>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0">{title}</h4>

                        <div className="page-title-right">
                            <ol className="breadcrumb m-0 align-items-center justify-content-center d-flex">
                                {breadcrumbItems &&
                                    breadcrumbItems.map((item, index) => (
                                        <li key={index} className={`breadcrumb-item ${index === breadcrumbItems.length - 1 ? 'active' : ''}`}>
                                        {item.link ? <Link to={item.link}>{item.title}</Link> : <span>{item.title}</span>}
                                    </li>
                                    ))}
                                {pageTitle && (
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item "><Link to="#">{pageTitle}</Link></li>
                                        <li className="breadcrumb-item active">{title}</li>
                                    </ol>
                                )}
                            </ol>
                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default BreadCrumb;