import TeamModel from '../models/team.js';
import * as MemberController from './member.js';

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
