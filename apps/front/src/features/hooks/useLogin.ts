import { useMutation } from "react-query";
import axios from "axios";

interface LoginData {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
  };
}

const login = async (loginData: LoginData): Promise<LoginResponse> => {
  const response = await axios.post("/login", loginData);
  return response.data;
};

export const useLogin = () => {
  return useMutation(login);
};
