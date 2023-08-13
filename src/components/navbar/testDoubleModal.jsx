import React from 'react';
import { Button, Modal, Box, Fade, Typography } from '@mui/material';
import { useModal } from '../ModalContext';

export default function ModalComponent() {
  const { openModal, closeModal, getModalState } = useModal();

  return (
    <>
      {/* <Modal
        open={getModalState('modal1')}
        onClose={() => closeModal('modal1')}
        closeAfterTransition
      >
        <Fade in={getModalState('modal1')}>
          <Box>
            <Typography>Modal 1 Titre</Typography>
            <Typography>Contenu du Modal 1</Typography>
            <Button onClick={() => closeModal('modal1')}>Fermer</Button>
          </Box>
        </Fade>
      </Modal> */}

      {/* <Modal
        open={getModalState('modal2')}
        onClose={() => closeModal('modal2')}
        closeAfterTransition
      >
        <Fade in={getModalState('modal2')}>
          <Box>
            <Typography>Modal 2 Titre</Typography>
            <Typography>Contenu du Modal 2</Typography>
            <Button onClick={() => closeModal('modal2')}>Fermer</Button>
          </Box>
        </Fade>
      </Modal> */}
    </>
  );
}
