import { createContext, useState } from 'react';

export const RefContext = createContext(null);

export default function RefContextProvider({ children }: any) {
  const [openApproveSuccessModal, setOpenApproveSuccessModal] = useState(false)
  const [openStakeSuccessModal, setOpenStakeSuccessModal] = useState(false)
  const [openUnstakeSuccessModal, setOpenUnstakeSuccessModal] = useState(false)
  const [openUnstakeFailModal, setOpenUnstakeFailModal] = useState(false)
  const [openCDModal, setOpenCDModal] = useState(false)
  const [cdHash, setCDHash] = useState()
  const [stakeHash, setStakeHash] = useState()
  const [unstakeHash, setUnstakeHash] = useState()

  return <RefContext.Provider value={{
    openApproveSuccessModal, setOpenApproveSuccessModal,
    openStakeSuccessModal, setOpenStakeSuccessModal,
    openUnstakeSuccessModal, setOpenUnstakeSuccessModal,
    openUnstakeFailModal, setOpenUnstakeFailModal,
    openCDModal, setOpenCDModal,
    cdHash, setCDHash,
    stakeHash, setStakeHash,
    unstakeHash, setUnstakeHash,
  } as any}>
    {children}
  </RefContext.Provider>
};