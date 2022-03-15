import React, { useEffect , useContext } from 'react'
import { Outlet } from "react-router-dom"
import location_context from "./locationcontext"



const RedditPage = () => {
  const whereami_arr = useContext(location_context);

  useEffect(() => {

    whereami_arr[1]("Reddit")

    return () => { whereami_arr[1]("Home") };

  }, []);

  return (<div className=" dark:text-white dark:bg-gray-800">
    <Outlet />
  </div>)
}

export default RedditPage