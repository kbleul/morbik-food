import  {useState , useEffect} from 'react'
import axios from 'axios'

const RecipePage = ({foodid}) => {

    const [recipedata, set_recipedata] = useState([]);
    const [recipetext, set_recipetext] = useState([]);
    const [ingredients , set_ingridients] = useState([]);
    const [ingredientamount , set_ingredientsamount] = useState([]);
    const [youtubeid, set_youtubeid ] = useState("");
    const [showvideo , set_showvideo] = useState(false);
  
  
    const getRecipe = async () => {
  
      try {
        const result = await axios(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodid}`)
  
        set_recipedata(result.data.meals)
        let temparr = result.data.meals[0].strInstructions.split("\n"); 
  
        set_recipetext(temparr);
        
        temparr= [];
       let temparr_two = [];
  
            for(let i=1; i<21 ; i++)
            { 
              let str = "strIngredient" + i;
              let str2 = "strMeasure" + i;
  
              if( result.data.meals[0][str] || result.data.meals[0][str] !== "" )  
              { temparr.push(result.data.meals[0][str])  
                temparr_two.push(result.data.meals[0][str2]) }
          
               if(result.data.meals[0][str] == null)
              {  temparr.pop();
                temparr_two.pop();  }
            }
  
            set_ingridients(temparr);
            set_ingredientsamount(temparr_two);
  
                 temparr =[];  temparr_two =[];
              
              temparr = result.data.meals[0].strYoutube.split("=");
  console.log(temparr)
              set_youtubeid(temparr[temparr.length-1]);
              temparr= [];
          
  
      }catch(e) { console.log(`Fetch recipe for ${foodid} failed !  ` + e)}
   
    }
  
    useEffect(() => {  getRecipe()  },[])
    useEffect(() => { console.log(ingredients)},[ingredients])
  
    return (<section>
      {
        recipedata.map(item => (
          <div key={`${item.strMeal} ${item.strMeal} ${item.idMeal}`}>
            <h4 key={item.strMeal}>{item.strMeal}</h4>
            <img key={item.strMealThumb} src={item.strMealThumb} alt={item.strMeal} width="300" height="315"/>
            { recipetext.map(steps => (steps !== "" &&  <p key={steps}> {steps}</p>   )) }
  
  
            { ingredientamount.length >0 && <div>{ ingredients.map(obj => (<p key={`${item.idMeal}${obj} ${item.idMeal}`}>-{ingredientamount[ingredients.indexOf(obj)] } {obj}</p>   )) }
          </div> }
  
          <button onClick={ () => set_showvideo(true) }>Watch Video</button>
  
          {
           (showvideo && youtubeid !== "" ) && <div>
            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${youtubeid}` } title="YouTube video player" frameborder="0"  allowFullScreen></iframe>
            </div>
          }
        
    
          </div>
   
        ))
      }
      </section>)
  }

export default RecipePage;
