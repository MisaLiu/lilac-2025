import QuestionModel from '../models/question.js';
import { InferAttributes } from 'sequelize';

export const getAll = () => QuestionModel.findAll();

export const getAllByMap = (mapID: number) => QuestionModel.findAll({ where: { mapID } });

export const get = (id: number) => QuestionModel.findOne({ where: { id } });

export const add = (
  riddle: string,
  category: string,
  descriptions: string[],
  answers: string[],
  mapID?: number,
  author?: string,
) => QuestionModel.create({
  riddle, category, descriptions, answers, mapID, author,
});

export const edit = (
  id: number,
  props: Partial<InferAttributes<QuestionModel>>,
) => QuestionModel.update(props, { where: { id } });

export const remove = (
  id: number
) => QuestionModel.destroy({ where: { id } });
