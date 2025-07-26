import TeamModel from '../models/team.js';

export const getAll = () => TeamModel.findAll();
