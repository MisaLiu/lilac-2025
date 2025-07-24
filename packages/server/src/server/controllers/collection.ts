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
