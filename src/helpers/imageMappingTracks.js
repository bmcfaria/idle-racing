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

import { ReactComponent as Offroad1 } from '../assets/tracks/offroad1.svg';
import { ReactComponent as Offroad2 } from '../assets/tracks/offroad2.svg';
import { ReactComponent as Offroad3 } from '../assets/tracks/offroad3.svg';
import { ReactComponent as Offroad4 } from '../assets/tracks/offroad4.svg';

import { ReactComponent as F1Serious } from '../assets/tracks/f1_serious.svg';
import { ReactComponent as LeMans } from '../assets/tracks/le_mans.svg';
import { ReactComponent as Nascar } from '../assets/tracks/nascar.svg';

export const trackImages = {
  // Free race
  track1: Track1,
  // Free race no ups
  track2: Track2,
  // Free special
  track3: Track3,
  // Free special no ups
  track4: Track4,

  // City basic
  track5: Track5,
  // Small cars
  track6: Track6,
  // Family friendly
  track7: Track7,
  // City special
  track8: Track8,
  // City special no ups
  track9: Track9,

  // Offroad casual
  offroad1: Offroad1,
  // Hill madness
  offroad2: Offroad2,
  // Muddy fest
  offroad3: Offroad3,
  // Rural beauty
  offroad4: Offroad4,

  // Casual circuit
  track10: Track10,
  // Track basic
  track11: Track11,
  // Track acceleration
  track12: Track12,
  // Track speed
  track13: Track13,
  // Track heavy
  track14: Track14,

  // F1 party
  // 'track3': Track3,
  // F1 serious
  f1_serious: F1Serious,
  // 24h
  le_mans: LeMans,
  // Nascar
  nascar: Nascar,
};

export default item => trackImages[item.image];
