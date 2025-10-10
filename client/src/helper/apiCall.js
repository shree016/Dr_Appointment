import axios from "axios";

// ✅ Always use full domain (ensure HTTPS + /api in .env)
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

// ✅ Automatically attach token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Generic fetch helper
const fetchData = async (url, method = "get", body = null, headers = {}) => {
  try {
    const config = {
      url,
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      data: body,
      withCredentials: false, // ❌ set to false unless backend uses cookies
    };

    const { data } = await axios(config);
    return data;
  } catch (err) {
    console.error("❌ API call error:", err.response?.data || err.message);
    throw err;
  }
};

export default fetchData;
