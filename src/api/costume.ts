import axios from 'axios';
import { Costume, User } from '@/types';

export const chooseCostume = async (): Promise<Costume | undefined> => {
    const response = await axios.get('https://4oq1s9baoa.execute-api.us-east-1.amazonaws.com/costume');
    if (response.status === 200) {
        return response.data;
    }
    console.error('Error on choosing costume');
}

export const createCostume = async (user: User, title: string): Promise<Costume | undefined> => {
  const costume: Costume = {
      title,
      userId: user.id,
      userName: user.name,
  }
    const response =
        await axios.post('https://4oq1s9baoa.execute-api.us-east-1.amazonaws.com/costume', costume);
  if (response.status === 201) {
      return costume;
  }
  console.error('Error while creating costume');
}


export const getAllCostumes = async (): Promise<Costume[] | undefined> => {
  const response = await axios.get('https://4oq1s9baoa.execute-api.us-east-1.amazonaws.com/costumeList');
  if (response.status === 200) {
    return response.data;
  }
  console.error('Error on choosing costume');
}

// TODO #costume
export const getUserCostumes = async () => {}
