import axios from 'axios';

export default async function post(postApiUrl: string, data: { [key: string]: any }) {
  try {
    const postResponse = await axios.post(postApiUrl, data);
    return postResponse;
  } catch (error) {
    console.error('Unable to post values. Error has occured');
    console.error(error);
    return null;
  }
}
