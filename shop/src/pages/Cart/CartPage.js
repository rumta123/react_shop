import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './CartPage.module.css';
import { API_URL } from '../../constants';
import Counter from '../../components/Counter/Counter';
import { updateCartItem, removeCartItem } from '../../store/actions';
import { useForm } from 'react-hook-form';
import BtnClose from '../../components/BtnClose/BtnClose';
const CartPage = () => {
    const cartItems = useSelector(state => state.cartItems);

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

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

    const [itemsCount, setItemsCount] = useState(
        cartItems.reduce((acc, item) => {
            acc[item.id] = item.count;
            console.log('acc', acc)
            return acc;

        }, {})
    );

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        calculateTotalPrice();
    }, [cartItems, itemsCount]);

    const calculateTotalPrice = () => {
        let total = 0;

        cartItems.forEach(item => {
            const price = item.discont_price !== null ? item.discont_price : item.price;
            const itemTotal = price * itemsCount[item.id];
            total += itemTotal;
        });

        setTotalPrice(total);
    };

    const handleAddCount = (productId) => {
        const updatedCount = { ...itemsCount };
        updatedCount[productId] += 1;
        dispatch(updateCartItem(productId, updatedCount[productId]));
        setItemsCount(updatedCount);
    };

    const handleGetCount = (productId) => {
        if (itemsCount[productId] > 0) {
            const updatedCount = { ...itemsCount };
            updatedCount[productId] -= 1;
            dispatch(updateCartItem(productId, updatedCount[productId]));
            setItemsCount(updatedCount);
        }
    };

    const handleRemoveItem = (productId) => {
        // Отправляем экшен для удаления товара из корзины
        dispatch(removeCartItem(productId));
    };

    const onSubmit = (data) => {
        // alert(JSON.stringify(data));
        setShowModal(true);
    };

    const totalCount = cartItems.reduce((acc, item) => {
        return acc + item.count;
    }, 0);

    console.log('Total count of items:', totalCount);
    const closeButtonStyles = {
        color: '#fff',
        padding: '5px 10px',
        cursor: 'pointer',
        position: 'relative',
        left: 'calc(100% - 30px)',  // Сдвиг влево на 30 пикселей от крайней правой границы
        bottom: '20px',  // Сдвиг вверх на 30 пикселей от нижней границы
        fontSize: 44

    };

    return (
        <div className={styles.cartContainer}>

            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <BtnClose onClick={() => setShowModal(false)} customDivBtn={closeButtonStyles} >
                            x
                        </BtnClose>

                        <h2>Congratulations! </h2>
                        <p>Your order has been successfully placed on the website.</p>
                        <p>A manager will contact you shortly to confirm your order.</p>

                    </div>
                </div>
            )}
            <h2>Shopping cart</h2>
            {cartItems.length === 0 ? (
                <p>Looks like you have no items in your basket currently.</p>
            ) : (
                <div className={styles.blockBasket}>
                    <ul className={styles.productList}>
                        {cartItems.map(item => (
                            <li key={item.id} className={styles.productItem}>


                                <div>
                                    <img src={`${API_URL}${item.image}`} alt={item.title} className={styles.productImage} />
                                </div>
                                <div className={styles.productInfo}>

                                    <div>  <h3>{item.title}</h3>
                                        <BtnClose onClick={() => handleRemoveItem(item.id)}>
                                            x
                                        </BtnClose>
                                        {/* <button onClick={() => handleRemoveItem(item.id)}>X</button> */}
                                    </div>
                                    <div className={styles.counts}>
                                        <Counter
                                            count={itemsCount[item.id]}
                                            handleAddCount={() => handleAddCount(item.id)}
                                            handleGetCount={() => handleGetCount(item.id)}
                                        />

                                        {item.discont_price ? (
                                            <div className={styles.all_discont}>
                                                <p className={styles.price1}>
                                                    ${item.discont_price * itemsCount[item.id]}
                                                </p>
                                                <p className={styles.discont1}>
                                                    ${item.price * itemsCount[item.id]}
                                                </p>

                                            </div>
                                        ) : (
                                            <p>${item.price * itemsCount[item.id]}</p>
                                        )}



                                    </div>

                                    <input
                                        type="hidden"
                                        value={item.discont_price !== null ? item.discont_price : item.price}
                                        readOnly
                                    />



                                    {/* <p>Total for this item: ${ item.price * itemsCount[item.id]}</p>
                                    <p>Total for this item: ${ (item.discont_price !== null ? item.discont_price : 0) * itemsCount[item.id]}</p> */}
                                </div>

                            </li>
                        ))}
                    </ul>




                    <div className={styles.form}>
                        <p> Order details</p>

                        <p>{totalCount} items </p>
                        <p>Total Price: <span>${totalPrice}</span></p>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input {...register('Name')} placeholder="Name" />
                            <input {...register('Phone', { required: true, maxLength: 10 })} placeholder="Phone number" />
                            {errors.Phone && <p>This field is required</p>}
                            <input
                                {...register('Email', { required: true, pattern: /^\S+@\S+$/i })}
                                placeholder="Email"
                            />
                            {errors.Email && <p>This field is required</p>}
                            <input className={styles.Onsubmit} type="submit" value="Order" />
                        </form>
                    </div>



                </div>

            )}
        </div>
    );
};

export default CartPage;
