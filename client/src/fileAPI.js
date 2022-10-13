import apiClient from './apiCient';

const uploadFile = async (file) => {
  try {
    const { data } = await apiClient.post('/upload', file);
    return data;
  }
  catch(e) {
    console.log(e);
  }
}

export default uploadFile; 