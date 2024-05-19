import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { mainnet, goerli } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = '3e77a363429ac6529c1e19a444d573da'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    {
      ...mainnet,
      rpcUrls: { default: { http: ["https://ethereum.publicnode.com"] }, public: { http: ["https://ethereum.publicnode.com"] } }, //https://eth.llamarpc.com
      //https://ethereum.publicnode.com
    },
  ],
  [
    alchemyProvider({ apiKey: process.env.VITE_ALCHEMY_API_KEY! }),
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'My wagmi + RainbowKit App',
  chains,
  projectId: walletConnectProjectId,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }

