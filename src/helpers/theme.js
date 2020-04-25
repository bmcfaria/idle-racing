export const zIndex = {
  headerBar: 100,
  modalBackground: 10,
};

export const CARD_WIDTH = 304;
export const CARD_MARGIN = 28;

export const widthByCardsNumber = number =>
  `${CARD_WIDTH * number + CARD_MARGIN * (number + 1)}px`;

export const cardsContainerWidthPaddingStyles = `
  width: ${widthByCardsNumber(1)};
  padding-left: ${CARD_MARGIN}px;

  @media screen and (min-width: ${widthByCardsNumber(2)}) {
    width: ${widthByCardsNumber(2)};
  }

  @media screen and (min-width: ${widthByCardsNumber(3)}) {
    width: ${widthByCardsNumber(3)};
  }
`;

export default {
  zIndex,
};
