import { api } from "@/config/axios.config";

export const getEvents = async () => {
  try {
    const response = await api.get(`/calendars`);
    return response.data;
  } catch (error: any) {
    return error.response?.data;
  }
};
