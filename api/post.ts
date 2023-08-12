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
    `/test/post/${postData.updateId}`,
    postData.formData,
    config
  );
};

const getPost = async (id: string) => {
  const response = await api.get(`/api/post/${id}`);
  return response.data;
};

const likePost = async (postId: string) => {
  const response = await api.post(`/api/post/${postId}/like`);
  return response.data;
};

const deletePost = async (postId: string) => {
  const response = await api.delete(`/test/post/${postId}`);
  return response.data;
};

const getPostCount = async (postId: string) => {
  const response = await api.get(`/api/post/${postId}/postsCount`);
  return response.data;
};

const getPostLikeCount = async (postId: string) => {
  const response = await api.get(`/api/post/${postId}/likePostsCount`);
  return response.data;
};

const reportPost = async (postId: string) => {
  const response = await api.post(`/test/report/${postId}`);
  return response.data;
};

const getComment = async (postId: string) => {
  const response = await api.get(`/test/post/comments/${postId}`);
  return response.data;
};

const addComment = async (comment: FormData) => {
  const response = await api.post(`/test/post/comment`, comment);
  return response.data;
};

export {
  addPost,
  updatePost,
  getPost,
  likePost,
  getPostCount,
  getPostLikeCount,
  reportPost,
  getComment,
  addComment,
  deletePost,
};
