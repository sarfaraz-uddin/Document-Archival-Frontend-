import axios from 'axios';
import { fetchUser, fetchUserSuccess, fetchUserFailure,addUser, updateUser } from './reducer';

// Import the deleteUser action from your reducer
import { deleteUser } from './reducer';

const apiUrl = 'http://localhost:8000/api/user';

export const getUsers = () => async (dispatch) => {
    try {
        dispatch(fetchUser());
        const response = await axios.get(apiUrl);
        
        // Log the entire response object to inspect its structure
        console.log("response", response);

        // Make sure response.data is not undefined
        if (response) {
            const data = response;
            console.log("data", data);
            dispatch(fetchUserSuccess(data));
        } else {
            console.log("No data found in the response.");
        }
    } catch (error) {
        console.log("error", error);
        dispatch(fetchUserFailure(error.message));
    }
};

export const addUsers = (newUser) => async (dispatch) => {
    try {
        // Assuming your API supports POST request to add a new user
        const response = await axios.post(apiUrl, newUser);

        // Log the response for debugging purposes
        console.log("addUser response", response);

        // Dispatch the addUser action to update the state
        if (response ) {
            dispatch(addUser(response)); // Assuming the response contains the newly added user data
        } else {
            console.log("No data found in the response.");
        }
    } catch (error) {
        console.log("error", error);
        // Handle error if needed
    }
};



export const deleteUserById = (userId) => async (dispatch) => {
  try {
    // Send a DELETE request to the API
    await axios.delete(`${apiUrl}/${userId}`);
    
    // Dispatch the deleteUser action to update the state
    dispatch(deleteUser(userId));
  } catch (error) {
    console.log(error);
    // Handle error if needed
  }
};


export const updateUserById = (userId, updatedUserData) => async (dispatch) => {
    console.log("Reached here", userId , updatedUserData)
    try {
      // Send a PUT request to the API to update user data
      
      const response = await axios.put(`${apiUrl}/${userId}`, updatedUserData);
      console.log(response)
  
      // Dispatch the updateUser action to update the state
      if (response) {
        dispatch(updateUser(response)); // Assuming the response contains the updated user data
      } else {
        console.log('No data found in the response.');
      }
    } catch (error) {
      console.log('error', error);
      // Handle error if needed
    }
  };
  