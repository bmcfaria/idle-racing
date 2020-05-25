import { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

export const useOpenClose = defaultValue => {
  const [open, setOpen] = useState(!!defaultValue);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return [open, onOpen, onClose];
};

export const useCurrentPageName = () => {
  const matchGarage = useRouteMatch('/garage');
  const matchDealer = useRouteMatch('/dealer');
  const matchRace = useRouteMatch('/race');
  const matchSettings = useRouteMatch('/settings');

  let selectedPage;
  selectedPage = matchGarage ? 'Garage' : selectedPage;
  selectedPage = matchDealer ? 'Dealer' : selectedPage;
  selectedPage = matchRace ? 'Race' : selectedPage;
  selectedPage = matchSettings ? 'Settings' : selectedPage;

  return selectedPage;
};
