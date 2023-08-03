import api from '../axios/api';

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

const addPost = async (postData: UpdateData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await api.post('/api/post', postData.formData, config);
};

const updatePost = async (postData: UpdateData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await api.put(
    `/api/post/${postData.updateId}`,
    postData.formData,
    config
  );
};

const getPost = async (id: string) => {
  const response = await api.get(`/api/post/${id}`);
  return response.data;
};

export { addPost, updatePost, getPost };
