import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:5000/tasks",
  headers: {
    "Content-type": "application/json",
  },
});
