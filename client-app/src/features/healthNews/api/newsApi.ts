import { Article } from "../types";
import api from '../../../lib/axios'; 



export async function fetchCombinedNews(limit = 25): Promise<Article[]> {
const { data } = await api.get<Article[]>("/news/combined", { params: { limit } });
return data; 
}