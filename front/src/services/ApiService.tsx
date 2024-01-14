// src/services/ApiService.tsx
import axios, { AxiosError } from 'axios';
import { Article } from '../services/types/types';
import { BASE_URL } from '../utils/consts';

interface ApiResponse {
  message?: string;
  error?: string;
}

interface LoginResponse {
  token?: string;
  error?: string;
}

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  try {
    const response = await axios.post<ApiResponse>(`${BASE_URL}/user/create`, {
      name,
      email,
      password,
    });
    // Assuming the response structure includes a 'user' property
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const response = await axios.post<LoginResponse>(`${BASE_URL}/user/login`, {
      email,
      password,
    });
    // Assuming the response structure includes a 'user' property
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    throw error;
  }
}

export async function getAllArticles(): Promise<Article[]> {
  try {
    const response = await axios.get<Article[]>(`${BASE_URL}/article`);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    throw error;
  }
}

export async function deleteArticle(articleId: string): Promise<ApiResponse> {
  try {
    const response = await axios.delete<ApiResponse>(
      `${BASE_URL}/article/${articleId}`
    );
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    throw error;
  }
}

const handleApiError = (error: AxiosError) => {
  if (error.response) {
    console.error('Response data:', error.response.data);
    console.error('Response status:', error.response.status);
    console.error('Response headers:', error.response.headers);
  } else if (error.request) {
    console.error('Request data:', error.request);
  } else {
    console.error('Error message:', error.message);
  }
};
