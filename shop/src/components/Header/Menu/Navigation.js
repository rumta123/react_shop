// menu-navigation.js
import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css'
export default function Navigation() {
    const active = ({ isActive }) => (isActive ? 'active-link' : 'inactive')
    return (
       
            <ul className={styles.navList}>
                <li>
                <NavLink exact="true" to="/" className={active}>Main Page</NavLink>

                </li>
                <li>
                    <NavLink to="/categories" className={active}>Categories</NavLink>
                </li>
                <li>
                    <NavLink to="/all_products" className={active}>All products</NavLink>
                </li>
                <li>
                    <NavLink to="/all_sales" className={active}>All sales</NavLink>
                </li>
            </ul>
       
    )
}
