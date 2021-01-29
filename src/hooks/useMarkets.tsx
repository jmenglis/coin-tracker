import { useState, useEffect } from 'react';
import { IMarketList, IWindowDimensions } from '../types';
import getUSDMarkets from '../services/getUSDMarkets';
import useDimensions from './useDimensions';

const useMarkets = (paginator: number): { markets: IMarketList; requestStatus: string } => {
    const [requestStatus, setRequestStatus] = useState<string>('idle');
    const [markets, setMarkets] = useState<IMarketList>([]);

    // Get window dimensions and use height of card + padding to calculate initial items
    const { height }: IWindowDimensions = useDimensions();
    const numberOfInitialItems: number = Math.floor(height / 49);

    useEffect(() => {
        setRequestStatus('fetching');
        const getMarkets = async (): Promise<void> => {
            const data: IMarketList = await getUSDMarkets(numberOfInitialItems, paginator);
            setMarkets((state) => state.concat(...data));
            setRequestStatus('complete');
        };
        getMarkets();
    }, [paginator]);

    return { markets, requestStatus };
};

export default useMarkets;
