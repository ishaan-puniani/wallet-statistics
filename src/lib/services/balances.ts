import axios from "axios";
import { API_HOST } from "../../constants";

export const _fetchBalance = async (credentials: any, userId: string, currency: string)=>{
    const balanceResponse = await axios.post(
        `${API_HOST}/tenant/${credentials.application_id}/get-current-balances-for-transaction-types?filter[userId]=${userId}&filter[currency]=${currency}`,
        {
          ...credentials,
        }
      );
     return balanceResponse.data
}