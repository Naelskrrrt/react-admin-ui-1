// import React, { createContext, useContext, useState } from 'react';

// const ModalContext = createContext();

// export const ModalProvider = ({ children }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   return (

//       <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
//         {children}
//       </ModalContext.Provider>
    
//   );
// };

// export const useModal = () => useContext(ModalContext);

import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalStates, setModalStates] = useState({});

  const openModal = (modalName) => {
    setModalStates((prevState) => ({
      ...prevState,
      [modalName]: true,
    }));
  };

  const closeModal = (modalName) => {
    setModalStates((prevState) => ({
      ...prevState,
      [modalName]: false,
    }));
  };

  const getModalState = (modalName) => modalStates[modalName] || false;

  return (
    <ModalContext.Provider value={{ openModal, closeModal, getModalState }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);