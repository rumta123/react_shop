import React from 'react'
import styles from './Btn.module.css'
import { Link } from 'react-router-dom'
export default function Btn({ children,  customStyles, customDivBtn, onClick  }) {
  return (
    <div style={customDivBtn} >
   
        <Link  style={customStyles} className={styles.btn}  to='' onClick={onClick}>
        {children}
        </Link>
    </div>
  )
}
