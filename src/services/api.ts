import axios from 'axios';
import { REACT_NATIVE_API_URL } from '@env'; // Assuming you are using environment variables

const API_URL = REACT_NATIVE_API_URL;

export interface Animal {
  id: string;
  name: string;
  species: string;
  age?: number;
  shelter?: string; 
}

export interface AdoptionRequest {
  id: string;
  adopterName: string;
  animalName: string;
  status: string;
  applicationDate: string;
}

export interface AdoptionHistory {
  id: string;
  pet: {
    name: string;
    species: string;
  };
  customer: {
    name: string;
    email: string;
  };
  shelter: {
    name: string;
  };
  status: string;
  applicationDate: string;
  adoptionFee?: number;
}

// Fetch all animals
export const getAnimals = async (): Promise<Animal[]> => {
  try {
    const response = await axios.get(`${API_URL}/animals`);
    return response.data; // assuming response.data is an array of animals
  } catch (error) {
    console.error('Error fetching animals:', error);
    throw new Error('Error fetching animals');
  }
};

// Fetch pending adoption requests
export const getAdoptionRequests = async (): Promise<AdoptionRequest[]> => {
  try {
    const response = await axios.get(`${API_URL}/adoptions/requests`);
    return response.data; // assuming response.data is an array of adoption requests
  } catch (error) {
    console.error('Error fetching adoption requests:', error);
    throw new Error('Error fetching adoption requests');
  }
};

// Fetch adoption history
export const getAdoptionHistory = async (): Promise<AdoptionHistory[]> => {
  try {
    const response = await axios.get(`${API_URL}/adoptions/history`);
    return response.data; // assuming response.data is an array of adoption history
  } catch (error) {
    console.error('Error fetching adoption history:', error);
    throw new Error('Error fetching adoption history');
  }
};

// Register new animal (POST request)
export const registerNewAnimal = async (animal: Omit<Animal, 'id'>): Promise<Animal> => {
  try {
    const response = await axios.post(`${API_URL}/animals`, animal);
    return response.data; 
  } catch (error) {
    console.error('Error registering animal:', error);
    throw new Error('Error registering animal');
  }
};
