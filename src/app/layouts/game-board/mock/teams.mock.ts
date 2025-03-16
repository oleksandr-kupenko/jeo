import {Team} from '../interfaces/game-board.interfaces';
import {generateId} from '../../../../utils';

export const teamsMock: Team[] = [
  {
    name: 'Team 1',
    id: generateId(),
    points: 0
  },
  {
    name: 'Team 2',
    id: generateId(),
    points: 0
  },
  {
    name: 'Team 3',
    id: generateId(),
    points: 0
  }
];
