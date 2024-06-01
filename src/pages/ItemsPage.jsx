import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import FoodCard from '../components/FoodCard';
import { useParams } from 'react-router-dom';
import foodLoad from '../assets/foodLoad.gif';
function ItemsPage() {
    const params= useParams();
    const foodName = params.catName;
    const [isLoading, setIsLoading] = useState(true);
    const [itemsData, setItemsData] = useState([]);
    
    function handleData(data) {
        const newData = data.map(el => ({
            itemid: el.idMeal,
            itemname: el.strMeal,
            itemimage: el.strMealThumb,
            itemSteps: el.strInstructions,
            itemCat: el.strCategory,
            itemSource: el.strSource,
            itemArea:el.strArea
        }));
        
        setItemsData(newData);
        setIsLoading(false);
    }

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`);
                const data = await response.json();
                
                if (data.meals) {
                    handleData(data.meals);
                } else {
                    setIsLoading(false);
                }
            } catch (err) {
                console.log("error", err);
                setIsLoading(false);
            }
        };
        handleFetch();
    }, []);
    
    return (
        !isLoading
            ? itemsData.length>0 ?
                    <>
                        <SearchBar/>
                        <div>
                            {itemsData.map(item => (
                                <FoodCard 
                                    key={item.itemid}
                                    id={item.itemid}
                                    name={item.itemname}
                                    image={item.itemimage}
                                    btnName={item.itemSource ? "Show Recipe page" : "Show Instructions"}
                                    path={`/${foodName}/item`}
                                    source={item.itemSource}
                                    obj={{area: item.itemArea,
                                            name:item.itemname,
                                            image:item.itemimage,
                                            cat:item.itemCat,
                                            steps:item.itemSteps}}
                                    btnColor={item.itemSource ? "green" : "blue"}
                                />
                            ))}
                        </div>
                        </>
                        :
                        <h2>No Meal Data Found</h2>
            : <div className="loading-indicator"><img src={foodLoad} alt="My GIF" /></div>
    );
}

export default ItemsPage;
