import React, { useEffect } from 'react';
import { useToast } from '@chakra-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { toastsSelector } from '../state/selectors';
import { dismissToastAction } from '../state/actions';
import Toast from './Toast';

const Toasts = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const toasts = useSelector(toastsSelector);

  useEffect(() => {
    const dismissToast = id => {
      dispatch(dismissToastAction(id));
    };

    toasts.forEach(item => {
      toast({
        duration: 5000,
        position: 'top-right',
        render: ({ onClose }) => (
          <Toast
            toast={item}
            removeFromStore={dismissToast}
            onClose={onClose}
          />
        ),
      });
    });
  }, [dispatch, toast, toasts]);

  return null;
};

export default Toasts;
