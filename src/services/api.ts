import axios, { AxiosInstance } from "axios";
import { Images } from "../components/types";

const ACCES_KEY = "5I5eWCNfuzZ2TJ-M0l48OYAoe5_Ak-5XVimfs-x7hTU";

// export const instance: AxiosInstance = axios.create({
//   baseURL: "https://api.unsplash.com",
// });

// export const requestImages = async (query: string = "", page: number = 1) => {
//   const { data } = await instance.get(
//     `/search/photos?query=${query}&page=${page}&client_id=${ACCES_KEY}`
//   );
//   return data.results;
// };
interface UnsplashResponse {
  results: [Images];
  total_pages: number;
  // results: ;
  data: string;
}

export const requestImages = async (
  query: string,
  page: number
): Promise<UnsplashResponse> => {
  const { data } = await axios.get<UnsplashResponse>(
    `https://api.unsplash.com/search/photos/?client_id=${ACCES_KEY}&page=${page}&query=${query}&per_page=20`
  );
  return data;
};
