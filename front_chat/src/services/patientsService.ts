import axios from "axios";

const API_URL = "http://localhost:3000";

export const PatientService = {
  async getAll() {
    const res = await axios.get(`${API_URL}/patients`);
    return res.data;
  },
};
