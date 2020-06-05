import basicCarBlue from '../assets/cars/basic_car.png';

import cityCompactBlue from '../assets/cars/city_compact.png';
// import cityCompactPink from '../assets/cars/city_compact_pink.png';
// import cityCompactYellow from '../assets/cars/city_compact_yellow.png';
import cityHatchbackBlue from '../assets/cars/city_hatchback.png';
import cityCoupeBlue from '../assets/cars/city_coupe.png';
import citySedanBlue from '../assets/cars/city_sedan.png';
import citySwBlue from '../assets/cars/city_sw.png';
import citySuvBlue from '../assets/cars/city_suv.png';
// import cityShowoffBlue from '../assets/cars/city_showoff.png';
import cityShowoffRed from '../assets/cars/city_showoff_red.png';
import evCityboy from '../assets/cars/ev_cityboy.png';

import offroadDirtBlue from '../assets/cars/offroad_dirt.png';
import offroadMudBlue from '../assets/cars/offroad_mud.png';
import offroadKingBlue from '../assets/cars/offroad_king.png';
import evCleandirt from '../assets/cars/ev_cleandirt.png';

import superRoundBlue from '../assets/cars/super_round.png';
// import superSlimBlue from '../assets/cars/super_slim.png';
import superSlimRed from '../assets/cars/super_slim_red.png';
import superMuscleBlue from '../assets/cars/super_muscle.png';
import evSupercar from '../assets/cars/ev_supercar.png';

import nascarSpeedBlue from '../assets/cars/nascar_speed.png';
import racerQuickieBlue from '../assets/cars/racer_quickie.png';
import racerLeMansBlue from '../assets/cars/racer_le_mans.png';

import f1EntryBlue from '../assets/cars/f1_entry.png';
import f1PowerBlue from '../assets/cars/f1_power.png';
import f1SupersonicBlue from '../assets/cars/f1_supersonic.png';
import EvOpenwheel from '../assets/cars/ev_openwheel.png';

// import vanHippieBlue from '../assets/cars/van_hippie.png';
import vanHippiePink from '../assets/cars/van_hippie_pink.png';
import truckRoadBlue from '../assets/cars/truck_road.png';
import truckSpeedBlue from '../assets/cars/truck_speed.png';
import pickupFarmerBlue from '../assets/cars/pickup_farmer.png';
// import pickupMonsterBlue from '../assets/cars/pickup_monster.png';
import pickupMonsterRed from '../assets/cars/pickup_monster_red.png';

export const carImages = {
  'bfd0a683-708e-4055-8914-6fe4521b140a': basicCarBlue,

  'b69a0ab5-5583-408c-9534-058a1b12fcb1': cityCompactBlue,
  '6776d914-e538-4d47-bfe1-496d036b9b2f': cityHatchbackBlue,
  '3aaa1fcb-2763-48cf-bd90-c46ada09774f': cityCoupeBlue,
  '8de89ed7-83e8-472c-a33f-bf8efc900eaf': citySedanBlue,
  'b6e9af84-a636-449c-ae0e-b32b7be0b6f8': citySwBlue,
  'ae7f795c-ea0e-4ea8-9d8d-b6da011235cb': citySuvBlue,
  '0f33d97f-3d4a-4999-bd1d-5eddf16ee8e8': cityShowoffRed,
  'dc3c7bc6-956a-49b2-a2f3-0a592ce8dfc2': evCityboy,

  '89de376a-9648-458b-a259-952b87b622dc': offroadDirtBlue,
  'c395ddd3-4d03-4e66-904c-895683e93416': offroadMudBlue,
  'c3d09522-9842-4593-ac12-1a46ca4268a6': offroadKingBlue,
  '4f387d8b-3cf0-4983-b349-74c8210ca1ac': evCleandirt,

  'cc7b7f79-a0e2-45de-9924-26d49588be83': superRoundBlue,
  '2e1ad8b3-82de-48dd-8c45-e2537c162fa0': superSlimRed,
  'd22301f8-fe6a-4e61-822c-43fa053c6a6b': superMuscleBlue,
  '237d635f-68b3-479a-9643-1848ea7b3485': evSupercar,

  '2e926f09-bd0b-40d4-bba1-8cc5044ff4a7': nascarSpeedBlue,
  '3ea79070-3bfb-4ab3-b29b-f4952447cfba': racerQuickieBlue,
  'c6aae711-49d9-418c-91c4-f1c57f835cb8': racerLeMansBlue,

  '28388317-5514-49ec-8d5b-b5029182e2ba': f1EntryBlue,
  '333242d7-bae7-4d54-980b-8b8c4a9decbc': f1PowerBlue,
  'a527901d-0c54-4a4c-bc28-951ecdb13fcf': f1SupersonicBlue,
  '624a4e29-c0d5-4d63-a575-59ffaa925012': EvOpenwheel,

  '61a059e3-b499-4d3e-b1f9-98e7f0a8eefb': vanHippiePink,
  '27a29591-f0a8-4e82-a071-63c6275b1141': truckRoadBlue,
  'c8065d5e-f5da-4fcf-ac86-86ed08ec1527': truckSpeedBlue,
  '7da2553b-8562-475e-bd0e-6a777266ce1e': pickupFarmerBlue,
  '88e4396b-d676-459c-be43-da7f56debc04': pickupMonsterRed,
};

export default item => carImages[item.dealerCar || item.id];
