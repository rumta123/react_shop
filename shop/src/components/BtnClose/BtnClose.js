import React from 'react';
import styles from './BtnClose.module.css';
import { Link } from 'react-router-dom';

export default function BtnClose({ children, customStyles, customDivBtn, onClick }) {
  const linkStyles = {
    textDecoration: 'none', // Убираем подчеркивание
    color: 'inherit', // Наследуем цвет текста
    border: 'none', // Убираем границу
    background: 'none', // Убираем фон
    padding: 0, // Убираем внутренние отступы
    margin: 0, // Убираем внешние отступы
    font: 'inherit', // Наследуем шрифт
    cursor: 'pointer', // Задаем курсор как указатель
    ...customStyles // Применяем пользовательские стили
  };

  return (
    <div style={customDivBtn}>
      <Link to='' onClick={onClick} style={linkStyles}>
        {children}
      </Link>
    </div>
  );
}
