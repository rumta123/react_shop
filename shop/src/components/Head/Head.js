import React from 'react'
import styles from './Head.module.css'
import Btn from '../Btn/Btn'
export default function Head() {
  const additionalBtnStyles = {
   
    position: 'relative', // или 'absolute', в зависимости от вашего контекста
    top: 394,
    left:40,
  };
  const Div1={
    display:'flex',
  }
  return (
    <div className={styles.back} >
        {/* <h1> Amazing Discounts on Garden Products!</h1> */}
    <div>
    <Btn customDivBtn={Div1} customStyles={additionalBtnStyles } >Check out</Btn>
    </div>
    
    </div>
  )
}
