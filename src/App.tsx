import React, { ReactElement, useState } from 'react';
import './App.css';
import MarketList from './MarketList';

const App = (): ReactElement => {
    const [paginator, setPaginator] = useState(1);
    return (
        <div className="App">
            <MarketList paginator={paginator} setPaginator={setPaginator} />
        </div>
    );
};

export default App;
