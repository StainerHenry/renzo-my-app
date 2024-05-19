import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'

import { App } from './App'
import { chains, config } from './wagmi'
import RefContextProvider from './contexts/RefContextProvider'

import './index.css'
import { TokenInfoProvider } from './hooks/useTokenInfo'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <WagmiConfig config={config}>
    <RainbowKitProvider chains={chains}>
      <RefContextProvider>
        <TokenInfoProvider>
          <App />
        </TokenInfoProvider>
      </RefContextProvider>
    </RainbowKitProvider>
  </WagmiConfig>,
)
