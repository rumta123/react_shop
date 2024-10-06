import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Импортируем useSelector для доступа к состоянию Redux
import styles from './Header.module.css';
import Navigation from './Menu/Navigation';

export default function Header() {
    const cartItems = useSelector(state => state.cartItems); // Получаем данные о товарах в корзине из состояния Redux

    // Вычисляем общее количество товаров в корзине
    const totalQuantity = cartItems.reduce((total, item) => total + item.count, 0);

    return (
        <header className={styles.header}>
            <span className={styles.logo}>
                <Link to="/">
                    <img src={require('../../img/logo.svg').default} alt="Logo" />
                </Link>
            </span>
            <Navigation />
            <span className={styles.basket}>
                <Link to="/cart">
                    {/* Отображаем иконку корзины и количество товаров рядом с ней */}
                    <img src={require('../../img/icon.svg').default} alt="Cart" />
                    {totalQuantity > 0 && ( // Показываем количество только если оно больше 0
                        <span className={styles.cartItemCount}>{totalQuantity}</span>
                    )}
                </Link>
            </span>
        </header>
    );
}
