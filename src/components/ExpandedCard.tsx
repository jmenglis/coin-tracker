import React, { ReactElement, useEffect, useRef } from 'react';
import renderCanvas from '../helpers/renderCanvas';
import { ISparkline } from '../types';
import './styles/ExpandedCard.css';

const ExpandedCard = ({ sparkline, priceChange }: { sparkline: ISparkline; priceChange: number }): ReactElement => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const length = 30 * 16;
    const height = 135;
    useEffect(() => {
        if (canvasRef.current) {
            renderCanvas({
                canvas: canvasRef.current,
                sparkline,
                priceChange,
                length,
                height,
                tooltip: true,
            });
        }
    }, [sparkline]);
    return (
        <div className="expanded-card">
            <canvas ref={canvasRef} width={`${length}px`} height={`${height}px`} />
        </div>
    );
};

export default ExpandedCard;
