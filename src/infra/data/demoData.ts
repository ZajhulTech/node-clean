import { Item } from '../../models/domain/iItem';

let demoData: Item[] = [
{ id: 1, name: "item prueba 1"  },
{ id: 2, name: "item prueba 2"  },
{ id: 3, name: "item prueba 3"  }

];

export const getAll = (): Item[] => demoData;

export const addItem = (item: Omit<Item, 'id'>): Item => {
  const newItem: Item = { id: demoData.length + 1, ...item };
  demoData.push(newItem);
  return newItem;
};
