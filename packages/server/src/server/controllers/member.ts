import MemberModel from '../models/member.js';
import { InferAttributes } from 'sequelize';

export const getAll = () => MemberModel.findAll();

export const get = (qq: number) => MemberModel.findOne({ where: { qq } });

export const add = (qq: number, name: string) => MemberModel.create({ name, qq });

export const edit = (
  qq: number,
  props: Partial<InferAttributes<MemberModel, { omit: 'qq' }>>,
) => new Promise<MemberModel | null>(async (res) => {
  const result = await get(qq);
  if (!result) return res(null);

  for (const key in props) {
    // @ts-ignore
    result[key] = props[key];
  }

  await result.save();
  res(result);
});

export const remove = (
  qq: number
) => new Promise<MemberModel | null>(async (res) => {
  const result = await get(qq);
  if (!result) return res(null);

  await result.destroy();
  res(result);
});
