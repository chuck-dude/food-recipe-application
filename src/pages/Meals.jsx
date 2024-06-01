
import { useLocation} from 'react-router-dom';
export default function Meals(){
    const location=useLocation();
    return(
    <div className="meal-card">
        <img src={location.image}/>
        <h1>{location.name}</h1>
        <h4>Area: {location.area}</h4>
        <h4>Category: {location.cat}</h4>
        <p>Instructions:{location.steps}</p>
    </div>
    );
}