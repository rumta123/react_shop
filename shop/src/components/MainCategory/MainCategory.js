import React, { useState, useEffect } from 'react';
import styles from './MainCategory.module.css';
import BtnSmall from '../BtnSmall/BtnSmall';
import { NavLink } from 'react-router-dom';
import { API_URL } from '../../constants'; // Импортируем константу
import { useDispatch } from 'react-redux'; // Импортируем useDispatch
import { selectCategory } from '../../store/actions'; // Импортируем действие selectCategory

export default function Categories({ categoryId, ulStyle, showAllProp, imageSize, imageSizeH, showLineProps }) {
  const [categories, setCategories] = useState([]);
  const [showAll, setShowAll] = useState(showAllProp);
  const [showLine, setShowLine] = useState(showLineProps);
  const dispatch = useDispatch(); // Получаем dispatch из react-redux
  const handleClick = (categoryId) => {
    // При нажатии на категорию диспетчеризуем действие selectCategory с id категории
    dispatch(selectCategory(categoryId));
  }; 
  useEffect(() => {
    fetch(`${API_URL}/categories/all`)
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleShowAllClick = () => {
    setShowAll(true);
    setShowLine(false);
  };

  return (
    <div>
      <div className={styles.Category4}>
        <h2>Categories {categoryId}</h2>
        <div className={showLine ? styles.Line : styles.LineHidden}></div>
        {!showAll && categories.length > 4 && (
          <BtnSmall onClick={handleShowAllClick}>
            All categories
          </BtnSmall>
        )}
      </div>
      <ul  className={ulStyle}>
        {categories.map(category => (
          <li key={category.id} onClick={() => handleClick(category.id)}> {/* Передаем categoryId в handleClick */}
            <NavLink to={`/categories/${category.id}`}>
            <img className={styles.myImg} style={{ width: imageSize, height: imageSizeH }} src={`${API_URL}${category.image}`} alt={category.title} />
            </NavLink>
            <p>{category.title}</p>
          </li>
        )).slice(0, showAll ? categories.length : 4)}
      </ul>
    </div>
  );
}