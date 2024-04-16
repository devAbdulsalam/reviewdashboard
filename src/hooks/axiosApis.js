import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
export const fetchDashboard = async (user) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token || user?.accessToken}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/general`, config);
    return data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
export const fetchSite = async (user) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token || user?.accessToken}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/general/site`, config);
    return data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
export const fetchAdmins = async (user) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token || user?.accessToken}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/admins`, config);
    return data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
export const fetchUser = async (prop) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${prop?.token}`,
      },
    };
    const { data } = await axios.get(
      `${apiUrl}/admins/users/${prop.id}`,
      config,
    );
    return data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
export const fetchUsers = async (prop) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${prop?.token || prop?.accessToken}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/admins/users`, config);
    return data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
export const fetchBusinesses = async (user) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/business`, config);
    return data;
  } catch (error) {
    return error;
  }
};
export const fetchBusiness = async (prop) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${prop?.token}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/business/${prop.id}`, config);
    return data;
  } catch (error) {
    return error;
  }
};
export const fetchListings = async (user) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/listings/all`, config);
    return data;
  } catch (error) {
    return error;
  }
};
export const fetchListing = async (prop) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${prop?.token}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/listings/${prop.id}`, config);
    return data;
  } catch (error) {
    return error;
  }
};
export const fetchAdverts = async (user) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/adverts`, config);
    return data;
  } catch (error) {
    return error;
  }
};
export const fetchAdvert = async (prop) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${prop?.token}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/adverts/${prop.id}`, config);
    return data;
  } catch (error) {
    return error;
  }
};
export const fetchPricings = async (user) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/prices`, config);
    return data;
  } catch (error) {
    return error;
  }
};
export const fetchPrice = async (prop) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${prop?.token}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/prices/${prop.id}`, config);
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchAmenities = async (user) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/amenities`, config);
    return data;
  } catch (error) {
    return error;
  }
};
export const fetchFaqs = async (user) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.get(`${apiUrl}/faqs`, config);
    return data;
  } catch (error) {
    return error;
  }
};
export const fetchTransactions = async (prop) => {
  const { page, limit, token } = prop;
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${apiUrl}/admins/transactions?page=${page}&limit=${limit}`,
      config,
    );
    return data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
export const fetchTransaction = async (prop) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${prop?.token}`,
      },
    };
    const { data } = await axios.get(
      `${apiUrl}/transactions/${prop.id}`,
      config,
    );
    return data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
