import WalletStatistics from "../lib";
const walletStatisticsInstance = new WalletStatistics();

document.querySelector("body").innerHTML = `<h1>Hello World!</h1>`;

console.log("walletStatisticsInstance", walletStatisticsInstance);
walletStatisticsInstance.initSimulator(document.body);
walletStatisticsInstance.myMethod();
