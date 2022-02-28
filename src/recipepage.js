import  {useState , useEffect} from 'react'
import axios from 'axios'
import loading from './imgs/loading.gif'


const RecipePage = ({foodid , similarfoods}) => {

    const [currentfood_id, set_currentfood_id] = useState(foodid)
    const [recipedata, set_recipedata] = useState([]);
    const [recipetext, set_recipetext] = useState([]);
    const [ingredients , set_ingridients] = useState([]);
    const [ingredientamount , set_ingredientsamount] = useState([]);
    const [youtubeid, set_youtubeid ] = useState("");
    const [showvideo , set_showvideo] = useState(false);
  
    const getRecipe = async () => {
  
      try {
        const result = await axios(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${currentfood_id}`)
  
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

              set_youtubeid(temparr[temparr.length-1]);
              temparr= [];
          
  
      }catch(e) { console.log(`Fetch recipe for ${foodid} failed !  ` + e)}
   
    }
  
    useEffect(() => {  getRecipe()  },[currentfood_id])
  
    return (<section>
      {recipedata.length === 0 ? <img src={loading} alt="loading" /> :
      <div className="mt-16">
      {
        recipedata.map(item => (
          <div key={`${item.strMeal} ${item.strMeal} ${item.idMeal}`}>
          <section className="flex flex-row justify-between items-center">
            <div>
            <img key={item.strMealThumb} src={item.strMealThumb} alt={item.strMeal}  object-fit="cover" width="500" height="315"/>
            <h4 key={item.strMeal}>{item.strMeal}</h4>
             </div>

          {!showvideo && <button onClick={ () => set_showvideo(true) }>Watch Video</button>}
  
          {
           (showvideo && youtubeid !== "" ) && <div>
            <iframe width="440" height="425" src={`https://www.youtube.com/embed/${youtubeid}` } title="YouTube video player" frameborder="0"  allowFullScreen></iframe>
            <button>Hide Vidio</button>
            </div>
          }
          
          </section>

          <section className="flex flex-row">

          { ingredientamount.length >0 && <div className="w-1/4">{ ingredients.map(obj => (<p key={`${item.idMeal}${obj} ${item.idMeal}`}>-{ingredientamount[ingredients.indexOf(obj)] } {obj}</p>   )) }
          </div> }

            <div className="w-3/4 border-l-2 border-l-green-700 pl-8">
            { recipetext.map(steps => (steps !== "" &&  <p key={steps}> {steps}</p>   )) }
            </div>
  
            
          </section>
        
    
          </div>
   
        ))
      } </div>}

          <div className="flex flex-row  overflow-x-scroll w-full ">
    
      {  similarfoods.map(item => ( <div className="w-full " onClick={() => set_currentfood_id(item.idMeal)} key={`${item.idMeal}${item.strMealThumb}${item.strMeal}`}>
        {
         (recipedata[0] !== undefined && recipedata[0].strMeal !== item.strMeal ) &&  <div key={`${item.strMealThumb}${item.strMeal}`} >
        <img key={item.strMealThumb} src={item.strMealThumb} alt={item.strMeal} width="100" height="150" />
        <p key={item.strMeal}>{item.strMeal}</p>
        </div>  
        }
                    </div>
        )
        )}
        </div>
      </section>)
  }

export default RecipePage;
