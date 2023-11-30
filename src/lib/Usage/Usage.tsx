import React from "react";

const Usage = () => {
  function useEffectSnippet() {
    return {
      __html: `useEffect(() => {
        const walletStatisticsInstance = new WalletStatistics();
        const divElement = transactionTableRef.current;
        walletStatisticsInstance.renderPartnerTransactionTable(
         divElement,
            {
                credentials: {
                  application_id:
                    '',
                  client_id:
                    '',
                  client_secret:
                    '',
                  version: '',
                },
              },
            );
        }, [])`,
    }
  }
  function npmRCSnippet() {
    return {
      __html: `//npm.pkg.github.com/:_authToken=?
      @coderowersoftware:registry=https://npm.pkg.github.com
      always-auth=true
      @ishaan-puniani:registry=https://npm.pkg.github.com`,
    }
  }
  return (
    <div>
      <h2>Usage</h2>
      <h2> Welcome to Wallet Statistics </h2>
      <h3>How to add transactions table on your React application</h3>
      <hr />
      <div>Configure - </div>
      <div>
        npm install @ishaan-puniani/wallet-statistics@0.0.91 or &nbsp;
        <a href="https://github.com/ishaan-puniani/wallet-statistics/pkgs/npm/wallet-statistics">
          Click
        </a>
      </div>
      <div>
        If above package not installed correctly then create file .npmrc
      </div>
      <pre>
        <div dangerouslySetInnerHTML={npmRCSnippet()} />;
      </pre>
      <hr />
      <div>
        <code>
          import WalletStatistics from '@ishaan-puniani/wallet-statistics'
        </code>
      </div>
      <pre>
        <div dangerouslySetInnerHTML={useEffectSnippet()} />;
      </pre>
    </div>
  );
};

export default Usage;
