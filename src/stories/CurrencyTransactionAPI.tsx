import React from "react";
const CurrencyTransactionAPI = () => {
  function useEffectSnippet() {
    return {
      __html: `function formulateWalletTransaction(data: any) {
        const transaction: any = {
          amount: Number(data.amount),
          productName: data.account,
          remark: data.note,
          transactionType: data.category,
          currency: 'INR',
          virtualValue: 0,
          createdAt: data.transactionDate,
          isCredit: true,
          //additionalData: json{imageUrl},
          reference:'ABC',
          description: data.description,
        };
        if (transaction.isCredit) {
          transaction.payeeId = "DPK";
          transaction.currentBalanceFor = "";
        } else {
          transaction.payerId = "IP";
          transaction.currentBalanceFor = "";
        }
        return transaction;
      }`,
    };
  }
  return (
    <>
      <pre>
        <div dangerouslySetInnerHTML={useEffectSnippet()} />;
      </pre>
    </>
  );
};

export default CurrencyTransactionAPI;
