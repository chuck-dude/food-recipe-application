import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';
function FoodCard({name,image,desc="",id="",btnName,path,source,obj,btnColor="green"}){
    const styles={
        display: "inline-block",
        padding: "10px 10px",
        fontSize: "16px",
        fontFamily: "Arial, sans-serif",
        color: "#fff",
        backgroundColor: btnColor == "green" ? "green" : "blue",
        border: "none",
        borderRadius: "5px",
        cursor: /*btnColor =="green" ? "pointer": "not-allowed" */"pointer",
        transition: "background-color 0.3s ease",
    }
    const navigate = useNavigate();
    function handleClick(path){
        if(source!=null){
            window.open(source);
        }
        else{
            navigate(path,{ state: obj });
        }
    }
    return(
        <div className="card">
            <img className="card-img" src={image} alt="image"></img>
            <h2 className="card-title">{name}</h2>
            <p>
                {desc}
            </p>
            
                <button onClick={()=>handleClick(path)} 
                       /*  disabled={btnName=="Show Instructions" ? true : false} */
                        style={styles}>
                    {btnName}
                </button>
            
        </div>
        
    )
}
FoodCard.propTypes={
    name:PropTypes.string,
    image:PropTypes.string,
    desc:PropTypes.string
}
export default FoodCard;