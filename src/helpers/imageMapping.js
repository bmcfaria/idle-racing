import kart from '../assets/cars/kart.png';
import buggy from '../assets/cars/buggy.png';
import hatchback from '../assets/cars/sedan.png';
import coupe from '../assets/cars/sports_race.png';
import sedan from '../assets/cars/rounded_red.png';
import station from '../assets/cars/station.png';
import suv from '../assets/cars/suv.png';
import showoff from '../assets/cars/sports_convertible.png';

export const carImages = {
  'bfd0a683-708e-4055-8914-6fe4521b140a': kart,

  'b69a0ab5-5583-408c-9534-058a1b12fcb1': buggy,
  '6776d914-e538-4d47-bfe1-496d036b9b2f': hatchback,
  '3aaa1fcb-2763-48cf-bd90-c46ada09774f': coupe,
  '8de89ed7-83e8-472c-a33f-bf8efc900eaf': sedan,
  'b6e9af84-a636-449c-ae0e-b32b7be0b6f8': station,
  'ae7f795c-ea0e-4ea8-9d8d-b6da011235cb': suv,
  '0f33d97f-3d4a-4999-bd1d-5eddf16ee8e8': showoff,
};

export const trackImages = {
  'c92fb1c7-2902-426c-b479-90d29c933e12':
    'https://images.unsplash.com/photo-1578401449027-acdcfd8137e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=310',
  '54d3522d-22c2-4c95-b9d1-68c7d6853b90':
    'https://images.unsplash.com/photo-1553618737-1785e21374f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=310',
  '8ecb7e5d-e6bb-464f-89b9-9839e58bc7a1':
    'https://images.unsplash.com/photo-1584635790312-8ce625d7f53d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=310',
  'b300263e-a7f5-4c24-a7f9-6bcd6e8e624f':
    'https://images.unsplash.com/photo-1527757780101-05985993b2e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=310',

  'cd1e3e65-9e95-44d5-bbeb-75b910648594':
    'https://images.unsplash.com/flagged/photo-1550755832-1dd26fd6bb0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=310',
  '9d624db2-e0b8-441f-a6a7-5ec0b6b8287d':
    'https://images.unsplash.com/photo-1513526595084-81bab56e821f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=310',
  'fedebe4a-6eab-4cfe-aa27-bd6afe3f19c5':
    'https://images.unsplash.com/photo-1559406041-c7d2b2e98690?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=310',
};

export const imageMapping = {
  ...carImages,
  ...trackImages,
};

export const getImage = item => imageMapping[item.dealerCar || item.id];
