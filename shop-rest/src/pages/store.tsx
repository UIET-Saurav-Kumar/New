import React, { useState } from 'react';

// const categories = ['Brand 1', 'Brand 2', 'Brand 3', 'Brand 4'];
const products = [
  { id: 1, name: 'Dark Fantasy Biscuits', brand: 'ITC', price: 40,category: 'staples',  imageUrl: 'https://5.imimg.com/data5/ANDROID/Default/2023/4/299190505/ZI/HT/YG/27272597/product-jpeg-500x500.jpg' },
   
  { id: 2, name: 'Sun Feast', brand: 'ITC', price: 20,category: 'confectionery' ,
  imageUrl: 'https://4.imimg.com/data4/MN/JG/GLADMIN-2/sunfeast-biscuits-250x250.jpg' },
  { id: 3, name: 'Mild Steel Hindustan Unilever Coffee Vending Machine', brand: 'HUL', price: 75000,category: 'spices', 
   imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2023/3/296516259/KX/JV/PM/11115686/hindustan-unilever-coffee-vending-machine-500x500.jpg' },
  { id: 4, name: 'Water Purfier', brand: 'HUL', price: 6000,category: 'biscuits',   imageUrl: 'https://5.imimg.com/data5/PM/OE/DG/SELLER-2802470/reverse-osmosis-water-purifiers-500x500.jpg' },
  { id: 5, name: 'Maggi', brand: 'Nestle', price: 20,category: 'snack foods',   imageUrl: 'https://5.imimg.com/data5/BU/DT/SZ/SELLER-5215417/maggi-2-minute-noodles-500x500.jpg' },
  { id: 6, name: 'Every Day Milk Powder', brand: 'Nestle', price: 30 ,category: 'snack foods', imageUrl: 'https://5.imimg.com/data5/OA/UP/NW/SELLER-9750859/nestle-everyday-milk-powder-500x500.jpg' },
  { id: 7, name: 'Nestle Kit Kat', brand: 'Nestle', price: 70 ,category: 'snack foods', imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2022/9/IF/RD/MY/16057523/nestle-kitkat-chocolate-500x500.jpg' },
  { id: 8, name: 'Dabur Honey', brand: 'Dabur', price: 40 ,category: 'snack foods', imageUrl: 'https://5.imimg.com/data5/NSDMERP/Default/2023/6/312636306/EU/EY/JG/25593090/honey-1685603936212-500x500.jpg' },
  { id: 9, name: 'Dabur Meshwak ToothPaste', brand: 'Dabur', price: 60 ,category: 'spices', imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2022/11/SP/SH/BA/74128670/meswak-toothpaste-500x500.jpg' },
  { id: 10, name: 'Dabur Amla Hair Oil', brand: 'Dabur', price: 140 ,category: 'snack foods', imageUrl: 'https://5.imimg.com/data5/CJ/QJ/QW/SELLER-22027437/12-500x500.jpg' },
  { id:11, name: 'Britannia Cake', brand: 'Britannia', price: 40 ,category: 'snack foods', imageUrl: 'https://5.imimg.com/data5/ANDROID/Default/2021/9/PR/DP/SG/27272597/product-jpeg-500x500.jpg' },
  { id: 12, name: 'Nice Time Biscuits', brand: 'Britannia', price: 50 ,category: 'confectionary', imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2023/6/314713209/LV/AT/YI/36394162/britannia-nice-time-biscuits-500x500.jpeg' },
  { id: 13, name: 'Baked Biscuits', brand: 'Britannia', price: 50 ,category: 'biscuits', imageUrl: 'https://5.imimg.com/data5/ANDROID/Default/2021/11/CZ/SF/FM/103143565/product-jpeg-500x500.jpg' },
  { id: 14, name: 'Marie Gold Biscuits', brand: 'Britannia', price: 50 ,category: 'snack foods', imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2021/2/XH/MF/EJ/111882436/britannia-marie-gold--500x500.jpeg' },
 ];

const categories = [
    { id: 1, name: 'ITC', subCategories: ['confectionery', 'biscuits', 'spices', 'snack foods','confectionary'],img:'/itc.png' },
    { id: 2, name: 'HUL', subCategories: ['staples', 'spices'],  img:'/hul.png' },
    { id: 3, name: 'Nestle',  subCategories: ['staples', 'spices'], img:'/nestle.jpeg' },
    { id: 4, name: 'Dabur', subCategories: ['staples', 'spices'], img:'/dabur.png' },
    { id: 5, name: 'Britannia',subCategories: ['staples', 'spices'],img:'/brit.png' },
  ];

  export default function CategoryProducts() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  
    const handleCategoryClick = (category) => {
      setSelectedCategory(category);
      setSelectedSubCategory(null);
    };
  
    const handleSubCategoryClick = (subCategory) => {
      setSelectedSubCategory(subCategory);
    };
  
    const displayedProducts = selectedCategory
      ? products.filter((product) => product.brand === selectedCategory && (!selectedSubCategory || product.category === selectedSubCategory))
      : products;
  
    return (
      <div className="p-4">
        <div className="flex space-x-4 overflow-x-auto pb-4 border-b border-gray-200 mb-4">
          <div
            className={`cursor-pointer py-2 px-4 flex flex-col justify-evenly w-full ${selectedCategory === null ? ' text-gray-900 font-bold underline text-2xl transition-all duration-200' : ''}`}
            onClick={() => handleCategoryClick(null)}
          >
            <p className="text-center text-2xl text-gray-800 font-semibold">All Products</p>
          </div>
          {categories?.map((category) => (
            <div
              key={category.name}
              className={`relative z-20 cursor-pointer py-2 px-4 flex flex-col justify-evenly w-full  ${
                selectedCategory === category.name ? ' text-gray-900 font-bold underline text-2xl border rounded transition-all duration-200' : ''
              } `}
              onClick={() => handleCategoryClick(category.name)}
            >
              <img src={category.img} className='w-28 h-28 mx-auto' />
              <p className={`text-center text-gray-800 font-semibold ${
                selectedCategory === category.name ? ' text-gray-900 font-bold underline text-2xl transition-all duration-200' : ''
              }`}> {category.name}</p>
  
              {/* {selectedCategory === category.name && category.subCategories.length > 0 &&
                <div className="bg-white shadow rounded mt-2 p-2">
                  {category.subCategories.map(subCategory => 
                    <p key={subCategory} 
                      className={`cursor-pointer ${selectedSubCategory === subCategory ? ' font-bold' : ''}`}
                      onClick={() => handleSubCategoryClick(subCategory)}
                    >
                      {subCategory}
                    </p>)}
                </div>
              } */}
            </div>
          ))}
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayedProducts.map((product) => (
            <div key={product.id} className="border shadow-350 rounded-lg p-4 max-w-sm">
              <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-contain mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
              <div className="text-gray-500 mb-3">₹{product.price}.00-/</div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    );
  }