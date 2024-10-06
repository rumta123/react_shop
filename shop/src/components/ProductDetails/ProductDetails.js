import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../constants';
import styles from './ProductDetails.module.css';
import Btn from '../../components/Btn/Btn';
import { addToCart, updateCartItem } from '../../store/actions'; // Подключаем действие addToCart из Redux
import BtnSmall from '../BtnSmall/BtnSmall';
import Counter from '../Counter/Counter';
const ProductDetails = () => {
    const { id } = useParams(); // Получаем id товара из URL
    const [product, setProduct] = useState(null); // Состояние для хранения данных о товаре
    const cartItems = useSelector((state) => state.cartItems);
    const dispatch = useDispatch();
  
    const additionalBtnStyles = {
        width: 58,
    
        height:58,
        fontSize:34,
      };
      const [count, setCount] = useState(1); 

    const handleAddCount = () => {

        setCount(count + 1);

    };

    const handleGetCount = () => {
       
        if (count > 1) {
            setCount(count - 1);
        }
 
    };


    useEffect(() => {
        // Функция для получения данных о товаре по id из API
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`${API_URL}/products/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProduct(data); // Устанавливаем полученные данные в состояние
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        // Вызываем функцию получения данных о товаре при загрузке компонента
        fetchProductDetails();
        // Функция очистки при размонтировании компонента
        return () => {
            setCount(1); // Сбрасываем count до 1 при размонтировании
        };
    }, [id]); // Запускаем запрос при изменении id в URL

    if (!product) {
        return <p>Loading...</p>; // Отображаем загрузочное сообщение, пока идет запрос
    }

    const { title, description, price, discont_price, image } = product;

    const discountPercentage = product[0].discont_price !== null ? ((1 - product[0].discont_price / product[0].price) * 100).toFixed(0) : 0;

   
    const handleAddToCart = () => {
        const existingItem = cartItems.find(item => item.id === product[0].id);
       console.log('count', count)
        const newItem = {
            id: product[0].id,
            title: product[0].title,
            price: product[0].price,
            discont_price: product[0].discont_price,
            description: product[0].description,
            image: product[0].image,
            createdAt: product[0].createdAt,
            updatedAt: product[0].updatedAt,
            categoryId: product[0].categoryId,
            count  // Здесь используем количество из useState
        };
    
        if (existingItem) {
           
            dispatch(updateCartItem(product[0].id, count));
        } else {
            // Товар отсутствует в корзине, добавляем его с начальным количеством
            dispatch(addToCart({ ...newItem}));  // Передаем объект с дополнительным свойством quantity
        console.log(newItem, count )
        }
    };
    

    
    return (
        <div className={styles.mydiv}>
            <div style={{ width: 748 }}>
                {product[0].image && <img src={`${API_URL}${product[0].image}`} alt={title} style={{ maxWidth: '300px' }} />}
            </div>
            <div>
                <h1>{product[0].title}</h1>
                <div className={styles.price}>
                    <p>${product[0].discont_price}  </p>
                    {product[0].discont_price && <p>${product[0].price}</p>}
                    {product[0].discont_price !== null && (
                        <div className={styles.block_persent}>
                            {discountPercentage !== 0 && <p className={styles.persent}> -{discountPercentage}%</p>}
                        </div>
                    )}
                </div>
                <div style={{ display: 'flex',     alignItems: 'center' }}>
                <Counter count={count} handleAddCount={handleAddCount} handleGetCount={handleGetCount} />
                      <Btn customStyles={{ width: 316 }} onClick={handleAddToCart}>
                        Add to cart
                    </Btn> 
                </div> 
            
                <p>
                    <b>Description:</b>
                    <br />
                    {product[0].description}
                </p>
            </div>
        </div>
    );
};

export default ProductDetails;
