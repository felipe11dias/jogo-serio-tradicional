import axios from "axios";
import { BASE_URL } from "../../util/constants";

export const api = axios.create({
  baseURL: BASE_URL
})