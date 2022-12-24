import axios from 'axios';

import { IPassword } from '../use-passwords';

const sync = async (
  endpoint: string,
  handshake: { input: string; output: string; passwords: IPassword[] }
) => {
  const { data } = await axios.post(`http://${endpoint}:1337/sync`, handshake);
  return data;
};

export const UsePasswordSyncRepository = {
  sync,
};
