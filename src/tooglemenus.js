

export const tooglemain_menu = () => {
    let tooglebtn = document.querySelector("#topnav");
       if(tooglebtn.classList.contains("hidden"))
         { 
           tooglebtn.classList.remove("hidden") 
           document.querySelector("#dropdown_svg").classList.add("hidden")
           document.querySelector("#dropdown_upsvg").classList.remove("hidden")
         }
        else { 
          document.querySelector("#dropdown_svg").classList.remove("hidden")
          document.querySelector("#dropdown_upsvg").classList.add("hidden")
          tooglebtn.classList.add("hidden") 
        }
}

export const toogleside_menu = () => {
  let tooglebtn = document.querySelector("#sidenav");

    if(tooglebtn.classList.contains("hidden"))
    { tooglebtn.classList.remove("hidden") }
    else {  tooglebtn.classList.add("hidden")  }

}