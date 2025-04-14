'use client'
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.fluencerz.com/api', 
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
