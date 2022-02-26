
import React, {useState , useEffect} from 'react'
import axios from 'axios'
import loading from './imgs/loading.gif'

const Navigation = ({setnavChoice , set_choicetype , set_togglerecipe_page}) => {

    const [area_choiceresults, setarea_choiceresults] = useState([]);
    const [ingredient_choiceresults, setingredient_choiceresults] = useState([]);
    const [showarea_choiceresults, set_showarea_choiceresults] = useState(false);
    const [showingredient_choiceresults, set_showingredient_choiceresults] = useState(false);


    const getCatagories = async() => {
        try {
            const result_area = await axios(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
              setarea_choiceresults(result_area.data.meals);
              set_showarea_choiceresults(true);

            const result_ingredient = await axios(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);        
              setingredient_choiceresults(result_ingredient.data.meals);
              set_showingredient_choiceresults(true);

          }catch(e) { 
              console.log(`Fetch available areas list failed ${e} `)
                   }
  } 
  useEffect(() => { getCatagories(); },[])  
    

  //splits the single string and addes underscore between them for api call
  //Eg Apple Cidar => Apple_Cidar
 const appendUnderscore = (ingredient) => {
     let temp_ingredientarr = ingredient.split(" ");
    let newingredient_str = "";
    temp_ingredientarr.forEach(item => {
            if(temp_ingredientarr.indexOf(item) !== 0)  { newingredient_str += `_${item}`}
            else { newingredient_str += item }
        })

        setnavChoice(newingredient_str); 
 }


  return (
    <section>
        <div>
        <p>Search by :</p>
            <h3>Areas</h3>
            {!showarea_choiceresults ? <img src={loading} alt="loading" />  :
             <div>
                {area_choiceresults.map(item => (
                    <button onClick={() =>{ set_togglerecipe_page(false); setnavChoice(item.strArea); set_choicetype("a")}} 
                    key={item.strArea}>{item.strArea}</button>
                ))}
            </div>}
            <h3>Ingredients</h3>
            {!showingredient_choiceresults ? <img src={loading} alt="loading" />  :
            <div>
               {ingredient_choiceresults.map(item => (
                   <button onClick={() =>{ set_togglerecipe_page(false); appendUnderscore(item.strIngredient); set_choicetype("i")}} 
                   key={item.strIngredient}>{item.strIngredient}</button>
               ))}
           </div>}
        </div>
      
    </section>
  )
}

export default Navigation