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
  'c92fb1c7-2902-426c-b479-90d29c933e12': Track1,
  // Free race no ups
  '54d3522d-22c2-4c95-b9d1-68c7d6853b90': Track2,
  // Free special
  '8ecb7e5d-e6bb-464f-89b9-9839e58bc7a1': Track3,
  // Free special no ups
  'b300263e-a7f5-4c24-a7f9-6bcd6e8e624f': Track4,

  // City basic
  'cd1e3e65-9e95-44d5-bbeb-75b910648594': Track5,
  // Small cars
  '2d7dc095-5b32-42bf-bde7-4b2673879e28': Track6,
  // Family friendly
  '7a24bdbd-2397-459d-b9e8-2697ee217084': Track7,
  // City special
  '9d624db2-e0b8-441f-a6a7-5ec0b6b8287d': Track8,
  // City special no ups
  'fedebe4a-6eab-4cfe-aa27-bd6afe3f19c5': Track9,

  // Offroad casual
  '9b67ac96-1094-4362-af3f-5855dae643a2': Offroad1,
  // Hill madness
  '19065c6a-d554-45c5-bee6-2d14ed1169a3': Offroad2,
  // Muddy fest
  'c57480e9-2537-412b-a625-3146965b8a91': Offroad3,
  // Rural beauty
  'e700533e-6a7b-42d2-a173-a2c2f3a532f8': Offroad4,

  // Casual circuit
  'e2e204ce-e5c5-4991-9d43-1669db9cde81': Track10,
  // Track basic
  'dedff876-77ac-4e95-9255-4b212dab8d28': Track11,
  // Track acceleration
  'fb1f9b60-926c-4b01-a6d6-543c0a305d05': Track12,
  // Track speed
  'db660a8f-2ece-4b07-a2eb-44201a552142': Track13,
  // Track heavy
  '7829b35a-e75d-453c-9b1e-aec7555377cc': Track14,

  // F1 party
  '44122eb8-de92-4dc6-abc9-65ae7b56445d': Track3,
  // F1 serious
  'dc1f9ad6-94ad-46fb-9672-43cec931888e': F1Serious,
  // 24h
  '91e8c4e3-bdcf-4634-909f-7f910aade85f': LeMans,
  // Nascar
  '6101ac8d-d31a-422e-81ca-d3b331af9367': Nascar,
};

export default item => trackImages[item.id];
