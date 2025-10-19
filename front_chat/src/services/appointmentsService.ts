import axios from "axios";

const API_URL = "http://localhost:3000";

export const AppointmentsService = {
  async getAll() {
    const res = await axios.get(`${API_URL}/appointments`);
    return res.data;
  },

  async delete(id: number) {
    return axios.delete(`${API_URL}/appointments/${id}`);
  },

  async update(id: number, data: Partial<{ servico: string; datetime: string }>) {
    return axios.patch(`${API_URL}/appointments/${id}`, data);
  },

  async create(data: { servico: string; datetime: string }) {
    return axios.post(`${API_URL}/appointments`, data);
  },
};
