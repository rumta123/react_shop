import React from 'react';
import styles from './ContactInfo.module.css';

function ContactInfo({ label, Description, icons }) {
    return (
        <div className={styles.block}>
            <span className={styles.label}>{label}</span>
            {label === 'Phone' ? (
                <a className={styles.description} href={`tel:${Description}`}>{Description}</a>
            ) : (
                <span className={styles.description}>{Description}</span>
            )}
            
            <div className={styles.icons}>
                {icons && icons.map((icon, index) => (
                    <a key={index} href={icon.link} className={styles.iconLink}>
                        <img src={icon.src} alt="icon" className={styles.icon} />
                    </a>
                ))}
            </div>
        </div>
    );
}

export default ContactInfo;
