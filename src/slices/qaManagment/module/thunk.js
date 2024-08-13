import axios from 'axios';
import { fetchModulesRequest, fetchModulesSuccess, fetchModulesFailure, addModule, updateModule, deleteModule } from './reducer'; // Update the import path according to your file structure

const API_BASE_URL = 'http://localhost:8000/api';



//fetch all modules 
export const getModules = () => async (dispatch) => {
  try {

    dispatch(fetchModulesRequest()); // Dispatch the fetchModulesRequest action
    const response = await axios.get(`${API_BASE_URL}/modules`);

    if (response){
      const data = response;
      dispatch(fetchModulesSuccess(data));
    }
    else{
      console.log("No module found in the response.")
    }
  } catch (error) {
    console.log(error)
    dispatch(fetchModulesFailure(error.message));
  }
}


export const fetchModulesForProject = (projectId) => async (dispatch) => {
  try {
    dispatch(fetchModulesRequest()); // Dispatch the fetchModulesRequest action

    const response = await axios.get(`${API_BASE_URL}/project/${projectId}/modules`);
    console.log("response", response);
    dispatch(fetchModulesSuccess(response));
  } catch (error) {
    console.error('Error fetching modules:', error.message);
    dispatch(fetchModulesFailure(error.message));
  }
};

export const addModuleForProject = (projectId, module) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/project/${projectId}/module`, module);
    dispatch(addModule(response));
  } catch (error) {
    console.error('Error adding module:', error);
  }
}

export const updateModuleByID = (moduleId, updatedModuleData) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/module/${moduleId}`, updatedModuleData);
    dispatch(updateModule(response));
  } catch (error) {
    console.error('Error updating module:', error);
  }
}

export const deleteModuleByID = (moduleId) => async (dispatch) => {
  try {

    //delete request
    await axios.delete(`${API_BASE_URL}/module/${moduleId}`);

    //dispatch delete action
    dispatch(deleteModule(moduleId));
  } catch (error) {
    console.error('Error deleting module:', error);
    //handle error here
  }
}
