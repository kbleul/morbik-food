import React from 'react'
import SubredditListPage from './subredditlistpage'
import Footer from "./fotter"

const RedditPage = () => {
  return (<div className="">
    <main className="">
      <SubredditListPage />
    </main>


    <div className="">
      <Footer />
    </div>
  </div>)
}

export default RedditPage