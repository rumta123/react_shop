import React, { useState, useEffect } from 'react';
import styles from './ProductCard.module.css';
import Btn from '../../components/Btn/Btn';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const ProductCard = ({ product, API_URL, addToCart, showAddToCartButton  }) => {
    
    const navigate = useNavigate();
    const additionalBtnStyles = {
        position: 'relative',
        top: -25,
        width: 'calc(25% - -90px)'
    };
    const [selectedProduct, setSelectedProduct] = useState(null); // Состояние для отслеживания выбранного товара
 
    const [strikeThrough, setStrikeThrough] = useState(false);
    const [isAddedToCart, setIsAddedToCart] = useState(false); // Состояние добавления товара в корзину

    const discountPercentage = product.discont_price !== null ?
        ((1 - product.discont_price / product.price) * 100).toFixed(0) : 0;

    useEffect(() => {
        // Установить значение зачеркивания в зависимости от наличия скидки
        setStrikeThrough(product.discont_price !== null);
    }, [product.discont_price]);
    const handleProductClick = () => {
      
  
        navigate(`/product/${product.id}`); 
        setSelectedProduct(product);
        console.log('product', product)
      };
    const handleAddToCart = () => {
  
        console.log('Adding to cart:', product);
        // Вызываем функцию добавления в корзину и передаем выбранный товар
        addToCart(product);
    };

    const handleCombinedClick = () => {
        handleAddToCart(); // Вызываем функцию добавления в корзину
        handleProductClick(); // Вызываем функцию для перехода на страницу товара
    };

    return (
        <div className={styles.product} >
            <div className={styles.block_products_img} onClick={handleProductClick}>
                <img src={`${API_URL}${product.image}`} alt={product.title} />
                {showAddToCartButton && ( // Показываем кнопку, если showAddToCartButton равно true
                    <Btn
                        customStyles={additionalBtnStyles}
                        onClick={handleCombinedClick}
                       
                    >
                        Add to cart
                    </Btn>
                )}
                {product.discont_price !== null && (
                    <div className={styles.block_persent}>
                        {discountPercentage !== 0 && (
                            <p className={styles.persent}> -{discountPercentage}%</p>
                        )}
                    </div>
                )}
            </div>
            <div className={styles.block_product_text}>
                <h3 className={styles.title}>{product.title}</h3>
                <div className={styles.products_price}>
                    {strikeThrough ? (
                        <span className={styles.block_discont}>
                            <p className={styles.p_discont}>${product.discont_price}</p>
                            <p className={styles.decoration} style={{ textDecoration: 'line-through' }}>
                                ${product.price}
                            </p>
                        </span>
                    ) : (
                        <p className={styles.p_discont}>${product.price}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
