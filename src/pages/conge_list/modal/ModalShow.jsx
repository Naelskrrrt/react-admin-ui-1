import { Box, Button, Fade, Typography, Modal, Backdrop } from '@mui/material'
import React from 'react'
import { useModal } from '../../../components/ModalContext';


const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    height: 425,
    bgcolor: 'background.paper',
    boxShadow: 24,
    
    borderRadius: '20px',
    p: 4,
  };
  
export default function ModalShow({title, children}) {

    const { openModal, closeModal, getModalState } = useModal();
    
  return (
    <>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={getModalState('modal2')}
        onClose={() => closeModal('modal2')}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
            backdrop: {
            timeout: 500,
            },
        }}
        >
        <Fade in={getModalState('modal2')}>
            <Box sx={style} >
              <Typography id="transition-modal-title" variant="h5" component="h2" sx={{fontFamily: 'Poppins', color: '#0b0916', fontWeight: '500', width:"100%", background: "#205e882d", padding: "20px", borderRadius: "20px"}}>
                  {title}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  {children}
              </Typography>
            </Box>
        </Fade>
        </Modal>
    </>
  )
}
