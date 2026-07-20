import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

/* AUTH */
export const googleLogin = async (
  userData
) => {
  const res = await API.post(
    "/auth/google",
    userData
  );

  return res.data;
};

/* HABITS */
export const getHabits = async () => {
  const res = await API.get("/habits");
  return res.data;
};

export const addHabit = async (
  title,
  icon
) => {
  const res = await API.post(
    "/habits",
    {
      title,
      icon,
    }
  );

  return res.data;
};

/* NEW */
export const updateHabit = async (
  id,
  title,
  icon
) => {
  const res = await API.patch(
    `/habits/${id}`,
    {
      title,
      icon,
    }
  );

  return res.data;
};

export const deleteHabit = async (
  id
) => {
  const res = await API.delete(
    `/habits/${id}`
  );

  return res.data;
};

export const toggleHabit = async (
  id,
  date
) => {
  const res = await API.patch(
    `/habits/${id}/toggle`,
    { date }
  );

  return res.data;
};

export const getHabitStats = async (
  id
) => {
  const res = await API.get(
    `/habits/${id}/stats`
  );

  return res.data;
};

export const getHabitCalendar = async (
  id,
  month,
  year
) => {
  const res = await API.get(
    `/habits/${id}/calendar?month=${month}&year=${year}`
  );

  return res.data;
};