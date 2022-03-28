import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import list from "./food_subredditlist"
import list_drink from "./drinks_subredditlist"
import axios from 'axios'
import loading from './imgs/loading_.gif'
import Footer from "./fotter"

const SubredditListPage = () => {

    const [reddit, setreddit] = useState([]);
    const [isfood, set_isfood] = useState(true);
 
    useEffect(() => {

        let temparr = [];

        const fetchsubreddit = async (item) => {
            try {
                const result = await axios(`https://www.reddit.com/r/${item}/.json`);

                temparr.push(result.data.data.children[0].data);

         if(isfood) {
                if (temparr.length === 42) { setreddit(temparr); temparr = []; }
         } else { if (temparr.length === 19) { setreddit(temparr); temparr = []; }}


            } catch (e) { console.log("Fetch " + item + " failed." + e) }
 
    }
    for (let item of isfood ? list : list_drink) { fetchsubreddit(item);  }

    }, [isfood])


    return (<div className="mt-8 md:mt-16">
        <div className="flex justify-center mb-8 md:mb-8">
            <button className={isfood ? "foodbtn-clicked" : "foodbtn"} onClick={() => {setreddit([]); set_isfood(true)}}>Foods</button>
            <button className={isfood ? "drinkbtn-clicked" : "drinkbtn" } onClick={() =>{setreddit([]); set_isfood(false)}}>Drinks</button>
        </div>
        <section>{ isfood ? <div>
            {reddit.length === 0 ? <div className="subredditlist_container"><img src={loading} alt="loading" className="w-12 h-12" /> </div> :
                <div className="subredditlist_subcontainer ">
                    {reddit.map(item => (<div className="subredditlist_container-secondary" key={`${item.subreddit_name_prefixed}${item.id}${item.permalink}`}>
                        <Link key={`${item.subreddit_name_prefixed}${item.id}`} to={`/reddit/${item.subreddit}`} >
                            <section key={item.permalink} className="">
                                <p key={item.subreddit}>{item.subreddit}</p>
                                <p key={item.subreddit_name_prefixed} className="subredditlist_prefix-p">{item.subreddit_name_prefixed}</p>
                                <p className="text-gray-400" key={item.subreddit_type}>{item.subreddit_type}</p>
                                <p key={item.id} className="">Subscribers - {item.subreddit_subscribers}</p>

                            </section>
                        </Link>
                    </div>
                    ))
                    }
                </div>
            }</div> :
            <div>
            {reddit.length === 0 ? <div className="subredditlist_container"><img src={loading} alt="loading" className="w-12 h-12" /> </div> :
                <div className="subredditlist_subcontainer">
                    {reddit.map(item => (<div className="subredditlist_container-secondary" key={`${item.subreddit_name_prefixed}${item.id}${item.permalink}`}>
                        <Link key={`${item.subreddit_name_prefixed}${item.id}`} to={`/reddit/${item.subreddit}`} >
                            <section key={item.permalink} className="">
                                <p key={item.subreddit}>{item.subreddit}</p>
                                <p key={item.subreddit_name_prefixed} className="subredditlist_prefix-p">{item.subreddit_name_prefixed}</p>
                                <p key={item.subreddit_type}>{item.subreddit_type}</p>
                                <p key={item.id} className="text-gray-400">Subscribers - {item.subreddit_subscribers}</p>

                            </section>
                        </Link>
                    </div>
                    ))
                    }
                </div>
            }</div>
        }
        </section>

        <div className="">
        <Footer />
      </div>
    </div>)

};



export default SubredditListPage