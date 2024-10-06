import React, { useState, useEffect } from 'react';
import styles from './Product.module.css';
import Btn from '../../components/Btn/Btn';

function Product({ product }) {
  const additionalBtnStyles = {
    position: 'relative',
    top: -25,
    width: 'calc(25% - -90px)'
  };

  const [strikeThrough, setStrikeThrough] = useState(false);
  const discountPercentage = product.discont_price !== null
    ? ((1 - product.discont_price / product.price) * 100).toFixed(0)
    : 0;

  useEffect(() => {
    setStrikeThrough(product.discont_price !== null);
  }, [product.discont_price]);

  return (
    <div className={styles.product}>
      <div className={styles.block_products_img}>
        <img src={`${API_URL}${product.image}`} alt={product.title} />
        <Btn customStyles={additionalBtnStyles}>Add to cart</Btn>
        {product.discount_price !== null && (
          <div className={styles.block_persent}>
            {discountPercentage !== 0 && (
              <p className={styles.persent}>-{discountPercentage}%</p>
            )}
          </div>
        )}
      </div>
      <div className={styles.block_product_text}>
        <h3 className={styles.title}>{product.title}</h3>
        <div className={styles.products_price}>
          {strikeThrough ? (
            <>
              <span className={styles.block_discont}>
                <p className={styles.decoration}>${product.price}</p>
                <p className={styles.p_discont}>${product.discont_price}</p>
                
              </span>
            </>
          ) : (
            <p className={styles.p_discont}>${product.price}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
