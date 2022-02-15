import React , {useState , useEffect} from 'react'
import axios from 'axios'

const Main = () => {
  const [catagories, set_catagories] = useState([]);

  const getCatagories = async () => {
     try {
    const result = await axios(`https://www.reddit.com/r/TrueFilm/.json`);
    const result_two = await axios(`www.themealdb.com/api/json/v1/1/list.php?c=list`);


    console.log("result")
      console.log( result.data)
      console.log("result_two")
      console.log( result_two.data)

    
     }catch(e) { console.log("error")}
  }

  useEffect(() => {
    getCatagories();
    
  },[])
  return (
    <article>
        
    </article>
  )
}

export default Main