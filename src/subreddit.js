import React, {useState , useEffect} from 'react'
import {useParams, Link} from "react-router-dom"
import axios from 'axios'
import food_subredddits_set from "./food_subredditlist"



const Subreddit = () => {

    const [subreddit , set_subreddit] = useState([]);
    const [subredditcontent_map, set_subredditcontent_map] = useState({});
    const [comment_isfetched, set_comment_isfetched] = useState(false);
    const {slug} = useParams();
    const [a,seta] = useState(slug)


    useEffect(() => {
        const fetchsubreddit = async () => {
        try {    
            const result = await axios(`https://www.reddit.com/r/${slug}/.json`);
               set_subreddit(result.data.data.children);
        
    } catch (e) { console.log(`Fetch r/${slug} failed. ${e}`)  }
        }

        fetchsubreddit();
    },[slug, a])

    useEffect(() => {
        
        
        if(subreddit.length > 0){
            let tempobj = {};
            let counter = 0;

        subreddit.forEach(item => {
            const fetchcomments = async () => {

                //remove ? to allow reddit api call
                if (item.data.title[item.data.title.length - 1] === "?") { item.data.title = item.data.title.slice(0, -1); }

                try {
                    const result = await axios(`https://www.reddit.com/r/${item.data.subreddit}/comments/${item.data.id}/${item.data.title}/.json`);
                    tempobj[item.data.id] = result.data[0].data.children[0].data;

                    counter++;

                    if (counter === subreddit.length - 1) {
                        set_subredditcontent_map(tempobj)
                        set_comment_isfetched(true);
                    }
                } catch (error) {
                    console.log("Error: Fetch reddit posts and comments failed.\n-------------------" + error + "-------------------------");
                    tempobj[item.data.id] = {}
                    counter++;
                }
            }
            fetchcomments();
        });
    }}, [subreddit])
    
  return (
    <article className="grid grid-cols-8 gap-3">

    <nav className="col-start-1 col-end-3 row-start-2 row-end-2 mt-12">
           <RedditNavigation />
     </nav>
     <main className="col-start-3 col-end-9 row-start-2 row-end-5 mt-12">

{ subreddit.length > 0 && <div>
    <a href={`https://www.reddit.com/r/${subreddit[0].data.subreddit}/`} target="_blank" rel="noreferrer" >
        <h2 className="subredditmain_title" key={subreddit[0].data.subreddit}>{subreddit[0].data.subreddit}</h2></a>
    {
        subreddit.map(item => (
            <section className="" key={item.data.id}>
                <a href={`https://www.reddit.com/${item.data.permalink}`} target="_blank" rel="noreferrer" >

                    <section className="">

                        <div className="" key={`${subreddit[0].data.permalink} ${subreddit[0].data.permalink} ${subreddit[0].data.permalink} ${subreddit[0].data.permalink}`}>

                            <p key={`${item.data.ups} ${subreddit[0].data.permalink}`} className="">{item.data.ups}</p>

                            <p className="" key={`${subreddit[0].data.permalink} ${subreddit[0].data.ups} ${subreddit[0].data.permalink}`}>
                                <svg className="upvotesvg" xmlns="http://www.w3.org/2000/svg" width="3em" height="5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><g fill="currentColor"><path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" /></g></svg></p>
                        </div>

                        <div className="" key={`${item.data.title} ${item.data.author}`}>
                            <h4 key={item.data.title}>{item.data.title}</h4>

                            {comment_isfetched && <section>{
                                subredditcontent_map[item.data.id] !== undefined &&

                                <section key={subredditcontent_map[item.data.id].subreddit_id}>

                                    <p className="" key={subredditcontent_map[item.data.id].selftext}>{subredditcontent_map[item.data.id].selftext}</p>


                                    <div className="" key={`${subredditcontent_map[item.data.id].subreddit_id}${subredditcontent_map[item.data.id].subreddit_id}${item.data.author}`}>
                                        <p key={item.data.author}>Submitted by : {item.data.author}</p>
                                        <button key={`${subredditcontent_map[item.data.id].num_comments} ${subredditcontent_map[item.data.id].subreddit_id}`} >{subredditcontent_map[item.data.id].num_comments} Comments </button>
                                    </div><hr/>
                                </section>}

                            </section>}
                        </div>
                    </section>
                </a>
            </section>
        ))
    } </div> }
    </main>
    
</article>
  )
}

const RedditNavigation = () => {
   
    let foodsubreddit_arr = [];

const iterator1 = food_subredddits_set.entries();

         for (const entry of iterator1) {  foodsubreddit_arr.push(entry[0]); console.log(entry[0]) }

    return(<section>
         {
           foodsubreddit_arr.map(item => (
            <Link key={`${item}key`} to={`/reddit/${item}`} >
            <div key={`${item}1`}>
              <button key={item}>{item}</button>
            </div>
            </Link>
            ))
         }
        </section>)
}

export default Subreddit