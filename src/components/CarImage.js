import styled from '@emotion/styled';
import React from 'react';
import getImageCar from '../helpers/imageMappingCars';

const Image = styled.img`
  object-fit: contain;
  ${({ w = '100%' }) => `width:  ${w}`};
  ${({ h = '100%' }) => `height:  ${h}`};
  ${({ borderRadius = '16px' }) => `border-radius:  ${borderRadius}`};
  ${({ bg }) => (bg ? `background-color:  ${bg}` : '')};
  ${({ border }) => (border ? `border:  ${border}` : '')};
  ${({ maxW }) => (maxW ? `max-width:  ${maxW}` : '')};
  ${({ position }) => (position ? `position:  ${position}` : '')};
  ${({ top }) => (top ? `top:  ${top}` : '')};
  ${({ right }) => (right ? `right:  ${right}` : '')};
  ${({ bottom }) => (bottom ? `bottom:  ${bottom}` : '')};
  ${({ left }) => (left ? `left:  ${left}` : '')};
  ${({ margin }) => (margin ? `margin:  ${margin}` : '')};
`;

const CarImage = ({ car, ...props }) => {
  return <Image alt="car" src={getImageCar(car)} {...props} />;
};

export default CarImage;
