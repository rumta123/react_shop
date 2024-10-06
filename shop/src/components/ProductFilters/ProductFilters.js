// ProductFilters.js

import React from 'react';
import styles from './ProductFilters.module.css'
const ProductFilters = ({
    fromPrice,
    toPrice,
    showDiscountOnly,
    sortOrder,
    setFromPrice,
    setToPrice,
    setShowDiscountOnly,
    setSortOrder,
    setApplySorting,
}) => {
    return (
        <div className={styles.mySearch}>
            <label> Price
                <input
                    type="text"
                    placeholder="From"
                    value={fromPrice}
                    onChange={e => setFromPrice(e.target.value)}
                />
                  </label>
                <input
                    type="text"
                    placeholder="To"
                    value={toPrice}
                    onChange={e => setToPrice(e.target.value)}
                />
          
            <label>
                Discounted Items
                <input
                    type="checkbox"

                    checked={showDiscountOnly}
                    onChange={() => setShowDiscountOnly(!showDiscountOnly)}
                />
            </label>

            <label>
                Sorted:
                <select
                    value={sortOrder}
                    onChange={e => setSortOrder(e.target.value)}
                >
                    <option value="Default">Default</option>
                    <option value="price">Sort by Price (ascending)</option>
                    <option value="price-desc">Sort by Price (descending)</option>
                    {/* Добавьте здесь другие варианты сортировки по мере необходимости */}
                </select>
            </label>
        </div>
    );
};

export default ProductFilters;
