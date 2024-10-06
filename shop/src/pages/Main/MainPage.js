import React, { useState, useEffect } from 'react';
import Head from '../../components/Head/Head';
import Categories from '../../components/Categories/Categories';
import Sale from '../../components/Sale/Sale';
import styles from './MainPage.module.css';
import image from '../../img/image.png'; // Путь к изображению
import { useForm } from 'react-hook-form';
import { API_URL } from '../../constants';
const MainPage = () => {
    const [showAll, setShowAll] = useState(false); // Управление показом всех продуктов
    const [products, setProducts] = useState([]); // Состояние для списка продуктов
    const [fromPrice, setFromPrice] = useState(''); // Состояние для фильтра "от цены"
    const [toPrice, setToPrice] = useState(''); // Состояние для фильтра "до цены"
    const [showDiscountOnly, setShowDiscountOnly] = useState(true); // Состояние для фильтра "только со скидкой"
    const [applySorting, setApplySorting] = useState(true); // Флаг применения сортировки
    const [showLine, setShowLine] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            Name: '',
            Phone: '',
            Email: ''
        }
    });

    // Загрузка списка продуктов
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/products/all`);
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                    console.log(data); // Проверка данных в консоли
                } else {
                    console.error('Failed to fetch products:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [API_URL]);

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    };

    // Определение функции фильтрации продуктов
    const filterProducts = (product) => {
        const productPrice = product.price;
        const hasDiscount = product.discont_price !== null;

        return (
            (!fromPrice || productPrice >= parseFloat(fromPrice)) &&
            (!toPrice || productPrice <= parseFloat(toPrice)) &&
            (!showDiscountOnly || hasDiscount)
        );
    };

    // Фильтрация и сортировка продуктов
    let filteredProducts = products.filter(filterProducts);
    let sortedProducts = [...filteredProducts]; // Создание копии массива для сортировки

    return (
        <div>
            <Head />
            <Categories ulStyle={styles.myCategory} showAllProp={showAll} showLineProp={true} imageSize="315px" imageSizeH="350px" gapSize={0}/>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>5% off on the first order</h2>
                </div>
                <div className={styles.image}>
                    <img src={image} alt="Logo" />
                </div>
                <div className={styles.form}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register('Name')} placeholder="Name" />
                        <input {...register('Phone', { required: true, maxLength: 10 })} placeholder="Phone number" />
                        {errors.Phone && <p>This field is required</p>}
                        <input
                            {...register('Email', { required: true, pattern: /^\S+@\S+$/i })}
                            placeholder="Email"
                        />
                        {errors.Email && <p>This field is required</p>}
                        <input type="submit" value="Get a discount" />
                    </form>
                </div>
            </div>
            <Sale products={sortedProducts} API_URL={API_URL} showLineProp={true} isHomePage={true} />
        </div>
    );
};

export default MainPage;