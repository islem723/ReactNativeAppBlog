// src/services/ApiService.tsx
import axios, { AxiosError } from 'axios';
import {
  Article,
  ApiResponse,
  LoginResponse,
  UserBookmark,
} from '../services/types/types';
import { BASE_URL } from '../utils/consts';

//Register
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
    return { error: `${error}` };
  }
}
//LOGIN
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
    return { error: `${error}` };
  }
}
//LIST ARTICLES
export async function getAllArticles(): Promise<Article[]> {
  try {
    const response = await axios.get<Article[]>(`${BASE_URL}/article`);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    return [];
  }
}
//DELETE ARTICLE
export async function deleteArticle(articleId: string): Promise<ApiResponse> {
  try {
    const response = await axios.delete<ApiResponse>(
      `${BASE_URL}/article/${articleId}`
    );
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    return { error: `${error}` };
  }
}
//ADD ARTICLE
export async function Addarticle(
  content: String,
  title: String,
  topic: String,
  tags: String,
  image: String,
  owner: String
) {
  try {
    const response = await axios.post<ApiResponse>(`${BASE_URL}/article`, {
      content,
      title,
      topic,
      tags,
      image,
      owner,
    });

    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    return { error: `${error}` };
  }
}
//UPDATE ARTICLE
export async function updateArticle(
  articleId: string,
  articleData: Partial<Article>
): Promise<ApiResponse> {
  try {
    const response = await axios.put<ApiResponse>(
      `${BASE_URL}/article/${articleId}`,
      articleData
    );
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    return { error: `${error}` };
  }
}
// CREATE BOOKMARK
export async function createBookmark(
  userId: string,
  articleId: string
): Promise<ApiResponse> {
  try {
    const response = await axios.post<ApiResponse>(`${BASE_URL}/bookmark`, {
      userId,
      articleId,
    });
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    return { error: `${error}` };
  }
}

// GET ALL FAVORITE ARTICLES
export async function getAllFavoriteArticles(
  userId: string
): Promise<UserBookmark[]> {
  try {
    const response = await axios.get<UserBookmark[]>(
      `${BASE_URL}/bookmark?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    return [];
  }
}

// DELETE BOOKMARK
export async function deleteBookmark(bookmarkId: string): Promise<ApiResponse> {
  try {
    const response = await axios.delete<ApiResponse>(
      `${BASE_URL}/bookmark/${bookmarkId}`
    );
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    return { error: `${error}` };
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
