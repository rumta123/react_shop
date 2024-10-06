import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import { API_URL } from '../../constants';
import BtnSmall from '../BtnSmall/BtnSmall';
import styles from './Categories.module.css';
import ProductCard from '../ProductCard/ProductCard';
import ProductFilters from '../ProductFilters/ProductFilters';
import { addToCart } from '../../store/actions';
export default function Categories({ showLineProp, showAllProp, imageSize, imageSizeH, gapSize }) {
  const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState(null);
  const { categoryId } = useParams();
  const [showAll, setShowAll] = useState(showAllProp); // Default to false
  const [showLine, setShowLine] = useState(showLineProp);
  const location = useLocation();


  const [fromPrice, setFromPrice] = useState('');
  const [toPrice, setToPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('Default'); // Default sort order by price
  const [showDiscountOnly, setShowDiscountOnly] = useState(false);
  const [applySorting, setApplySorting] = useState(true);

  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();
//   const addToCart = (selectedProduct) => {
//     // Здесь вы можете выполнить операции по добавлению товара в корзину
//      console.log('Adding to cart:', selectedProduct);
//     // Дополнительные операции добавления в корзину...
// };

const handleAddToCart = (product) => {
  dispatch(addToCart(product)); // Добавление товара в корзину через Redux
  // console.log('111Adding to cart:', product);
};
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/categories/all`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error('Failed to fetch categories:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategoryData = async (categoryId) => {
      try {
        const response = await fetch(`${API_URL}/categories/${categoryId}`);
        if (response.ok) {
          const data = await response.json();
          setCategoryData(data);
        } else {
          console.error(`Failed to fetch category ${categoryId}:`, response.statusText);
        }
      } catch (error) {
        console.error(`Error fetching category ${categoryId}:`, error);
      }
    };

    if (categoryId) {
      fetchCategoryData(categoryId);
    }
  }, [categoryId]);

  const filterProducts = (product) => {
    const productPrice = product.price;
    const hasDiscount = product.discont_price !== null;

    return (
      (!fromPrice || productPrice >= parseFloat(fromPrice)) &&
      (!toPrice || productPrice <= parseFloat(toPrice)) &&
      (!showDiscountOnly || hasDiscount)
    );
  };

  const sortProducts = (a, b) => {
    if (sortOrder === 'price') {
      return a.price - b.price;
    } else if (sortOrder === 'price-desc') {
      return b.price - a.price;
    }
    return 0;
  };

  const renderCategories = () => {
    const isSubcategoryView = location.pathname.includes('/categories/');
    if (isSubcategoryView) {
      return null;
    }

    const displayedCategories = showAll ? categories : categories.slice(0, 4);

   
    return (
      <ul className={styles.myCategory} style={{ gap: gapSize }}>
        {displayedCategories.map(category => (
          <li key={category.id}>
            <NavLink to={`/categories/${category.id}`}>
              <img className={styles.myImg} style={{ width: imageSize, height: imageSizeH }} src={`${API_URL}${category.image}`}  alt={category.title} />
              <p>{category.title}</p>
            </NavLink>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      {!location.pathname.includes('/categories/') && (
        <div>
          <div className={styles.Category4}>
            <h2>All Categories</h2>
            <div className={showLine ? styles.Line : styles.LineHidden}></div>
            {!showAll && categories.length > 4 && (
                     <BtnSmall onClick={() => {
                      setShowAll(true);
                      setShowLine(false); // Установка showLine в false при нажатии на кнопку
                  }}>
                      All categories
                  </BtnSmall>
            )}
          </div>
          
            {renderCategories()}
     
        </div>
      )}

{location.pathname === `/categories/${categoryId}` && categoryData && categoryData.category ? (
  <div>
    <h2>{categoryData.category.title}</h2>
    <ProductFilters
      fromPrice={fromPrice}
      toPrice={toPrice}
      showDiscountOnly={showDiscountOnly}
      sortOrder={sortOrder}
      setFromPrice={setFromPrice}
      setToPrice={setToPrice}
      setShowDiscountOnly={setShowDiscountOnly}
      setSortOrder={setSortOrder}
      setApplySorting={setApplySorting}
    />
    <div className={styles.products}>
      {categoryData.data
        .filter(filterProducts)
        .sort(sortProducts)
        .map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            API_URL={API_URL}
            addToCart={() => handleAddToCart(product)}
            showAddToCartButton={true}
          />
        ))}
    </div>
  </div>
) : (
  <div>
    <h2>Category Not Found</h2>
    {/* Дополнительные действия или компоненты для отображения ошибки */}
  </div>
)}

    </div>
  );
}
