import axios from 'axios';
import { getTestResultFailure, getTestResultSuccess,getTestResultRequest,addTestResult } from './reducer';

const API_BASE_URL = 'http://localhost:8000/api';

export const getTestResult = () => async (dispatch) => {
    try {
        dispatch(getTestResultRequest()); // Dispatch the fetchModulesRequest action
    
        const response = await axios.get(`${API_BASE_URL}/testresults`);
        console.log("response", response);
    
        if (response) {
        const data = response;
        console.log("data", data);
        dispatch(getTestResultSuccess(data));
        }
        
    } catch (error) {
        console.error('Error fetching modules:', error.message);
        dispatch(getTestResultFailure(error.message));
    }
}

// add test result for test case

export const addTestCaseResult = (testcaseId, testresult) => async (dispatch) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/testcase/${testcaseId}/testresult`, testresult);
      dispatch(addTestResult(response));
    } catch (error) {
      console.error('Error adding module:', error);
    }
  }

  //get all test results for test id

  export const getTestResultForTestCase = (testcaseId) => async (dispatch) => {
    try {
      dispatch(getTestResultRequest()); // Dispatch the fetchModulesRequest action
  
      const response = await axios.get(`${API_BASE_URL}/testcase/${testcaseId}/testresults`);
      console.log("response", response);
  
      if (response) {
        const data = response;
        console.log("data", data);
        dispatch(getTestResultSuccess(data));
      }
      
    } catch (error) {
      console.log(error)
    }
  }

