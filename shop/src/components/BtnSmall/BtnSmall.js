import React from 'react'
import styles from './BtnSmall.module.css'
export default function BtnSmall({onClick, children, customStyles }) {
  return (
    <div>
        <button onClick={onClick} className={styles.myBtn} style={customStyles} >{children}</button>
    </div>
  )
}
