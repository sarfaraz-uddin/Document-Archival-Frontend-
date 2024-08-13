import React, {useRef} from "react"
import { Container, Row, Col, Card, CardBody, CardHeader, Form, Button,Input,Label } from "reactstrap"
import BreadCrumb from "../../../src/Components/Common/BreadCrumb"
import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getallTestCases } from "../../slices/qaManagment/Test/thunk"
import { useParams } from "react-router-dom"
import DOMPurify from 'dompurify';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { addTestCaseResult } from "../../slices/qaManagment/TestResult/thunk";
import { getLoggedInUser } from "../../helpers/fakebackend_helper"
import toast from 'react-hot-toast';

import { getTestResultForTestCase } from "../../slices/qaManagment/TestResult/thunk"


export default function TestResult(){
    const editorRef = useRef();
    const notify = () => toast('Here is your toast.');
    const[isHovered, setIsHovered] = useState(false);
    const auth = getLoggedInUser();
    const dispatch = useDispatch();
    const {id} = useParams();
    const testCaseData = useSelector(state => state.TestCase.testcase);
    const testResults = useSelector(state => state.TestResult.testresult);
    console.log("testResults:", testResults);

    const historyCss = {
        border:"1px solid  #7D74DD ",
        backgroundColor: "#F2F1FB",
        borderRadius: '0px',
    }
    const buttoncss={
        border:"1px solid  #7D74DD ",
        backgroundColor: isHovered ? "#7D74DD" : "#F2F1FB",
        borderRadius: '0px',
        color: isHovered ? '#FFFFFF' : '#4D44B5',
        transition: "transform 0.3s",
    }

 

    useEffect(() => {
        //fetch all the testcases for the module
        dispatch(getallTestCases());
        dispatch(getTestResultForTestCase(id));
      },[dispatch])



      const currentTestCase = testCaseData.find(testcase => testcase.id === id);
        // console.log("currentTestcase:", currentTestCase);
        // console.log("currentTestCasetitle:", currentTestCase? currentTestCase?.testTitle : "");
        // console.log("currentTestCasetitle:", currentTestCase?.scenario );

    const createMarkup = (html) => {
        return { __html: DOMPurify.sanitize(html) };
      };

      const [newTestResult, setNewTestResult] = useState({
        TestedBy: '',       // User ID (you might get this from your authentication system)
        ActualResult: '',   // Actual result text
        TestedOn: new Date().toISOString(), // Today's date
        status: false
    });




    const handleSubmitResult = () => {
        // Prepare the new test result object
        
        const createdTestResult = {
            TestId: id, // The ID of the current test case
            TestedBy: auth.username, // The ID of the current user
            ActualResult: newTestResult.ActualResult,
            TestedOn: newTestResult.TestedOn,
            status: newTestResult.status
        };

        // Dispatch an action to create the new test result
        dispatch(addTestCaseResult(id, createdTestResult)); // Replace with your action

        // Reset the new test result data to empty or default values
        setNewTestResult({
            TestedBy: '',
            ActualResult: '',
            TestedOn: new Date().toISOString(),
        });
        //consolelog testd on
        console.log("TestedOn:", newTestResult.TestedOn);

        if (editorRef.current) {
            editorRef.current.setData("");
        }
        toast.success('Test Result Submitted Successfully');
    
    };

    const sortedTestResults = [...testResults].sort((a, b) => {
        const dateA = new Date(a.TestedOn);
        const dateB = new Date(b.TestedOn);
        return dateB - dateA; // Sort in descending order (latest first)
      });

      console.log("sortedTestResults:", sortedTestResults);
   

    return(
        <React.Fragment>
        <div className="page-content">               
            <Container fluid>
                {/* breadcrumb */}
                <BreadCrumb
           
            breadcrumbItems={[
              { title: 'Ants Quality', link: '/' },
              { title: 'Project', link: '/projects' },
              { title: 'Project',link:"/module" },
            ]} />

            <Row >
                <Col lg={8}>
                        <Card>
                            <CardHeader>
                                <h5 className="text-center pb-0" style={{color:'#4D44B5'}}> {currentTestCase?.testTitle && currentTestCase.testTitle.toUpperCase()}</h5>
                            </CardHeader>
                            <CardBody>
                                <Col lg={12} >
                                        <Form className="px-4 ">
                                            <div className="row gx-5 mt-5">
                                                        <div className="col-6 bordered">
                                                            <div className="Scenario" style={{borderRight:"1px solid #D9d9d9"}}>
                                                                <h5 className="fs-16">Scenario</h5>
                                                                <div className="px-3 text-body-secondary" dangerouslySetInnerHTML={createMarkup(currentTestCase?.scenario)}>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                        <div className="TestSteps">
                                                                <h5 className="fs-16">Test Steps</h5>
                                                                <div className="px-3 text-body-secondary" dangerouslySetInnerHTML={createMarkup(currentTestCase?.TestSteps)} ></div>
                                                            </div>
                                                        </div>
                                            </div>
                                            <div className="row gx-5 mt-5">
                                                        <div className="col-6">
                                                            <div className="Description" style={{borderRight:"1px solid #D9d9d9"}}>
                                                                <h5 className="fs-16">Description</h5>
                                                                <div className="px-3 text-body-secondary" dangerouslySetInnerHTML={createMarkup(currentTestCase?.Description)} ></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="testData">
                                                                <h5 className="fs-16">Test Data</h5>
                                                                <div className="px-3 text-body-secondary" dangerouslySetInnerHTML={createMarkup(currentTestCase?.TestData)} ></div>
                                                            </div>
                                                        </div>
                                            </div>
                                            <div className="row gx-5 mt-5">
                                                        <div className="col-6">
                                                            <div className="Pre-requisite" style={{borderRight:"1px solid #D9d9d9"}}>
                                                                <h5 className="fs-16">Pre-requisite</h5>
                                                                <div className="px-3 text-body-secondary" dangerouslySetInnerHTML={createMarkup(currentTestCase?.PreRequisities)} ></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="Expected Result">
                                                                <h5 className="fs-16">Expected Result</h5>
                                                                <div className="px-3 text-body-secondary" dangerouslySetInnerHTML={createMarkup(currentTestCase?.ExpectedResult)} ></div>
                                                            </div>
                                                        </div>
                                                        
                                            </div>           
                                         
                                                {auth.role==="admin" ?"":
                                                <div className="row mt-5 justify-content-end">
                                                <div className="col-12">
                                                            <h5 className="fs-16">Actual Result</h5>
                                                            <div className="form-check form-switch form-switch-success mb-3">
                                                                <Label className="form-check-label" for="SwitchCheck5">Success</Label>
                                                                <Input className="form-check-input status-button"  type="checkbox" role="switch" id="SwitchCheck5"
                                                                checked={newTestResult.status} // Set checked attribute based on status value
                                                                onChange={() => setNewTestResult((prevState) => ({ ...prevState, status: !prevState.status }))} />
                                                            
                                                            </div>
                                                            <CKEditor
                                                            editor={ClassicEditor}
                                                            data={newTestResult.ActualResult} // Set initial content
                                                            onChange={(event, editor) => {
                                                                const data = editor.getData();
                                                                setNewTestResult((prevState) => ({ ...prevState, ActualResult: data }));
                                                            }}
                                                        />

                                                        </div>
                                                          <div className="col mt-3">
                                                          <Button color="primary w-100" 
                                                              style={buttoncss} 
                                                              onMouseEnter={() => setIsHovered(true)}
                                                              onMouseLeave={() => setIsHovered(false)}
                                                              onClick={handleSubmitResult}>Submit Result
                                                              
                                                          </Button>
                                                     </div>
                                                    </div>
                                                   }
                                        </Form>
                                </Col>
                            </CardBody>
                        </Card>
                </Col>
                <Col lg={4} style={{height:'600px', 
                    maxHeight:'600px', 
                    overflowY:'scroll', 
                    border:"1px solid  #7D74DD ",
                    backgroundColor: "#F2F1FB",
                    borderRadius: '0px',
                    padding:'0'}}>
                    <Card className="mb-0 bg-transparent" >
                        <CardHeader className="bg-transparent">
                                <h5 className="text-center pb-0" style={{color:"#4D44B5"}} > Test History</h5>
                        </CardHeader>
                            <CardBody>
                            <Row>
                                    {sortedTestResults.map(testResult => (
                                    <Col lg={12} className="mt-3" >
                                                <div className={`status ${testResult.status?"text-success":"text-danger"}`}>{testResult.status?"Success": "Fail"}</div>
                                                <div  dangerouslySetInnerHTML={createMarkup(testResult?.ActualResult)} ></div>
                                            <div className="fs-10 d-flex justify-content-end">
                                                <span className="text-muted">{testResult.TestedBy}</span>
                                                <span className="text-muted ps-2">{new Date(testResult.TestedOn).toISOString().split('T')[0]}</span>
                                        </div>
                                        <hr className="p-0 m-0"/>
                                        </Col>
                                        ))}
                            </Row>
                            </CardBody>
                        </Card>
                </Col>
            </Row>
                
    
            </Container>
        </div>
        
    </React.Fragment>
    )
 }