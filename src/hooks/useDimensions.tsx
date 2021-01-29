import { useState } from 'react';
import { IWindowDimensions } from '../types';

const useDimensions = (): IWindowDimensions => {
    const getDimensions = (): IWindowDimensions => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height,
        };
    };

    const [dimensions] = useState<IWindowDimensions>(getDimensions());

    return dimensions;
};

export default useDimensions;
