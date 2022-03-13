import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import list from "./food_subredditlist"
import list_drink from "./drinks_subredditlist"
import axios from 'axios'
import loading from './imgs/loading.gif'
import Footer from "./fotter"


const SubredditListPage = () => {

    const [reddit, setreddit] = useState([]);
    const [isfood, set_isfood] = useState(true);

    useEffect(() => {

        let temparr = [];
        let counter = 0;

        const fetchsubreddit = async (item) => {
            try {
                const result = await axios(`https://www.reddit.com/r/${item}/.json`);

                temparr.push(result.data.data.children[0].data);

         if(isfood) {
                if (temparr.length === 42) { setreddit(temparr); temparr = []; }
         } else { if (temparr.length === 19) { setreddit(temparr); temparr = []; }}

                counter++;

            } catch (e) { console.log("Fetch " + item + " failed." + e) }
 
    }
    for (let item of isfood ? list : list_drink) { fetchsubreddit(item);  }

    }, [isfood])


    return (<div className="mt-20">
        <div className="flex justify-center mb-8">
            <button className={isfood ? "font-black underline" : "font-light hover:bg-amber-200 px-4"} onClick={() => {setreddit([]); set_isfood(true)}}>Foods</button>
            <button className={isfood ? "ml-8 font-light hover:bg-amber-200 px-4" : "ml-8 font-black underline px-4" } onClick={() =>{setreddit([]); set_isfood(false)}}>Drinks</button>
        </div>
        <section>{ isfood ? <div>
            {reddit.length === 0 ? <div className="h-screen flex justify-center "><img src={loading} alt="loading" className="h-28" /> </div> :
                <div className="grid grid-cols-3 gap-3 text-center ">
                    {reddit.map(item => (<div className="w-3/4 ml-12 mb-8 border-2 border-black py-10 rounded-t-md rounded-r-full rounded-l-3xl hover:bg-yellow-100" key={`${item.subreddit_name_prefixed}${item.id}${item.permalink}`}>
                        <Link key={`${item.subreddit_name_prefixed}${item.id}`} to={`/reddit/${item.subreddit}`} >
                            <section key={item.permalink} className="">
                                <p key={item.subreddit}>{item.subreddit}</p>
                                <p key={item.subreddit_name_prefixed} className="font-mono text-2xl leading-8">{item.subreddit_name_prefixed}</p>
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
            {reddit.length === 0 ? <div className="h-screen flex justify-center"><img src={loading} alt="loading" className="h-28" /> </div> :
                <div className="grid grid-cols-3 gap-3 text-center">
                    {reddit.map(item => (<div className="w-3/4 ml-12 mb-8 border-2 border-black py-10 rounded-t-md rounded-r-full rounded-l-3xl hover:bg-yellow-100" key={`${item.subreddit_name_prefixed}${item.id}${item.permalink}`}>
                        <Link key={`${item.subreddit_name_prefixed}${item.id}`} to={`/reddit/${item.subreddit}`} >
                            <section key={item.permalink} className="">
                                <p key={item.subreddit}>{item.subreddit}</p>
                                <p key={item.subreddit_name_prefixed} className="font-mono text-2xl leading-8">{item.subreddit_name_prefixed}</p>
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