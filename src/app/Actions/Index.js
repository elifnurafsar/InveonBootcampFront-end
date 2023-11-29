import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from "sweetalert2";

export const getAllProducts = createAsyncThunk('products/getAllProducts', async () => {
  const response = await axios.get('https://localhost:5050/api/products')
    .catch(error => {
      console.error("API Error:", error);
      throw error; // Throw the error again to trigger the rejection of the promise
    });
  return response.data;
});

// Action to get products by category
export const getProductsByCategory = createAsyncThunk('products/getProductsByCategory', async (categoryName) => {
  //console.log("Inside get products by category: ", categoryName);
  try {
    const response = await axios.get(`https://localhost:5050/api/products/byCategory/${categoryName}`);
    //console.log("API Response:", response.data);
    return  { categoryName, "_products": response.data };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
});

export const getProductByID = createAsyncThunk('products/getProductByID', async (productId) => {
  //console.log("Inside get products by id: ", productId);
  try {
    const response = await axios.get(`https://localhost:5050/api/products/${productId}`);
    //console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
});

// Action to get user favorites by user ID
export const getUserFavorites = createAsyncThunk('favorites/getUserFavorites', async (user) => {
  //console.log("Inside get favorites by user_id: ", user.user_id, user.access_token);
  try {
    let user_id = user.user_id;
    const response = await axios.get(`https://localhost:5050/api/favorites/${user_id}`, 
      { headers: 
        {"Authorization" : `Bearer ${user.access_token}`,
        "Access-Control-Allow-Origin": "*" ,
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": "content-type",
        "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH, OPTIONS",
        "Access-Control-Max-Age": "1800"
        }
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
});
  
// Action to add or remove a product from favorites
/*export const toggleFavorite = createAsyncThunk('favorites/toggleFavorite', async ({ user, productId, _action }) => {
    try {
      let response;
      const headers = {
        'Authorization': `Bearer ${user.access_token}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'content-type',
        'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, PATCH, OPTIONS',
        'Access-Control-Max-Age': '1800',
      };

      if (_action === 'add') {
        response = await axios.post(
          `https://localhost:5050/api/favorites`,
          //favoriteitemdto
          { "UserId": user.user_id, "ProductId": productId },
          { headers }
        );
      } else if (_action === 'remove') {
        response = await axios.delete(`https://localhost:5050/api/favorites`, {
          //favoriteitemdto
          data: { "UserId": user.user_id, "ProductId": productId },
          headers,
        });
      } else {
        throw new Error("Invalid action specified. Use 'add' or 'remove'.");
      }

      const responseData = response.data;
  
      if (responseData && responseData.isSuccess) {
        return responseData.result;
      } else {
        throw new Error(responseData.displayMessage || 'API Error');
      }
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
});*/

export const toggleFavorite = createAsyncThunk('favorites/toggleFavorite', async ({ user, productId, _action }) => {
    try {
      let response;
      const headers = {
        'Authorization': `Bearer ${user.access_token}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'content-type',
        'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, PATCH, OPTIONS',
        'Access-Control-Max-Age': '1800',
      };

      if (_action === 'add') {
        response = await axios.post(
          `https://localhost:5050/api/favorites`,
          //favoriteitemdto
          { "UserId": user.user_id, "ProductId": productId },
          { headers }
        );
      } else if (_action === 'remove') {
        response = await axios.delete(`https://localhost:5050/api/favorites`, {
          //favoriteitemdto
          data: { "UserId": user.user_id, "ProductId": productId },
          headers,
        });
      } else {
        throw new Error("Invalid action specified. Use 'add' or 'remove'.");
      }

      const responseData = response.data;

      if (responseData.isSuccess) {
        if (_action === 'add') {
          // Show a success message when the item is added
          Swal.fire({
            icon: 'success',
            title: 'Added to Favorites',
            text: 'This product has been added to your favorites.',
          });
          return responseData.result; // Item added successfully
        } else {
          // Show a success message when the item is removed
          Swal.fire({
            icon: 'success',
            title: 'Removed from Favorites',
            text: 'This product has been removed from your favorites.',
          });
          return null; // Item removed successfully
        }
      } else {
        // Handle the case where the item already exists
        if (responseData.errorMessages && responseData.errorMessages.length > 0) {
          // Show a warning message when the item already exists
          Swal.fire({
            icon: 'warning',
            title: 'Already in Favorites',
            text: responseData.errorMessages[0],
          });
        } else {
          // Show a generic error message
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong. Please try again.',
          });
        }
        return null; // Handle the case according to your application logic
      }
    } catch (error) {
      console.error('API Error:', error);
      // Show a generic error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again.',
      });
      throw error;
    }
  }
);

export const deleteAllFavorites = createAsyncThunk('favorites/deleteAllFavorites', async (user) => {
    try {
      const headers = {
        'Authorization': `Bearer ${user.user.access_token}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'content-type',
        'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, PATCH, OPTIONS',
        'Access-Control-Max-Age': '1800',
      };
      const response = await axios.delete(`https://localhost:5050/api/favorites/${user.user.user_id}`, { headers });

      const responseData = response.data;

      if (responseData && responseData.isSuccess) {
        return responseData.result;
      } else {
        throw new Error(responseData.displayMessage || 'API Error');
      }
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
);
  