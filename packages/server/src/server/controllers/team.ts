import TeamModel from '../models/team.js';
import * as MemberController from './member.js';
import { TTeam } from '../models/team.js';

export const getAll = () => TeamModel.findAll();

export const get = (id: number) => TeamModel.findOne({ where: { id } });

export const add = (
  members: [ number, number ]
) => new Promise<TeamModel>(async (res, rej) => {
  const membersModel = await Promise.all(members.map(e => MemberController.get(e)));

  // Check if no member in the database
  const noMemberID = membersModel.findIndex((e) => !e);
  if (noMemberID >= 0) return rej(`No such member '${members[noMemberID]}'`);

  // Check if already has a team
  const hasTeamID = membersModel.findIndex((e) => !isNaN(parseInt(`${e!.teamID}`)));
  if (hasTeamID >= 0) return rej(`'${members[hasTeamID]}' already has a team`);

  const team = await TeamModel.create({ members });
  await Promise.all(membersModel.map((e) => {
    e!.teamID = team.id;
    return e!.save();
  }));

  res(team);
});

/**
 * NOTE: Add/remove members should use `addMember()` and `removeMember()`
 */
export const edit = (
  id: number,
  props: Partial<TTeam>,
) => new Promise<TeamModel | null>(async (res, rej) => {
  const result = await get(id);
  if (!result) return res(null);

  for (const key in props) {
    // @ts-ignore
    result[key] = props[key];
  }

  await result.save();
  res(result);
});

export const addMember = (
  id: number,
  member: number,
) => new Promise<TeamModel | null>(async (res, rej) => {
  const team = await get(id);
  if (!team) return res(null);

  const _member = await MemberController.get(member);
  if (!_member) return rej(`No such member '${member}'`);

  if (team.members.length >= 2) return rej('Team already full');
  if (typeof _member.teamID === 'number') {
    if (_member.teamID === team.id) return rej(`'${member}' already in the team`);
    else return rej(`'${member}' already has a team`);
  }

  team.members.push(member);
  _member.teamID = team.id;

  await Promise.all([
    team.save(),
    _member.save()
  ]);
  res(team);
});

export const removeMember = (
  id: number,
  member: number,
) => new Promise<TeamModel | null>(async (res, rej) => {
  const team = await get(id);
  if (!team) return res(null);

  const _member = await MemberController.get(member);
  if (!_member) return rej(`No such member '${member}'`);

  if (team.members.length <= 0) return rej('No members in the team');
  if (typeof _member.teamID !== 'number') return rej(`'${member}' does not belonging to any team`);
  if (_member.teamID !== team.id) return rej(`'${member}' not in the team`);

  team.members = team.members.filter((e) => e !== member);
  _member.teamID = undefined;

  await Promise.all([
    team.save(),
    _member.save()
  ]);
  res(team);
});

export const remove = (
  id: number
) => new Promise<TeamModel | null>(async (res, rej) => {
  const result = await get(id);
  if (!result) return res(null);

  await Promise.all(result.members.map((member) => {
    return MemberController.edit(member, { teamID: undefined });
  }));
  await result.destroy();
  res(result);
});
