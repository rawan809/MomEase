import api from "./instance";

// posts
export const GetPosts = async ({
  pageNumber,
  pageSize,
}: {
  pageNumber: number;
  pageSize: number;
}) => {
  const response = await api.get(`/community/posts`, {
    params: { pageNumber, pageSize },
  });
  return response.data;
};

export const GetPost = async (id: number) => {
  const response = await api.get(`/community/posts/${id}`);
  return response.data;
};

export const createPost = async ({
  text,
  mediaFile,
}: {
  text?: string;
  mediaFile?: File[];
}) => {
  const formData = new FormData();

  if (text) {
    formData.append("text", text);
  }

  mediaFile?.forEach((file) => {
    formData.append("MediaFiles", file);
  });

  const response = await api.post(`/community/posts`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const editPost = async ({
  id,
  text,
  MediaIdsToDelete,
  NewMediaFiles,
}: {
  text?: string;
  NewMediaFiles?: File[];
  MediaIdsToDelete?: number[];
  id: number;
}) => {
  const formData = new FormData();

  if (text !== undefined && text !== null) {
    formData.append("Text", text);
  }

  NewMediaFiles?.forEach((file) => {
    formData.append("NewMediaFiles", file);
  });

  MediaIdsToDelete?.forEach((id) => {
    formData.append("MediaIdsToDelete", id.toString());
  });
  const response = await api.put(`/community/posts/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deletePost = async (id: number) => {
  const response = await api.delete(`/community/posts/${id}`);
  return response.data;
};

export const GetMyPosts = async () => {
  const response = await api.get(`/community/posts/my-posts`);
  return response.data;
};

// comments
export const getComments = async (postId: number) => {
  const response = await api.get(`/community/posts/${postId}/comments`);
  return response.data;
};
export const addComment = async (
  postId: number,
  { text }: { text: string },
) => {
  const response = await api.post(`/community/posts/${postId}/comments`, {
    text,
  });
  return response.data;
};
export const editComment = async (
  postId: number,
  id: number,
  { text }: { text: string },
) => {
  const response = await api.put(`/community/posts/${postId}/comments/${id}`, {
    text,
  });
  return response.data;
};
export const deleteComment = async (postId: number, id: number) => {
  const response = await api.delete(
    `/community/posts/${postId}/comments/${id}`,
  );
  return response.data;
};

// report
export const reportPost = async (postId: number, reason: string) => {
  const response = await api.post(`/community/posts/${postId}/reports`, {
    reason,
  });
  return response.data;
};

// reactions
export const addReact = async (postId: number, reactionType: string) => {
  const response = await api.post(`/community/posts/${postId}/reactions`, {
    reactionType,
  });
  return response.data;
};

export const updateReact = async (postId: number, reactionType: string) => {
  const response = await api.put(`/community/posts/${postId}/reactions`, {
    reactionType,
  });
  return response.data;
};

export const deleteReact = async (postId: number) => {
  const response = await api.delete(`/community/posts/${postId}/reactions`);
  return response.data;
};

export const getReacts = async (postId: number) => {
  const response = await api.get(`/community/posts/${postId}/reactions`);
  return response.data;
};

// saved
export const savePost = async (postId: number) => {
  const response = await api.post(`/community/posts/${postId}/save`);
  return response.data;
};
export const deleteSavedpost = async (postId: number) => {
  const response = await api.delete(`/community/posts/${postId}/save`);
  return response.data;
};
export const getSavedPosts = async () => {
  const response = await api.get(`/community/saved-posts`);
  return response.data;
};
