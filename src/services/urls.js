import axios from "axios";

const baseURL = 'https://upskilling-egypt.com:3006/api/v1';
export  const beasImageURL = 'https://upskilling-egypt.com:3006/';

export const axiosInstance = axios.create({
    baseURL,
    headers:{
        Authorization:  localStorage.getItem('token')
       }
});


// chat

axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  



export const USERS_URLS = {
    LOGIN: `/users/login`,
    FORGET_PASSWORD : `/Users/Reset/Request`,
    RESET_PASSWORD: `/Users/Reset`,
    GET_ALL_USERS: `/Users/`,
    DELETE_USER:(id)=> `/Users/${id}`
}
export const CATEGORIIES_URLS = {
    GET_CATEGORY: `/Category/`,
    CREATE_CATEGORY : `/Category/`,
    UPDATE_CATEGORY:(id)=> `/Category/${id}`,
    DELETE_CATEGORY:(id)=> `/Category/${id}`
}
export const RECIPES_URLS ={
    GET_RECIPES : '/Recipe/',
    CREATE_RECIPES : '/Recipe/',
    DELETE_RECIPES:(id)=> '/Recipe/'+id,
    UPDATE_RECIPES:(id)=> '/Recipe/'+id,
}
// ================ tag ===============

export const TAG_URLS = {
    GET_TAG : '/tag/',
}
// ================ fav =============
// /api/v1/userRecipe/
export const FAV_URLS ={
    GET_FAV : "/userRecipe/",
    POST_FAV: `/userRecipe/`,
    DELETE_FAV:(id)=> `/userRecipe/${id}`,

}
// ================ fav =============

export const REGESTORE_URLS ={
    SET_REGESTORE : "/Users/Register/",
    VERIFY_REGESTORE : '/Users/verify/'

}
// ================ change password =============
// /api/v1/Users/ChangePassword
export const CHANGEPASSWORD_URLS ={
    CHANGEPASSWORD : "/Users/ChangePassword/"

}
