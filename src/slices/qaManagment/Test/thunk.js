import axios from 'axios';
import { fetchTestCaseRequest, fetchTestCaseSuccess, fetchTestCaseFailure, addTestCase, updateTestCase, deleteTestCase } from './reducer';

const API_BASE_URL = 'http://localhost:8000/api';

export const fetchTestCaseForModule = (moduleId) => async (dispatch) => {
  try {
    dispatch(fetchTestCaseRequest()); // Dispatch the fetchModulesRequest action

    const response = await axios.get(`${API_BASE_URL}/module/${moduleId}/testcases`);
    console.log("response", response);

    if (response) {
      const data = response;
      console.log("data", data);
      dispatch(fetchTestCaseSuccess(data));
    }
    
  } catch (error) {
    console.error('Error fetching modules:', error.message);
    dispatch(fetchTestCaseFailure(error.message));
  }
}

export const addTestCaseForModule = (moduleId, testcase) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/module/${moduleId}/testcase`, testcase);
    dispatch(addTestCase(response));
  } catch (error) {
    console.error('Error adding module:', error);
  }
}

export const updateTestCaseByID =(testcaseId, updatedTestCaseData) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/testcase/${testcaseId}`, updatedTestCaseData);
    dispatch(updateTestCase(response));
  } catch (error) {
    console.error('Error updating module:', error);
  }
}


export const deleteTestCaseByID = (testcaseId) => async (dispatch) => {
  try {
    await axios.delete(`${API_BASE_URL}/testcase/${testcaseId}`);
    dispatch(deleteTestCase(testcaseId));
  } catch (error) {
    console.error('Error deleting module:', error);
  }
}

//get all test cases 
export const getallTestCases = () => async (dispatch) => {
  try {
    dispatch(fetchTestCaseRequest()); // Dispatch the fetchModulesRequest action

    const response = await axios.get(`${API_BASE_URL}/testcase`);
    console.log("response", response);

    if (response) {
      const data = response;
      console.log("data", data);
      dispatch(fetchTestCaseSuccess(data));
    }
    
  } catch (error) {
    console.error('Error fetching modules:', error.message);
    dispatch(fetchTestCaseFailure(error.message));
  }
}