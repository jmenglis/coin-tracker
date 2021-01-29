import React, { ReactElement, useEffect, useRef, useState, Fragment } from 'react';
import { CardItem } from '../types';
import renderCanvas from '../helpers/renderCanvas';
import './styles/Card.css';
import ExpandedCard from './ExpandedCard';

const Card = ({
    name,
    sparkline_in_7d,
    total_volume,
    current_price,
    price_change_percentage_24h,
    image,
    symbol,
}: CardItem): ReactElement => {
    const [expand, setExpand] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (canvasRef.current) {
            renderCanvas({
                canvas: canvasRef.current,
                sparkline: sparkline_in_7d,
                priceChange: price_change_percentage_24h,
                length: 150,
                height: 20,
                tooltip: false,
            });
        }
    }, [sparkline_in_7d]);
    const symbolToUpper = symbol.toUpperCase();
    const roundedTotalVolInCrypto = Math.round(total_volume / current_price);
    const priceClass = price_change_percentage_24h >= 0 ? 'price-pos' : 'price-neg';
    const ShowExpandedCard = expand ? (
        <ExpandedCard sparkline={sparkline_in_7d} priceChange={price_change_percentage_24h} />
    ) : null;
    return (
        <Fragment>
            <button onClick={() => setExpand(!expand)} className="card-item">
                <div className="information">
                    <img className="currency-image" src={image} />
                    <div className="stacked">
                        <span className="symbol">{symbolToUpper}-USD</span>
                        <span>{name}</span>
                    </div>
                </div>
                <div className="sparkline">
                    <canvas ref={canvasRef} width="150px" height="20px" />
                </div>
                <div className="volume-stacked">
                    <span>
                        {roundedTotalVolInCrypto} {symbolToUpper}
                    </span>
                    <span>24h volume</span>
                </div>
                <div className="price-stacked">
                    <span>${current_price}</span>
                    <span className={priceClass}>
                        {price_change_percentage_24h ? price_change_percentage_24h.toFixed(2) : 0}
                    </span>
                </div>
            </button>
            {ShowExpandedCard}
        </Fragment>
    );
};

export default Card;
