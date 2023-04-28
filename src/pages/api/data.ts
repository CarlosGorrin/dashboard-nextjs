import axios from 'axios';
import { Country, Location } from '../../interfaces/locations-countries'

export const API_URL = 'http://localhost:3000';

export const fetchCountries = async () => {
  const { data } = await axios.get<Country[]>(`${API_URL}/countries`);
  return data;
};

export const fetchLocations = async () => {
  const { data } = await axios.get<Location[]>(`${API_URL}/locations`);
  return data;
};

export const fetchLocationById = async (id: number) => {
  const { data } = await axios.get(`${API_URL}/locations/${id}`);
  return data;
};

export const createLocation = async (location: Location) => {
  const { data } = await axios.post<Location[]>(`${API_URL}/locations`, location);
  return data;
};

export const updateLocation = async (location: Location) => {
  const { data } = await axios.put<Location[]>(`${API_URL}/locations/${location.id}`, location);
  return data;
};