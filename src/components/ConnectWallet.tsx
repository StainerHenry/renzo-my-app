import { ConnectButton } from '@rainbow-me/rainbowkit'

const ConnectWallet = () => {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === 'authenticated');

                return (
                    <>
                        {(() => {
                            if (!connected) {
                                return (
                                    <button className="flex justify-center items-center space-x-[7px] bg-[#51E5A3] px-5 h-10 sm:h-[50px] rounded-[7px] transition hover:scale-110 font-medium text-[14px] sm:text-[18px] leading-[17.47px] sm:leading-[21.47px] text-black" type="button" onClick={openConnectModal}>Connect Wallet</button>
                                );
                            }

                            if (chain.unsupported) {
                                return (
                                    <button className='flex justify-center items-center space-x-[7px] bg-[#51E5A3] px-5 h-10 sm:h-[50px] rounded-[7px] transition hover:scale-110 font-medium text-[14px] sm:text-[18px] leading-[17.47px] sm:leading-[21.47px] text-black' onClick={openChainModal} type='button'>
                                        WRONG NETWORK
                                    </button>
                                );
                            }
                            return (
                                <button className="flex justify-center items-center space-x-[7px] bg-[#51E5A3] px-5 h-10 sm:h-[50px] rounded-[7px] transition hover:scale-110 font-medium text-[14px] sm:text-[18px] leading-[17.47px] sm:leading-[21.47px] text-black" onClick={openAccountModal}>{account.address.slice(0,6)+"..."+account.address.slice(-4)}</button>
                            );
                        })()}
                    </>
                );
            }}
        </ConnectButton.Custom>
    )
}

export default ConnectWallet