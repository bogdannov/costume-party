import axios from 'axios';
import { Costume, CreateCostumePayload, User } from '@/types';

export const chooseCostume = async (): Promise<Costume | undefined> => {
    const response = await axios.get('https://4oq1s9baoa.execute-api.us-east-1.amazonaws.com/costume');
    if (response.status === 200) {
        return response.data;
    }
    console.error('Error on choosing costume');
}

export const createCostume = async (user: User, title: string): Promise<Costume | undefined> => {
  const costume: CreateCostumePayload = {
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

export const getUserCostumes = async (userId: string) => {
  const response = await axios.get(
    `https://4oq1s9baoa.execute-api.us-east-1.amazonaws.com/userCostumes/${userId}`
  );
  if (response.status === 200) {
    return response.data;
  }
  console.error('Error on get user costumes');
}

export const deleteCostume = async (costumeId: string, userId: string): Promise<null | Error> => {
  const response = await axios.delete(
    `https://4oq1s9baoa.execute-api.us-east-1.amazonaws.com/costume/${userId}/${costumeId}`
  );
  if (response.status === 200) {
    return null;
  }
  throw Error('Error on delete costume')
}
