import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Sale.module.css';
import BtnSmall from '../BtnSmall/BtnSmall';
import { addToCart } from '../../store/actions';
const Sale = ({ products, API_URL, showLineProp, isHomePage }) => {
    const [showAll, setShowAll] = useState(!isHomePage); // Показываем все элементы, если не на главной странице
    const [showLine, setShowLine] = useState(showLineProp);
    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        dispatch(addToCart(product)); // Вызываем функцию addToCart из Redux, передавая выбранный продукт
        console.log('Adding to cart:', product);
    };
    const renderProducts = () => {
        if (!showAll && isHomePage) {
            // Показываем только первые 4 элемента на главной странице
            return products.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} API_URL={API_URL}  showAddToCartButton={true}  addToCart={() => handleAddToCart(product)}/>
            ));
        } else {
            // Показываем все элементы на других страницах или если showAll установлено в true
            return products.map(product => (
               
                <ProductCard key={product.id} product={product} API_URL={API_URL} showAddToCartButton={true}  addToCart={() => handleAddToCart(product)} />
            )
        );
        }
    };

    return (
        <div>
           <div className={styles.Category4}><h2>All Sales</h2>
          <div className={showLine ? styles.Line : styles.LineHidden}></div>
            {!showAll && products.length > 4 && (
             <BtnSmall onClick={() => {
              setShowAll(true);
              setShowLine(false); // Установка showLine в false при нажатии на кнопку
          }}>
              All sales
          </BtnSmall>
            )}
            </div>
            <div className={styles.products}>
                {renderProducts()}
            </div>
            
        </div>
    );
};

export default Sale;
