import CollectionModel from '../models/collection.js';

export const getAll = () => CollectionModel.findAll();

export const get = (name: string) => CollectionModel.findOne({ where: { name } });

export const add = (
  name: string,
  description: string,
  type: 'positive' | 'negative' | 'neutral' = 'neutral'
) => CollectionModel.create({
  name, type, description
});

export const edit = (
  name: string,
  description: string,
  type: 'positive' | 'negative' | 'neutral' = 'neutral'
) => new Promise<CollectionModel | null>(async (res) => {
  const result = await get(name);
  if (!result) return res(null);

  result.description = description;
  result.type = type;

  await result.save();
  res(result);
});

export const remove = (
  name: string
) => new Promise<CollectionModel | null>(async (res) => {
  const result = await get(name);
  if (!result) return res(null);

  await result.destroy();
  res(result);
});
