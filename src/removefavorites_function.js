

 const removeFavorite = (type , id) => {

    if(type === "food") { console.log(id)
    let temparr = localStorage.getItem("SavedFoods").split(",");
         temparr.splice(temparr.indexOf(id),1 );
         
        localStorage.setItem("SavedFoods", temparr);
      }
      else if(type === "drink") {
      let temparr = localStorage.getItem("SavedDrinks").split(",");
           temparr.splice(temparr.indexOf(id),1 );
           
          localStorage.setItem("SavedDrinks", temparr);
        }
        else if(type === "reddit") {
      let temparr = localStorage.getItem("SavedSubReddits").split(",");
           temparr.splice(temparr.indexOf(id),1 );
           
          localStorage.setItem("SavedSubReddits", temparr);
        }
  }
 
  export default removeFavorite;