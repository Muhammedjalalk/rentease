import axios from "axios";

const APIAdmin = axios.create({
  baseURL: "http://localhost:5000/api/admin",
  headers: {
    "Content-Type": "application/json",
  },
});

export default APIAdmin;


// baseURL: "http://localhost:5000/admin"