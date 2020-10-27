import { ReactComponent as Track1 } from '../assets/tracks/track1.svg';
import { ReactComponent as Track2 } from '../assets/tracks/track2.svg';
import { ReactComponent as Track3 } from '../assets/tracks/track3.svg';
import { ReactComponent as Track4 } from '../assets/tracks/track4.svg';
import { ReactComponent as Track5 } from '../assets/tracks/track5.svg';
import { ReactComponent as Track6 } from '../assets/tracks/track6.svg';
import { ReactComponent as Track7 } from '../assets/tracks/track7.svg';
import { ReactComponent as Track8 } from '../assets/tracks/track8.svg';
import { ReactComponent as Track9 } from '../assets/tracks/track9.svg';
import { ReactComponent as Track10 } from '../assets/tracks/track10.svg';
import { ReactComponent as Track11 } from '../assets/tracks/track11.svg';
import { ReactComponent as Track12 } from '../assets/tracks/track12.svg';
import { ReactComponent as Track13 } from '../assets/tracks/track13.svg';
import { ReactComponent as Track14 } from '../assets/tracks/track14.svg';

import { ReactComponent as Countryside1 } from '../assets/tracks/countryside1.svg';
import { ReactComponent as Countryside2 } from '../assets/tracks/countryside2.svg';
import { ReactComponent as Countryside3 } from '../assets/tracks/countryside3.svg';
import { ReactComponent as Countryside4 } from '../assets/tracks/countryside4.svg';

import { ReactComponent as Desert1 } from '../assets/tracks/desert1.svg';
import { ReactComponent as Desert2 } from '../assets/tracks/desert2.svg';
import { ReactComponent as Desert3 } from '../assets/tracks/desert3.svg';
import { ReactComponent as Desert4 } from '../assets/tracks/desert4.svg';

import { ReactComponent as Uphill1 } from '../assets/tracks/uphill1.svg';
import { ReactComponent as Uphill2 } from '../assets/tracks/uphill2.svg';
import { ReactComponent as Uphill3 } from '../assets/tracks/uphill3.svg';
import { ReactComponent as Uphill4 } from '../assets/tracks/uphill4.svg';

import { ReactComponent as Offroad1 } from '../assets/tracks/offroad1.svg';
import { ReactComponent as Offroad2 } from '../assets/tracks/offroad2.svg';
import { ReactComponent as Offroad3 } from '../assets/tracks/offroad3.svg';
import { ReactComponent as Offroad4 } from '../assets/tracks/offroad4.svg';

import { ReactComponent as F1Serious } from '../assets/tracks/f1_serious.svg';
import { ReactComponent as LeMans } from '../assets/tracks/le_mans.svg';
import { ReactComponent as Nascar } from '../assets/tracks/nascar.svg';

export const trackImages = {
  track1: Track1,
  track2: Track2,
  track3: Track3,
  track4: Track4,
  track5: Track5,
  track6: Track6,
  track7: Track7,
  track8: Track8,
  track9: Track9,
  track10: Track10,
  track11: Track11,
  track12: Track12,
  track13: Track13,
  track14: Track14,

  countryside1: Countryside1,
  countryside2: Countryside2,
  countryside3: Countryside3,
  countryside4: Countryside4,

  desert1: Desert1,
  desert2: Desert2,
  desert3: Desert3,
  desert4: Desert4,

  uphill1: Uphill1,
  uphill2: Uphill2,
  uphill3: Uphill3,
  uphill4: Uphill4,

  offroad1: Offroad1,
  offroad2: Offroad2,
  offroad3: Offroad3,
  offroad4: Offroad4,

  f1_serious: F1Serious,
  le_mans: LeMans,
  nascar: Nascar,
};

const getImageTrack = item => trackImages[item.image];

export default getImageTrack;
