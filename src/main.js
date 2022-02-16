import React , {useState , useEffect} from 'react'
import axios from 'axios'
import RecipePage from './recipepage'

const Main = ({nav_selectedCatagory}) => {
  const [catagories, set_catagories] = useState([]);
  const [frontfood_list, set_frontfood_list] = useState([]);
  const [currentcatagory, set_currentcatagory] = useState("Beef");
  const [showrecipe_page , set_showrecipe_page] = useState(false);
  const [recipefor , set_recipefor] = useState("");

  const getCatagories = async () => {
     try {
    const result = await axios(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`);
    set_catagories(result.data.meals)

     }catch(e) { console.log("Fetch catagory failed ! " + e)}
  }

  const getFoods_list = async () => {
    try {
      const result = await axios(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${currentcatagory}`)
      set_frontfood_list(result.data.meals)

        
    }catch(e) { console.log(`Fetch ${currentcatagory} based foods failed !  ` + e)}

  }


  useEffect(() => {  getCatagories();  },[])

  useEffect(() => { getFoods_list(); },[currentcatagory])

  return (
    <article>
       <section>
        {
          catagories.map(item => (
            <button key={item.strCategory} onClick={() =>{ set_currentcatagory(item.strCategory); set_showrecipe_page(false); }}>{item.strCategory}</button>
          ))
        }
        </section>

  { showrecipe_page ? <RecipePage foodid={recipefor} similarfoods= {frontfood_list} /> :
     <section className="grid grid-cols-3 gap-2">
         {
           frontfood_list.map(item => (
             <div key={item.idMeal} onClick={() => { set_recipefor(item.idMeal); set_showrecipe_page(true);}}>
             <img key={item.strMealThumb} src={item.strMealThumb} alt={item.strMeal} />
             <p key={item.strMeal}>{item.strMeal}</p>

             </div>
           ))
         }
        </section>}
    </article>
  )
}


export default Main

