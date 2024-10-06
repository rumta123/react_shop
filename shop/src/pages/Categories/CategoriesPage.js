import React, { useState } from 'react';
import Categories from '../../components/Categories/Categories';
import styles from './CategoriesPage.module.css'
export default function CategoriesPage() {
  const [showAll, setShowAll] = useState(true);
  const [showLine, setShowLine] = useState(false);

  return (
    
    <div>
      <Categories ulStyle={styles.myCategory} showLineProp={showLine} showAllProp={showAll} showLineProps={showLine} imageSize="248px" imageSizeH="350px" gapSize="20px"/>
    </div>
  );
}