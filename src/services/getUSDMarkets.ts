import { IMarketList } from '../types';

const getUSDMarkets = async (numberPerPage: number, paginator: number): Promise<IMarketList> => {
    try {
        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${numberPerPage}&page=${paginator}&sparkline=true`,
        );
        return response.json();
    } catch (e) {
        console.error(e.message);
        throw e.message;
    }
};

export default getUSDMarkets;
