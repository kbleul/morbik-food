import React , {useState , useEffect , createContext } from 'react'

  const getInitialTheme = () => {
      if(typeof window !== 'undefined' && window.localStorage){
          const storedprefs = window.localStorage.getItem("color-theme");

        if(typeof storedprefs === "string")  { return storedprefs; }

        const userMedia = window.matchMedia('(prefers-color-scheme:dark)');

          if(userMedia.matches) { return 'dark'; }
      }

      return 'light'

  }

  export const ThemeContext = createContext();
  export const ThemeProvider = ({ initialTheme , children}) => {
      const [theme, set_theme] = useState(getInitialTheme);

       const rawSetTheme = (rawTheme) => {
         const root = window.document.documentElement;
         const isDark = rawTheme === 'dark';
         console.log(root)

          root.classList.remove(isDark ? "light" : "dark");
          root.classList.add(isDark ? "dark" : "light");

          localStorage.setItem('color-theme', rawTheme);
       };

       if(initialTheme) { rawSetTheme(initialTheme) }

       useEffect(() => { 
         rawSetTheme(theme)
         console.log(theme)
       },[theme])
      
       return(
         <ThemeContext.Provider value={{ theme , set_theme}} >{children}</ThemeContext.Provider>
       );
  }