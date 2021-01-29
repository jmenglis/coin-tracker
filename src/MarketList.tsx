import React, { Dispatch, ReactElement, SetStateAction, useEffect, useRef, useState } from 'react';
import useMarkets from './hooks/useMarkets';
import { IMarket } from './types';
import Card from './components/Card';
import './styles/MarketList.css';

const MarketList = ({
    paginator,
    setPaginator,
}: {
    paginator: number;
    setPaginator: Dispatch<SetStateAction<number>>;
}): ReactElement => {
    const { markets } = useMarkets(paginator);
    const prevScrollY = useRef(0);

    const [goingUp, setGoingUp] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (prevScrollY.current < currentScrollY && goingUp) {
                setGoingUp(false);
            }
            if (prevScrollY.current > currentScrollY && !goingUp) {
                setGoingUp(true);
            }

            prevScrollY.current = currentScrollY;
            if (window.innerHeight + currentScrollY === document.documentElement.offsetHeight) {
                const newPaginator = paginator + 1;
                setPaginator(newPaginator);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, [goingUp, paginator]);

    return (
        <ul className="expandable-list">
            {markets.map((market: IMarket) => {
                const {
                    id,
                    name,
                    sparkline_in_7d,
                    total_volume,
                    current_price,
                    price_change_percentage_24h,
                    image,
                    symbol,
                } = market;
                return (
                    <li key={id}>
                        <Card
                            symbol={symbol}
                            name={name}
                            image={image}
                            current_price={current_price}
                            total_volume={total_volume}
                            price_change_percentage_24h={price_change_percentage_24h}
                            sparkline_in_7d={sparkline_in_7d}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default MarketList;
