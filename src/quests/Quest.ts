import uuid from 'uuid';

export default interface Quest {
  id: string;
  title: string;
  notes: string;
  done: boolean;
  collapsed: boolean;
  sortIndex: number;
}

export function createQuest(title: string, notes: string, sortIndex: number): Quest {
  return {
    id: uuid.v4(),
    title,
    notes,
    done: false,
    collapsed: false,
    sortIndex,
  };
}