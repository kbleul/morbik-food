import React , {useState , useEffect} from 'react'
import axios from 'axios'
import RecipePage from './recipepage'

const Main = ({navChoice,setChoice, choicetype , set_choicetype, togglerecipe_page, set_togglerecipe_page}) => {
  const [catagories, set_catagories] = useState([]);
  const [frontfood_list, set_frontfood_list] = useState([]);
 // [currentcatagory, set_currentcatagory] = useState("Beef");
  
  const [recipefor , set_recipefor] = useState("");

  const getCatagories = async () => {
     try {
    const result = await axios(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`);
    set_catagories(result.data.meals)

     }catch(e) { console.log("Fetch catagory failed ! " + e)}
  }

  const getFoods_list = async () => {
    try {
      if(choicetype === "c"){
      const result = await axios(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${navChoice}`)
        if( result.data.meals== null  ) {  set_frontfood_list(["No Food Found Error"])}
       else { set_frontfood_list(result.data.meals)}

      }
      else if(choicetype === "a") {
      const result = await axios(`https://www.themealdb.com/api/json/v1/1/f ilter.php?a=${navChoice}`)
      if( result.data.meals == null  ) { set_frontfood_list([{"idMeal" : "No Food Found Error"}]) }
      else { set_frontfood_list(result.data.meals)}

      }
      else { 
      const result = await axios(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${navChoice}`)
      if( result.data.meals == null  ) {  set_frontfood_list(["No Food Found Error"]) }
      else { set_frontfood_list(result.data.meals) }

      }
        
    }catch(e) { console.log(`Fetch ${navChoice} based foods failed !  ` + e)}

  }


  useEffect(() => {  getCatagories();  },[])

  useEffect(() => { getFoods_list(); },[navChoice ])

  return (
    <article>
       <section>
        {
          catagories.map(item => (
            <button key={item.strCategory} onClick={() =>{ set_choicetype("c"); setChoice(item.strCategory); set_togglerecipe_page(false); }}>{item.strCategory}</button>
          ))
        }
        </section>

  { togglerecipe_page ? <RecipePage foodid={recipefor} similarfoods= {frontfood_list} /> :
     <section className="grid grid-cols-3 gap-2">
         { frontfood_list[0] === "No Food Found Error" ? <div><p>No available food for this ingrident.</p></div> :
           frontfood_list.map(item => (
             <div key={item.idMeal} onClick={() => { set_recipefor(item.idMeal); set_togglerecipe_page(true);}}>
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

