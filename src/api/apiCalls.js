import { axios } from "./axiosInstance";

export const login = async (username, password) => {
  return axios
    .post("/auth/login", {
      username,
      password,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getCalls = async (offset, number, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get(`/calls?offset=${offset}&limit=${number}`, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      // console.log(err);
      alert("something went wrong");
      return err;
    });
};

export const getCall = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .get(`/calls/${id}`, config)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addNote = async (id, token, content) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const body = {
    content: content,
  };
  console.log("body:", body);

  return axios
    .post(
      `/calls/${id}/note`,
      {
        content: content,
      },
      config
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      alert("something went wrong");
    });
};

export const archive = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(config.headers);
  console.log(id);
  return axios
    .put(`/calls/${id}/archive`, {}, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      // alert("something went wrong");
      console.log(err);
    });
};
