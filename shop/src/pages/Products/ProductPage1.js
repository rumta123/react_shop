import React, { useState, useEffect } from 'react';
import styles from './ProductsPage.module.css';
import Btn from '../../components/Btn/Btn';
import { API_URL } from '../../constants'; // Импортируем константу

function Product({ product }) {

    const additionalBtnStyles = {
        position: 'relative',
        top: -25,
        width: 'calc(25% - -90px)'
    };

    const [strikeThrough, setStrikeThrough] = useState(false);
    const discountPercentage = product.discont_price !== null ?
        ((1 - product.discont_price / product.price) * 100).toFixed(0) : 0;

    useEffect(() => {
        // Установить значение зачеркивания в зависимости от наличия скидки
        setStrikeThrough(product.discont_price !== null);
    }, [product.discont_price]);

    return (
        <div className={styles.product}>

            <div className={styles.block_products_img} >
                <img src={`${API_URL}${product.image}`} alt={product.title} />
                <Btn customStyles={additionalBtnStyles}>Add to cart</Btn>
                {product.discount_price !== null && (
                    <div className={styles.block_persent}>

                        {discountPercentage !== 0 && ( // Проверяем, что процент скидки не равен 0
                            <p className={styles.persent}> -{discountPercentage}%</p>
                        )}


                    </div>
                )}
            </div>
            <div className={styles.block_product_text}>
                <h3 className={styles.title}>{product.title}</h3>

                <div className={styles.products_price}>
                    {strikeThrough ? (
                        // Если есть скидка, выводим цену со скидкой и зачеркиваем основную цену
                        <>

                            <span className={styles.block_discont}>
                                <p className={styles.p_discont}>${product.discont_price} </p>
                                <p className={styles.decoration} style={{ textDecoration: 'line-through' }}>
                                    ${product.price}
                                </p>
                            </span>

                        </>
                    ) : (
                        // Если скидки нет, выводим просто основную цену без зачеркивания
                        <p className={styles.p_discont}>${product.price}</p>

                    )}
                </div>
            </div>

        </div>
    );
}
export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [fromPrice, setFromPrice] = useState('');
    const [toPrice, setToPrice] = useState('');
    const [sortOrder, setSortOrder] = useState('price'); // Default sort order by price
    const [showDiscountOnly, setShowDiscountOnly] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/products/all`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const filteredProducts = products.filter(product => {
        const productPrice = product.price;
        const hasDiscount = product.discont_price!== null;

        return (
            (!fromPrice || productPrice >= parseFloat(fromPrice)) &&
            (!toPrice || productPrice <= parseFloat(toPrice)) &&
            (!showDiscountOnly || hasDiscount)
        );
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOrder === 'price') {
            return a.price - b.price;
        } else if (sortOrder === 'price-desc') {
            return b.price - a.price;
        }
        // Add more sorting options here (e.g., by name, etc.)
        return 0;
    });

    return (
        <div>
            <div className='test'>
                <input
                    type="text"
                    placeholder="From Price"
                    value={fromPrice}
                    onChange={e => setFromPrice(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="To Price"
                    value={toPrice}
                    onChange={e => setToPrice(e.target.value)}
                />

                <label>    
                    Discount Items 
                    <input
                        type="checkbox"
                        checked={showDiscountOnly}
                        onChange={() => setShowDiscountOnly(!showDiscountOnly)}
                    />
                
                </label>
                <label> Sorted
                <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                    <option value="price">Sort by Price (ascending)</option>
                    <option value="price-desc">Sort by Price (descending)</option>
                    {/* Add more sorting options as needed */}
                </select>
                </label>
                
            </div>

            <div className={styles.products}>
                {sortedProducts.map(product => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}