import  {useState , useEffect} from 'react'
import {Link} from "react-router-dom"
import list from "./food_subredditlist"
import axios from 'axios'
import loading from './imgs/loading.gif'

const SubredditListPage = () => {
   
    const [reddit, setreddit] = useState([]);

    useEffect(() => {

        let temparr = [];
        let counter = 0;

        const fetchsubreddit = async (item) => {

            try {
            const result = await axios(`https://www.reddit.com/r/${item}/.json`);

            temparr.push(result.data.data.children[0].data);

            if (temparr.length === 41) { setreddit(temparr); temparr = []; }
                counter++;

            } catch(e) { console.log("Fetch " + item + " failed." + e) }

        }

        for (let item of list) { fetchsubreddit(item); }

    }, [])


    return (<div className="">
    <div>
        <button>Foods</button>
        <button>Drinks</button>
    </div>
    {reddit.length === 0 ? <div className="flex item-center"><img src={loading} alt="loading" className="loadingimg" /> </div>:
            <div className="grid grid-cols-5 gap-3">
                   { reddit.map(item => (<div key={`${item.subreddit_name_prefixed}${item.id}${item.permalink}`}>
                       <Link key={`${item.subreddit_name_prefixed}${item.id}`} to={`/reddit/${item.subreddit}`} >
                       <section key={item.permalink} className="">
                        <p key={item.subreddit}>{item.subreddit}</p>
                        <p key={item.subreddit_name_prefixed} className="">{item.subreddit_name_prefixed}</p>
                        <p key={item.subreddit_type}>{item.subreddit_type}</p>
                        <p key={item.id} className="">Subscribers - {item.subreddit_subscribers}</p>
                       
                    </section>
                    </Link>
                    </div>
                    ))
                   }
             </div>
                }    
    </div>)

};



export default SubredditListPage