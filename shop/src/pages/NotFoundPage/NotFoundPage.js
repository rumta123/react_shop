import React from 'react';

import styles from './NotFoundPage.module.css';
import img404 from '../../img/404.png'
import Btn from '../../components/Btn/Btn'
export default function NotFoundPage() {
    const Btn404 = {
        position:'relative',
        top:32,
       marginBottom:50

    }
  
    return (
        <div>
            <div className={styles.block404}>
                <span className={styles.e404}>4<img className={styles.img404} src={img404} />4</span>
                <h2 className={styles.h2_404}>Page Not Found</h2>
                <p>We’re sorry, the page you requested could not be found.<br />
                    Please go back to the homepage.</p>
                {/* <Btn customDivBtn={Btn404} customStyles={additionalBtnStyles}   >123</Btn> */}

            </div>
            <Btn customDivBtn={Btn404} >Go Home</Btn>
        </div>
    )
}
