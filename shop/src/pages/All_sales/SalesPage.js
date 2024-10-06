import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './SalesPage.module.css';
import { API_URL } from '../../constants';
import ProductCard from '../../components/ProductCard/ProductCard';
import { addToCart } from '../../store/actions'; // Импортируем функцию addToCart из actions
import ProductDetails  from '../../components/ProductDetails/ProductDetails'
const SalesPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); // Состояние для отслеживания выбранного товара
    const [fromPrice, setFromPrice] = useState('');
    const [toPrice, setToPrice] = useState('');
    const [sortOrder, setSortOrder] = useState('Default'); // Default sort order by price
    const [showDiscountOnly, setShowDiscountOnly] = useState(true);
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

    const handleAddToCart = (product) => {
        dispatch(addToCart(product)); // Вызываем функцию addToCart из Redux, передавая выбранный продукт
        console.log('Adding to cart:', product);
    };
    const handleProductClick = (product) => {
        setSelectedProduct(product); // Устанавливаем выбранный товар в состояние
        console.log('1111111111')
    };

    const closeProductDetails = () => {
        setSelectedProduct(null); // Сбрасываем выбранный товар при закрытии деталей
    };
    const filterProducts = (product) => {
        const productPrice = product.price;
        const hasDiscount = product.discont_price !== null;

        return (
            (!fromPrice || productPrice >= parseFloat(fromPrice)) &&
            (!toPrice || productPrice <= parseFloat(toPrice)) &&
            (!showDiscountOnly || hasDiscount)
        );
    };

    let filteredProducts = products.filter(filterProducts);
    let sortedProducts = [...filteredProducts]; // Используем let вместо const для sortedProducts

    return (
        <div className={styles.block_products}>
            {/* Показываем список товаров или детальную информацию о выбранном товаре */}
            {selectedProduct ? (
                  <ProductDetails product={selectedProduct}  />
            ) : (
                sortedProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        API_URL={API_URL}
                         addToCart={() => handleAddToCart(product)}
                        showAddToCartButton={true}
                     
                         onClick={() => handleProductClick(product)} // Обработчик клика на карточку товара
                    />
                ))
            )}
        </div>
    );
};

export default SalesPage;
