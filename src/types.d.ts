export interface IMarket {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    roi: number;
    last_update: string;
    sparkline_in_7d: ISparkline;
}

export interface ISparkline {
    price: number[];
}

export type IMarketList = IMarket[];

export type CardItem = Pick<
    IMarket,
    'name' | 'sparkline_in_7d' | 'total_volume' | 'current_price' | 'price_change_percentage_24h' | 'image' | 'symbol'
>;

export interface IWindowDimensions {
    height: number;
    width: number;
}

export interface IRenderCanvasProps {
    canvas: HTMLCanvasElement;
    sparkline: ISparkline;
    priceChange: number;
    length: number;
    height: number;
    tooltip: boolean;
}
