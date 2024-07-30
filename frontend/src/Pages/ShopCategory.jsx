import React, { useContext, useState } from 'react';
import './Css/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';


export const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [sortedProducts, setSortedProducts] = useState(all_product);
  const [sortBy, setSortBy] = useState('default');

  const handleSortChange = (event) => {
    const selectedSortBy = event.target.value;
    let sortedProductsCopy = [...all_product];

    switch (selectedSortBy) {
      case 'nameAsc':
        sortedProductsCopy.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        sortedProductsCopy.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'priceAsc':
        sortedProductsCopy.sort((a, b) => a.new_price - b.new_price);
        break;
      case 'priceDesc':
        sortedProductsCopy.sort((a, b) => b.new_price - a.new_price);
        break;
      default:
        // No sorting, keep the default order
        break;
    }

    // Update the sorted products state
    setSortedProducts(sortedProductsCopy);
    setSortBy(selectedSortBy); // Update the sortBy state with the selected sorting option
  };

  return (
    <div className='shop-category'>
      <div className='shopcategoty-indexsort'>
        
        <div className='shopcategory-sort'>
          Sort by{' '}
          <select value={sortBy} onChange={handleSortChange}>
            <option value='default'>Default</option>
            <option value='nameAsc'>Name (A-Z)</option>
            <option value='nameDesc'>Name (Z-A)</option>
            <option value='priceAsc'>Price (Low to High)</option>
            <option value='priceDesc'>Price (High to Low)</option>
          </select>
        </div>
      </div>
      <div className='shopcategory-products'>
        {sortedProducts.map((item, i) => {
          if (props.category === item.category) {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
        Load more
      </div>
    </div>
  );
};
