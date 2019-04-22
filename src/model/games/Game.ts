import uuid from 'uuid';

export default interface Game {
  id: string;
  name: string;
}

export function createGame(name: string): Game {
  return {
    id: uuid.v4(),
    name,
  };
}
