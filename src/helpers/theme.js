export const zIndex = {
  warningModal: 10000,
  sidebar: 6000,
  headerBar: 1000,
  winChanceTip: 100,
  modalBackground: 10,
};

export const colors = {
  red: '#FFADAD',
  orange: '#FFD6A5',
  yellow: '#FDFFB6',
  green: '#CAFFBF',
  lightBlue: '#9BF6FF',
  blue: '#A0C4FF',
  purple: '#BDB2FF',
  pink: '#FFC6FF',
  white: '#FFFFFC',
  lightGray: '#F4F4F3',
  darkGray: '#4E4E4E',
  gray: '#B7B7B7',
};

export const MAX_WIDTH_VALUE = 800;
export const MAX_WIDTH = `${MAX_WIDTH_VALUE}px`;

export const CARD_WIDTH = 304;
export const CARD_MARGIN = 28;

export const widthByCardsNumber = number =>
  `${CARD_WIDTH * number + CARD_MARGIN * (number + 1)}px`;

export const cardsContainerWidthPaddingStyles = `
  width: ${widthByCardsNumber(1)};
  padding-left: ${CARD_MARGIN}px;
  margin-right: -${CARD_MARGIN}px;

  @media screen and (min-width: ${widthByCardsNumber(2)}) {
    width: ${widthByCardsNumber(2)};
  }

  @media screen and (min-width: ${widthByCardsNumber(3)}) {
    width: ${widthByCardsNumber(3)};
  }
`;

export default {
  zIndex,
  colors,
};
