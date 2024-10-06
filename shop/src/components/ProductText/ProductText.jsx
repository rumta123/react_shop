import React from 'react';

function ProductText({ title, strikeThrough, discontPrice, price, styles }) {
    return (
        <div className={styles.block_product_text}>
            <h3 className={styles.title}>{title}</h3>

            <div className={styles.products_price}>
                {strikeThrough ? (
                    // Если есть скидка, выводим цену со скидкой и зачеркиваем основную цену
                    <>
                        <span className={styles.block_discont}>
                            <p className={styles.p_discont}>${discontPrice} </p>
                            <p className={styles.decoration} style={{ textDecoration: 'line-through' }}>
                                ${price}
                            </p>
                        </span>
                    </>
                ) : (
                    // Если скидки нет, выводим просто основную цену без зачеркивания
                    <p className={styles.p_discont}>${price}</p>
                )}
            </div>
        </div>
    );
}

export default ProductText;
