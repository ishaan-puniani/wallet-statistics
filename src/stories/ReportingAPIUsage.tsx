import React from "react";

const ReportingAPIUsage = () => {
  function useEffectSnippet() {
    return {
      __html: ` 
      import WalletStatistics from '@ishaan-puniani/wallet-statistics';

      useEffect(() => {
        const fetch = async () => {
            const walletStatisticsInstance =
          new WalletStatistics();
        const report =
          await walletStatisticsInstance.services.fetchGetBalances(
            config.walletCredentials,
            'DPK',
            'INR',
            startDate,
            endDate,
            'monthly',
            false,
          );
        }
    fetch();
      }, []);`,
    };
  }
  return (
    <pre>
      <div>How to call services in your application</div>
      <div dangerouslySetInnerHTML={useEffectSnippet()} />;
    </pre>
  );
};

export const EndPointDetails = () => {
  function endpoint() {
    return {
      __html: ` 
      REPORTING_API_HOST/tenant/applicationId/reports/getbalances?Filter%5BPartnerId%5D=DPK&Filter%5BCurrency%5D=INR&Filter%5BDateRange%5D=2023-01-31&Filter%5BDateRange%5D=2023-12-31&group=monthly
    }`,
    };
  }
  return (
    <pre>
      <div>API</div>
      <div dangerouslySetInnerHTML={endpoint()} />;
    </pre>
  );
};

export const BarLineChart = () => {
  function useEffectSnippet() {
    return {
      __html: ` 
      import WalletStatistics from '@ishaan-puniani/wallet-statistics';

      //Sample
      const transactionType = [
        {
          type: 'debit',
          label: 'Expense',
        },
        {
          type: 'credit',
          label: 'Income',
        },
      ];

      //Sample
      const chartThemeConfig = {
        Income: '#87E05D',
        Expense: '#F15555',
      };

      useEffect(
        () => {
          const walletStatisticsInstance =
            new WalletStatistics();
          const divElement = partnerBalancesChartRef.current;
          walletStatisticsInstance.renderReportChart(
            divElement,
            {
              credentials: config.walletCredentials,
              // todo : need to pass current user
              userId: 'DPK',
              currency: 'INR',
              transactionTypes: transactionType,
              themeConfig: chartThemeConfig,
              chartOptions: option,
              chartType: 'bar',
              startDate,
              endDate,
              group: 'monthly',
              includePrevious: false,
            },
          );
        },
        // eslint-disable-next-line
        [startDate, endDate],
      );`,
    };
  }
  return (
    <pre>
      <div>How to call services in your application</div>
      <div dangerouslySetInnerHTML={useEffectSnippet()} />;
    </pre>
  );
};
export const PieChart = () => {
  function useEffectSnippet() {
    return {
      __html: ` 
      import WalletStatistics from '@ishaan-puniani/wallet-statistics';

      //Sample
      const getExpenseThemeConfig = {
        Fashion: {
          chart: {
            color: "#DA00B8"
          }
        },
        Health: {
          chart: {
            color: "#64AD41"
          }
        }
      }

      useEffect(() => {
        const walletStatisticsInstance = new WalletStatistics();
        const divElement = partnerBalancesChartRef.current;
        walletStatisticsInstance.renderReportBalanceChart(
          divElement,
          {
            credentials: config.walletCredentials,
            // todo : need to pass current user
            userId: 'DPK',
            currency: 'INR',
            transactionTypes: Object.keys(
              getExpenseThemeConfig,
            ),
            themeConfig: getExpenseThemeConfig,
            chartOptions,
            startDate: startDate,
            endDate: endDate,
            type: 'debit',
            group: interval,
            includePrevious: false,
          },
        );
    
        // eslint-disable-next-line
      }, [startDate, endDate, getExpenseThemeConfig]);`,
    };
  }
  return (
    <pre>
      <div>How to call services in your application</div>
      <div dangerouslySetInnerHTML={useEffectSnippet()} />;
    </pre>
  );
};

export default ReportingAPIUsage;
