import React from 'react'
import { Outlet } from "react-router-dom"

import Footer from "./fotter"

const RedditPage = () => {
  return (<div className="mt-8">
  <h2>Food related subreddits </h2>

  <Outlet />
    <main className="">
    </main>


    <div className="">
      <Footer />
    </div>
  </div>)
}

export default RedditPage