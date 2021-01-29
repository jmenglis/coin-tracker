import { DateTime } from 'luxon';
import { IRenderCanvasProps } from '../types';

const renderCanvas = ({ canvas, sparkline, priceChange, length, height, tooltip }: IRenderCanvasProps): void => {
    const handleMouseMove = (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        const currentMouseLocation = e.clientX - 32;
        for (let i = 0; i < points.length; i++) {
            if (currentMouseLocation === points[i].x) {
                if (context) {
                    context.clearRect(0, 0, 100, 50);
                    context.fillStyle = 'white';
                    context.fillText(`$${points[i].price.toFixed(2)}`, 0, 15);
                    context.fillText(`${points[i].date}`, 0, 25);
                }
            }
        }
    };

    if (tooltip) {
        canvas.addEventListener('mousemove', (e: MouseEvent) => handleMouseMove(e));
    }
    const price = sparkline.price.slice().reverse();
    const elem: HTMLCanvasElement = canvas;
    const context = elem.getContext('2d');
    const points: { x: number; y: number; price: number; date: string }[] = [];

    canvas.addEventListener('mousemove', (e: MouseEvent) => handleMouseMove(e));

    if (context) {
        context.clearRect(0, 0, length, height);
        context.strokeStyle = priceChange >= 0 ? 'rgb(46, 174, 52)' : 'rgb(249, 103, 45)';
        context.fillStyle = priceChange >= 0 ? 'rgb(46, 174, 52)' : 'rgb(249, 103, 45)';
        context.lineWidth = 1.5;
        context.beginPath();

        const max = Math.max(...price);
        const min = Math.min(...price);
        for (let i = 0; i < price.length; i++) {
            const current = price[i];
            const x = Math.round(length - (length / (price.length - 1)) * i);
            const y = Math.round(height - ((current - min) / (max - min)) * height);
            if (i) {
                context.lineTo(x, y);
            } else {
                context.moveTo(x, y);
            }
            if (tooltip) {
                const date = DateTime.local().startOf('hour').minus({ hours: i }).toFormat('MMM dd T');
                points.push({
                    x,
                    y,
                    price: price[i],
                    date,
                });
            }
        }
        context.stroke();
    }
};

export default renderCanvas;
