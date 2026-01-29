import axios from "axios";

const API_BASE_URL = 'https://localhost:7078/api';

export const getDocumentosPorPais = async (pais: string) => {
  const response = await axios.get(`${API_BASE_URL}/DocumentoIdentidad/pais/${pais}`);
  return response.data;
};

export const getBeneficiarios = async () => {
  const response = await axios.get(`${API_BASE_URL}/Beneficiario`);
  return response.data;
};

export const getBeneficiarioById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/Beneficiario/${id}`);
  return response.data;
};

export const createBeneficiario = async (data: any) => {
  const response = await axios.post(`${API_BASE_URL}/Beneficiario`, data);
  return response.data;
};

export const updateBeneficiario = async (id: number, data: any) => {
  const response = await axios.put(`${API_BASE_URL}/Beneficiario/${id}`, data);
  return response.data;
};

export const deleteBeneficiario = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/Beneficiario/${id}`);
  return response.data;
};