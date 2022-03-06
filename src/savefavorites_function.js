

const saveFavorites = (type , id) => {
    if(type === "food") {
    let foodfavs = localStorage.getItem("SavedFoods");

           if(!foodfavs) { localStorage.setItem("SavedFoods", [id]) }
           else{ 
        if(!localStorage.getItem("SavedFoods").split(",").includes(id) )
        {   localStorage.setItem("SavedFoods",[foodfavs,id])   }
           }
    }
     else if(type === "drink") {
         let drinkfavs = localStorage.getItem("SavedDrinks");

           if(!drinkfavs) { localStorage.setItem("SavedDrinks", [id]) }
           else{ 
        if(!localStorage.getItem("SavedDrinks").split(",").includes(id) )
        {   localStorage.setItem("SavedDrinks",[drinkfavs,id])   }
           }
     }
     else if(type === "reddit") {
         let redditfavs = localStorage.getItem("SavedSubReddits");

           if(!redditfavs) { localStorage.setItem("SavedSubReddits", [id]) }
           else{ 
        if(!localStorage.getItem("SavedSubReddits").split(",").includes(id) )
        {   localStorage.setItem("SavedSubReddits",[redditfavs,id])   }
           }
     }
  }

  export default saveFavorites;