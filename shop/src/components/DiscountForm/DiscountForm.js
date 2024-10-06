import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './DiscountForm.module.css'; // Import your CSS styles

const DiscountForm = ({ onSubmit, register, errors, children  }) => {
    const { handleSubmit } = useForm(); // Destructure handleSubmit from useForm

    return (
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
                <input type="submit" value={children || "Get a discount"} /> {/* Использование children как значение value */}
            </form>
        </div>
    );
};

export default DiscountForm;
