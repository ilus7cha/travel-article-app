import axios from "axios";
import { Article } from "../types/article";

const BASE_URL = "https://api-mock-strapi.onrender.com/api";

interface StrapiArticleAttributes {
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

interface StrapiArticle {
  id: string;
  attributes: StrapiArticleAttributes;
}

const fetchArticles = async (): Promise<Article[]> => {
  const response = await axios.get(`${BASE_URL}/articles?populate=*`);
  return response.data.data.map((item: StrapiArticle) => ({
    id: item.id.toString(),
    title: item.attributes.title,
    content: item.attributes.content,
    author: item.attributes.author || "Unknown",
    createdAt: item.attributes.createdAt,
  }));
};

const fetchArticleById = async (id: string): Promise<Article> => {
  const response = await axios.get(`${BASE_URL}/articles/${id}?populate=*`);
  const item = response.data.data;
  return {
    id: item.id.toString(),
    title: item.attributes.title,
    content: item.attributes.content,
    author: item.attributes.author || "Unknown",
    createdAt: item.attributes.createdAt,
  };
};

const createArticle = async (data: {
  title: string;
  content: string;
  author: string;
}) => {
  return axios.post(`${BASE_URL}/articles`, { data });
};

const updateArticle = async (id: string, data: {
  title: string;
  content: string;
  author: string;
}) => {
  return axios.put(`${BASE_URL}/articles/${id}`, { data });
};

const deleteArticle = async (id: string) => {
  return axios.delete(`${BASE_URL}/articles/${id}`);
};

export {
  fetchArticles,
  fetchArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};