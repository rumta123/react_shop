import React from 'react';
import styles from  './Map.module.css'; // Импортируем файл стилей для дополнительной информации и позиционирования

export default function MapWithInfo() {
    return (
        <div >
            {/* Контейнер для дополнительной информации */}
         

            {/* Контейнер для вставки карты */}
            <div className={styles.mapSize}>
                <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1606433.356620493!2d36.43007099193674!3d56.215981030971804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54b22a91ac945%3A0xf19f72681321ff46!2sIThub%20college!5e0!3m2!1sru!2sde!4v1707243644777!5m2!1sru!2sde"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
}
