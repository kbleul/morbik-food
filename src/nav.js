
import React, {useState} from 'react'
import axios from 'axios'

const Navigation = ({setnavChoice}) => {

    const [choiceresults, set_choiceresults] = useState([]);
    const [show_choiceresults, setshow_choiceresults] = useState(false);

    const getCatagories = async(choice) => {
          try {
              const result = await axios(`https://www.themealdb.com/api/json/v1/1/list.php?${choice}`);
                set_choiceresults(result.data.meals);
                setshow_choiceresults(true);
            }catch(e) { 
                console.log(choice[0]=== "a" ? `Fetch available areas list failed ${e}` : 
            `Fetch available ingredients list failed ${e}`)
                     }
    } 
    const showMoreCatagories = (choice) => {

        const choices = {
            "byArea" :() =>  { getCatagories("a=list"); } ,
            "byIngredient" : () =>  { getCatagories("i=list"); } 
        } 

        return choices[choice]?.();
    }
  return (
    <section>
        <div>
        <p>Search by :</p>
            <button onClick={() => showMoreCatagories("byArea")}>Areas</button>
            <button onClick={() => showMoreCatagories("byIngredient")}>Ingredients</button>
        </div>
       {show_choiceresults && <div>
            {choiceresults.map(item => (
                <button onClick={() => setnavChoice(item.strIngredient ? item.strIngredient : item.strArea)} 
                key={item.strIngredient ? item.strIngredient : item.strArea}>{item.strIngredient ? item.strIngredient : item.strArea}</button>
            ))}
        </div>}
    </section>
  )
}

export default Navigation