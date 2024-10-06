import React from 'react';
import BtnSmall from '../BtnSmall/BtnSmall';

const Counter = ({ count, handleAddCount, handleGetCount }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <BtnSmall onClick={handleGetCount}>-</BtnSmall>
            <p style={{ width: 96 }}>{count}</p>
            <BtnSmall onClick={handleAddCount}>+</BtnSmall>
        </div>
    );
};

export default Counter;
