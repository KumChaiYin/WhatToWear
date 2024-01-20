import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL_VERCEL }); 

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    } 
    return req;
});

export const logIn = (formData) => API.post('/user/login', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const fetchUser = (id) => API.get(`/user/profile/${id}`);


export const getPrevOutfits = (day, userId) => API.get(`/outfits/getPrevOutfits?day=${day}&userId=${userId}`) //day is passed as param from frontend
export const getCurrOutfits = (day, userId) => API.get(`/outfits/getCurrOutfits?day=${day}&userId=${userId}`) //day is passed as param from frontend
export const getAllTops = (userId) => API.get(`/outfits/getAllTops/${userId}`); //userId is a string
export const getAllBottoms = (userId) => API.get(`/outfits/getAllBottoms/${userId}`);
export const getAllFull = (userId) => API.get(`/outfits/getAllFulls/${userId}`);

export const refresh = (id) => API.patch(`/outfits/refresh?id=${id}`); // id is of type string in a the req body
export const update = (outfitType, clothesId, userId, day) => API.patch('/outfits/update', { outfitType, clothesId, userId, day }); // all are of type string (outfitType is top/bottom/full) (day is M/Tu/W/Th/F/Sa/Su)
export const addTop = (image) => API.post(`/wardrobe/addTop`, image);
export const addBottom = (image) => API.post(`/wardrobe/addBottom`, image);
export const addFull = (image) => API.post(`/wardrobe/addFull`, image);
