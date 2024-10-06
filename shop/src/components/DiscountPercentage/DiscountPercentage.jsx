import React from 'react';

function DiscountPercentage({ discountPercentage, styles }) {
    return (
        <div className={styles.block_persent}>
            {discountPercentage !== 0 && ( // Проверяем, что процент скидки не равен 0
                <p className={styles.persent}> -{discountPercentage}%</p>
            )}
        </div>
    );
}

export default DiscountPercentage;
