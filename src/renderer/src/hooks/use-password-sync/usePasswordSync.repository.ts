import axios from 'axios';

const sync = async (
  endpoint: string,
  handshake: { input: string; output: string }
) => {
  const { data } = await axios.post(`http://${endpoint}:1337/sync`, handshake);
  return data;
};

export const UsePasswordSyncRepository = {
  sync,
};
