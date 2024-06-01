import { useState, useEffect } from "react";
import FoodCard from '../components/FoodCard'
import SearchBar from "../components/SearchBar";
import foodLoad from '../assets/foodLoad.gif';
function HomePage() {
    const [catData, setCatData] = useState([]);
    const [isLoading,setIsLoading]= useState(true);
    function handleData(data) {
        const newData = data.map(el => ({
            catid: el.idCategory,
            catname: el.strCategory,
            catimage: el.strCategoryThumb,
            catdesc: el.strCategoryDescription,
        }));
        
        setCatData(newData);
        setIsLoading(false);
    }

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
                const data = await response.json();
                
                handleData(data.categories);
            } catch (err) {
                console.log("error", err);
                setIsLoading(false);
            }
        }
        handleFetch();
    }, []);

    return (!isLoading ?
        <>
            <h1 className="header-food">Food items Page</h1>
            <SearchBar/>
            
            <div className="food-container">
                {catData.map((cat) => (
                    <div key={cat.catid} className="food-item">
                        <FoodCard name={cat.catname} image={cat.catimage} btnName={"Select"} path={`/${cat.catname}`}/>
                       
                    </div>
                ))}
            </div>
        </> :
        <>
        <div className="loading-indicator"><img src={foodLoad} alt="loading..." /> </div>
        </>
    );
}

export default HomePage;