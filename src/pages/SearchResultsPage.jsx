import { useState, useEffect } from "react";
import FoodCard from '../components/FoodCard'
import { useParams } from "react-router-dom";
import SearchBar from '../components/SearchBar';
import foodLoad from '../assets/foodLoad.gif';
function SearchResultsPage() {
    const params=useParams();
    const search=params.data;
    const [resData, setResData] = useState([]);
    const [isLoading,setIsLoading]= useState(true);
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
        
        setResData(newData);
        setIsLoading(false);
    }

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
                const data = await response.json();
                
                handleData(data.meals);
            } catch (err) {
                console.log("error", err);
                setIsLoading(false);
            }
        }
        handleFetch();
    }, [search]);

    return (!isLoading ?
            resData.length>0 
                ?    <>
                    <h1 className="header-food">Your results For : {search}</h1>
                    <SearchBar/>
                    <div className="food-container">
                        {resData.map((item) => (
                            <div key={item.itemid} className="food-item">
                                <FoodCard 
                                    key={item.itemid}
                                    id={item.itemid}
                                    name={item.itemname}
                                    image={item.itemimage}
                                    btnName={item.itemSource ? "Show Recipe page" : "Show Instructions"}
                                    path={`/items/${item.itemCat}/${item.itemid}`}
                                    source={item.itemSource}
                                    obj={{area: item.itemArea,
                                            name:item.itemname,
                                            image:item.itemimage,
                                            cat:item.itemCat,
                                            steps:item.itemSteps}}
                                    btnColor={item.itemSource ? "green" : "blue"}
                                    />
                            </div>
                        ))}
                    </div>
                </>
                :
                <>
                <SearchBar/>
                <h2>No Results for your Search :/</h2>
                </>
                
        :
        <>
        <div className="loading-indicator"><img src={foodLoad} alt="loading.."/></div>
        </>
    );
}

export default SearchResultsPage;