import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './ProductsPage.module.css';
import { API_URL } from '../../constants';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductFilters from '../../components/ProductFilters/ProductFilters';
// import { ADD_TO_CART } from '../../store/actionTypes';
import { addToCart } from '../../store/actions';
const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [fromPrice, setFromPrice] = useState('');
    const [toPrice, setToPrice] = useState('');
    const [sortOrder, setSortOrder] = useState('Default'); // Default sort order by price
    const [showDiscountOnly, setShowDiscountOnly] = useState(false);
    const [applySorting, setApplySorting] = useState(true); // Флаг применения сортировки

    const cartItems = useSelector((state) => state.cartItems);
    const dispatch = useDispatch();
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
    // const addToCart = (selectedProduct) => {
    //     // Здесь вы можете выполнить операции по добавлению товара в корзину
    //      console.log('Adding to cart:', selectedProduct);
    //     // Дополнительные операции добавления в корзину...
    // };
    const filterProducts = (product) => {
        const productPrice = product.price;
        const hasDiscount = product.discont_price !== null;

        return (
            (!fromPrice || productPrice >= parseFloat(fromPrice)) &&
            (!toPrice || productPrice <= parseFloat(toPrice)) &&
            (!showDiscountOnly || hasDiscount)
        );
    };

    const sortProducts = (a, b) => {
        if (sortOrder === 'price') {
            return a.price - b.price;
        } else if (sortOrder === 'price-desc') {
            return b.price - a.price;
        }
        return 0;
    };

    let filteredProducts = products.filter(filterProducts);
    let sortedProducts = [...filteredProducts]; // Используем let вместо const для sortedProducts

    if (applySorting) {
        sortedProducts = [...filteredProducts].sort(sortProducts);
    }
    const handleAddToCart = (product) => {
        dispatch(addToCart(product)); // Добавление товара в корзину через Redux
        console.log('Adding to cart:', product);
    };
    return (
        <div>
            <div className={styles.Category4}>
                <h2>All products</h2></div>
            {/* <h2>All Products</h2> */}
            <ProductFilters
                fromPrice={fromPrice}
                toPrice={toPrice}
                showDiscountOnly={showDiscountOnly}
                sortOrder={sortOrder}
                setFromPrice={setFromPrice}
                setToPrice={setToPrice}
                setShowDiscountOnly={setShowDiscountOnly}
                setSortOrder={setSortOrder}
                setApplySorting={setApplySorting} // Передаем функцию для управления флагом сортировки
            />

            <div className={styles.products}>
                {sortedProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        API_URL={API_URL}
                        addToCart={() => handleAddToCart(product)}
                        showAddToCartButton={true}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
