import React from 'react'
import styles from './InputForm.module.css'

export default function InputForm({ submit, placeholder, ...props }) {
    return (
        <input type={submit} className={styles.InputForm} {...props} placeholder={placeholder} />
    );
}


