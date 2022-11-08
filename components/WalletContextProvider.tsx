import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { GlowWalletAdapter, PhantomWalletAdapter, TorusWalletAdapter } from "@solana/wallet-adapter-wallets"
import { clusterApiUrl } from "@solana/web3.js"
import { FC, ReactNode, useCallback, useMemo } from "react"
import dynamic from 'next/dynamic';
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";

require("@solana/wallet-adapter-react-ui/styles.css");

const WalletModalProviderDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletModalProvider,
  { ssr: false }
);

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;
  const url = useMemo(() => clusterApiUrl(network), [network])

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
    ],
    []
  );

  const onError = useCallback(
      (error: WalletError) => {
        console.log(error);
      },
      []
  );

  return (
    <ConnectionProvider endpoint={url}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect>
        <WalletModalProviderDynamic>
          {children}
        </WalletModalProviderDynamic>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default WalletContextProvider