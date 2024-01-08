import React from "react";
const BalanceChartWithChartOptions = () => {
  function chartOptions() {
    return {
      __html: `const chartOptions = {
        tooltip: {
          show: false,
          trigger: 'item',
        },
        legend: {
          show: false,
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '80%',
            avoidLabelOverlap: true,
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              formatter: (params: any) => {
                return {name|${"params.data.name"}}\n{value|${"params.percent"}} %
              },
              minMargin: 5,
              edgeDistance: 5,
              lineHeight: 15,
              rich: {
                name: {
                  fontSize: 15,
                  color: 'inherit',
                },
              },
            },
            labelLine: {
              show: true,
            },
            data: [],
          },
        ],
      };`,
    };
  }
  function themeConfig() {
    return {
      __html: ` const themeConfig = category?.reduce((acc, category) => {
        if (!acc[category.name] && balance[category.name]) {
          acc[category.name] = {};
        }
        if (balance[category.name]) {
          acc[category.name] = {
            chart: {
              color: category.color,
            },
          };
        }
        return acc;
      }, {});`,
    };
  }
  function useEffectSnippet() {
    return {
      __html: ` useEffect(() => {
        const walletStatisticsInstance = new WalletStatistics();
        const divElement = partnerBalancesChartRef.current;
        walletStatisticsInstance.renderPartnerBalancesChart(
          divElement,
          {
            credentials: config.walletCredentials,
            userId,,
            amountType: 'amount',
            currency: 'INR',
            transactionTypes: Object.keys(themeConfig),
            themeConfig,
            chartOptions,
          },
        );
        // eslint-disable-next-line
      }, [category]);`,
    };
  }
  return (
    <>
      <pre>
        <div dangerouslySetInnerHTML={chartOptions()} />;
        <hr />
        <div>Theme config based on Transaction types</div>
        <div dangerouslySetInnerHTML={themeConfig()} />;
        <hr />
        <div dangerouslySetInnerHTML={useEffectSnippet()} />;
      </pre>
    </>
  );
};

export default BalanceChartWithChartOptions;
