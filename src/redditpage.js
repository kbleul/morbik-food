import React from 'react'
import { Outlet } from "react-router-dom"


const RedditPage = () => {
  return (<div className=" dark:text-white dark:bg-gray-800">
  <Outlet />
  </div>)
}

export default RedditPage