import axios from "axios";

const findAll = async function findAll() {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/devices`);
  return res.data;
};

export default { findAll };
