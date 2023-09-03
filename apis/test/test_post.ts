import api from '../../axios/api';

interface PostData {
  images: string[];
  content: string;
  musicTitle: string;
  musicUrl: string;
  tag: string;
  latitude: string;
  longitude: string;
  placeName: string;
}

interface UpdateData {
  updateId: string;
  formData: FormData;
}

const addPostTest = async (postData: UpdateData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await api.post('/test/post', postData.formData, config);
};

const updatePostTest = async (postData: UpdateData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await api.put(
    `/test/post/${postData.updateId}`,
    postData.formData,
    config
  );
};

const getPostTest = async (id: string) => {
  const response = await api.get(`/test/post/${id}`);
  return response.data;
};

const likePostTest = async (postId: string) => {
  const response = await api.post(`/test/post/${postId}/like`);
  return response.data;
};

const reportPostTest = async (postId: string) => {
  const response = await api.post(`/test/report/${postId}`);
  return response.data;
};

export {
  addPostTest,
  updatePostTest,
  getPostTest,
  likePostTest,
  reportPostTest,
};
