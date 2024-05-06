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
    };
  }
  function npmRCSnippet() {
    return {
      __html: `//npm.pkg.github.com/:_authToken=?
          @coderowersoftware:registry=https://npm.pkg.github.com
          always-auth=true
          @ishaan-puniani:registry=https://npm.pkg.github.com`,
    };
  }
  return (
    <>
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
    </>
  );
};

export default Usage;
