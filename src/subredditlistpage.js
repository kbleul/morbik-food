import  {useState , useEffect} from 'react'
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
            console.log(counter + " - " + result.data.data.children[0].data.subreddit);
                counter++;

            } catch(e) { console.log("Fetch " + item + " failed." + e) }

        }

        for (let item of list) { fetchsubreddit(item); }

    }, [])


    return (<div className="mt-8">
     <h2>Food related subreddits </h2>
    <div>
        <button>Foods</button>
        <button>Drinks</button>
    </div>
    {reddit.length === 0 ? <div className="flex item-center"><img src={loading} alt="loading" className="loadingimg" /> </div>:
            <div className="grid grid-cols-5 gap-3">
                   { reddit.map(item => (<section key={item.permalink} className="">

                        <p key={item.subreddit}>{item.subreddit}</p>
                        <p key={item.subreddit_name_prefixed} className="">{item.subreddit_name_prefixed}</p>
                        <p key={item.subreddit_type}>{item.subreddit_type}</p>
                        <p key={item.id} className="">Subscribers - {item.subreddit_subscribers}</p>
                    </section>))
                   }
             </div>
                }    
    </div>)

};



export default SubredditListPage