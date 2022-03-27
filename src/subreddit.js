import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import location_context from "./locationcontext";
import { toogleside_menu } from "./tooglemenus";
import axios from "axios";
import food_subredddits_set from "./food_subredditlist";
import drink_subredddits_set from "./drinks_subredditlist";
import saveFavorites from "./savefavorites_function";
import removeFavorite from "./removefavorites_function";
import Footer from "./fotter";
import loading from "./imgs/loading_.gif";

const Subreddit = () => {
  const [subreddit, set_subreddit] = useState([]);
  const [subredditcontent_map, set_subredditcontent_map] = useState({});
  const [comment_isfetched, set_comment_isfetched] = useState(false);
  const { slug } = useParams();
  const [a, seta] = useState(slug);
  const [isfavorite, set_isfavorite] = useState(false);
  let favoritereddits = [];

  const whereami_arr = useContext(location_context);

  useEffect(() => {
    whereami_arr[1]("Subreddit_page");

    return () => {
      whereami_arr[1]("Home");
    };
  }, []);

  const fetchsubreddit = async () => {
    try {
      const result = await axios(`https://www.reddit.com/r/${slug}/.json`);

      if (localStorage.getItem("SavedSubReddits")) {
        favoritereddits = localStorage.getItem("SavedSubReddits").split(",");
        if (favoritereddits.includes(slug)) {
          set_isfavorite(true);
        } else {
          set_isfavorite(false);
        }
      }

      set_subreddit(result.data.data.children);
    } catch (e) {
      console.log(`Fetch r/${slug} failed. ${e}`);
    }
  };

  useEffect(() => {
    fetchsubreddit();
  }, [slug, a]);

  useEffect(() => {
    if (subreddit.length > 0) {
      let tempobj = {};
      let counter = 0;

      subreddit.forEach((item) => {
        const fetchcomments = async () => {
          //remove ? to allow reddit api call
          if (item.data.title[item.data.title.length - 1] === "?") {
            item.data.title = item.data.title.slice(0, -1);
          }

          try {
            const result = await axios(
              `https://www.reddit.com/r/${item.data.subreddit}/comments/${item.data.id}/${item.data.title}/.json`
            );
            tempobj[item.data.id] = result.data[0].data.children[0].data;

            counter++;

            if (counter === subreddit.length - 1) {
              set_subredditcontent_map(tempobj);
              set_comment_isfetched(true);
            }
          } catch (error) {
            console.log(
              "Error: Fetch reddit posts and comments failed.\n-------------------" +
              error +
              "-------------------------"
            );
            tempobj[item.data.id] = {};
            counter++;
          }
        };
        fetchcomments();
      });
    }
  }, [subreddit]);

  return (
    <article className="main_wrapper">
      <nav
        id="sidenav"
        className="main_nav-wrapper"
      >
        <RedditNavigation picked={slug} />
      </nav>
      <section className="subreddit_main-wrapper">
        <main className="subreddit_subcontainer-main">
          {subreddit.length === 0 ? (
            <div className="loading_container">
              <img src={loading} alt="loading" className="w-12 h-12" />
            </div>
          ) : (
            <div>
              <div className="subreddit_top_section-container">
                <a
                  href={`https://www.reddit.com/r/${subreddit[0].data.subreddit}/`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <h2
                    className="subreddit_main-h2"
                    key={subreddit[0].data.subreddit}
                  >
                    {subreddit[0].data.subreddit_name_prefixed}
                  </h2>
                  <p className="subreddit_main-p--subscribers">
                    {subreddit[0].data.subreddit_subscribers
                      ? `Subscribers - ${subreddit[0].data.subreddit_subscribers}`
                      : ""}
                  </p>
                </a>
                {isfavorite ? (
                  <button
                    key={`${subreddit[0].data.subreddit}${subreddit[0].data.subreddit}1`}
                    className="subreddit_main-isfav--btn"
                    onClick={() => {
                      set_isfavorite(false);
                      removeFavorite("reddit", subreddit[0].data.subreddit);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="1.5em"
                      height="1.5em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24"
                    >
                      <path fill="currentColor" d="M11 15h2V9h3l-4-5l-4 5h3z" />
                      <path
                        fill="currentColor"
                        d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"
                      />
                    </svg>
                    <p className="ml-2">Saved</p>
                  </button>
                ) : (
                  <button
                    key={`${subreddit[0].data.subreddit}${subreddit[0].data.subreddit}15`}
                    className="subreddit_main-notfav--btn"
                    onClick={() => {
                      set_isfavorite(true);
                      saveFavorites("reddit", subreddit[0].data.subreddit);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="1.5em"
                      height="1.5em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5l-5-5l1.41-1.41L11 12.67V3h2v9.67z"
                      />
                    </svg>
                    <p className="ml-2">Add to Favories</p>
                  </button>
                )}
              </div>
              <article className="mt-8 lg:mt-16">
                {subreddit.map((item) => (
                  <section
                    className="py-2 lg:py-8 hover:shadow-lg"
                    key={item.data.id}
                  >
                    <a
                      href={`https://www.reddit.com/${item.data.permalink}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <section className="flex">
                        <div
                          className="single-subreddit-container--left"
                          key={`${subreddit[0].data.permalink} ${subreddit[0].data.permalink} ${subreddit[0].data.permalink} ${subreddit[0].data.permalink}`}
                        >
                          <svg
                            className="ml-2 lg:ml-6 w-8 h-8 lg:w-10 lg:h-10"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 16 16"
                          >
                            <g fill="currentColor">
                              <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                            </g>
                          </svg>
                          <p
                            className="upvotes-p"
                            key={`${item.data.ups} ${subreddit[0].data.permalink}`}
                          >

                            {item.data.ups}
                          </p>
                        </div>
                        <div
                          className="single-subreddit-container--right"
                          key={`${item.data.title} ${item.data.author}`}
                        >
                          <h4
                            className="single-subreddit-h4"
                            key={item.data.title}
                          >
                            {item.data.title}
                          </h4>
                          {comment_isfetched && (
                            <section>
                              {subredditcontent_map[item.data.id] !==
                                undefined && (
                                  <section
                                    key={
                                      subredditcontent_map[item.data.id]
                                        .subreddit_id
                                    }
                                    className="border-b dark:border-b-gray-700"
                                  >
                                    <p
                                      className="single-subreddit-selftext--p"
                                      key={
                                        subredditcontent_map[item.data.id]
                                          .selftext
                                      }
                                    >
                                      {
                                        subredditcontent_map[item.data.id]
                                          .selftext
                                      }
                                    </p>
                                    <div
                                      className="comment_author-container"
                                      key={`${subredditcontent_map[item.data.id]
                                        .subreddit_id
                                        }${subredditcontent_map[item.data.id]
                                          .subreddit_id
                                        }${item.data.author}`}
                                    >
                                      <p
                                        className="author-p"
                                        key={item.data.author}
                                      >
                                        Submitted by : {item.data.author}
                                      </p>
                                      <button
                                        className="comment-btn"
                                        key={`${subredditcontent_map[item.data.id]
                                          .num_comments
                                          } ${subredditcontent_map[item.data.id]
                                            .subreddit_id
                                          }`}
                                      >
                                        {
                                          subredditcontent_map[item.data.id]
                                            .num_comments
                                        }{" "}
                                        Comments{" "}
                                      </button>
                                    </div>
                                  </section>
                                )}
                            </section>
                          )}
                        </div>
                      </section>
                    </a>
                  </section>
                ))}
              </article>
            </div>
          )}
        </main>
        <div className="subreddit_footer-wrapper">
          <Footer />
        </div>
      </section>
    </article>
  );
};

const RedditNavigation = ({ picked }) => {
  const [show_foodsubreddit, setshow_foodsubreddit] = useState(false);
  const [show_drinksubreddit, setshow_drinksubreddit] = useState(true);

  let foodsubreddit_arr = [];
  let drinksubreddit_arr = [];

  const iterator1 = food_subredddits_set.entries();
  const iterator2 = drink_subredddits_set.entries();

  for (const entry of iterator1) {
    foodsubreddit_arr.push(entry[0]);
  }
  for (const entry of iterator2) {
    drinksubreddit_arr.push(entry[0]);
  }

  const showChoices = (type) => {
    if (type === "food") {
      if (show_foodsubreddit) {
        setshow_foodsubreddit(false);
      } else setshow_foodsubreddit(true);
    } else {
      if (show_drinksubreddit) {
        setshow_drinksubreddit(false);
      } else setshow_drinksubreddit(true);
    }
  };

  return (
    <section className="redditnav_wrapper">
      <div>
        <div className="redditnav_title-container">
          <h2 className="redditnav_title-h2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="1.5em"
              height="1.5em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="currentColor"
                d="M128 352.576V352a288 288 0 0 1 491.072-204.224a192 192 0 0 1 274.24 204.48a64 64 0 0 1 57.216 74.24C921.6 600.512 850.048 710.656 736 756.992V800a96 96 0 0 1-96 96H384a96 96 0 0 1-96-96v-43.008c-114.048-46.336-185.6-156.48-214.528-330.496A64 64 0 0 1 128 352.64zm64-.576h64a160 160 0 0 1 320 0h64a224 224 0 0 0-448 0zm128 0h192a96 96 0 0 0-192 0zm439.424 0h68.544A128.256 128.256 0 0 0 704 192c-15.36 0-29.952 2.688-43.52 7.616c11.328 18.176 20.672 37.76 27.84 58.304A64.128 64.128 0 0 1 759.424 352zM672 768H352v32a32 32 0 0 0 32 32h256a32 32 0 0 0 32-32v-32zm-342.528-64h365.056c101.504-32.64 165.76-124.928 192.896-288H136.576c27.136 163.072 91.392 255.36 192.896 288z"
              />
            </svg>
            <p className="ml-2">Food Subreddits</p>
          </h2>
          <button
            className="redditnav_showitems-toogle--btn"
            onClick={() => showChoices("food")}
          >
            {show_foodsubreddit ? "↑" : "↓"}
          </button>
        </div>
        <div className={show_foodsubreddit ? "flex flex-col" : "hidden"}>
          {foodsubreddit_arr.map((item) => (
            <Link
              onClick={toogleside_menu}
              key={`${item}key`}
              to={`/reddit/${item}`}
            >
              <div key={`${item}1`} className="redditnav_items-btns--container">
                <button
                  key={item}
                  className={
                    picked === item
                      ? "redditnav_btn-clicked"
                      : "redditnav_btn"
                  }
                >
                  {item}
                </button>
              </div>
            </Link>
          ))}
        </div>

        <div className="redditnav_title-container">
          <h2 className="redditnav_title-h2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="1.5em"
              height="1.5em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="currentColor"
                d="M768 64a192 192 0 1 1-69.952 370.88L480 725.376V896h96a32 32 0 1 1 0 64H320a32 32 0 1 1 0-64h96V725.376L76.8 273.536a64 64 0 0 1-12.8-38.4v-10.688a32 32 0 0 1 32-32h71.808l-65.536-83.84a32 32 0 0 1 50.432-39.424l96.256 123.264h337.728A192.064 192.064 0 0 1 768 64zM656.896 192.448H800a32 32 0 0 1 32 32v10.624a64 64 0 0 1-12.8 38.4l-80.448 107.2a128 128 0 1 0-81.92-188.16v-.064zm-357.888 64l129.472 165.76a32 32 0 0 1-50.432 39.36l-160.256-205.12H144l304 404.928l304-404.928H299.008z"
              />
            </svg>
            <p className="ml-2">Drink Subreddits</p>
          </h2>
          <button
            className="redditnav_showitems-toogle--btn"
            onClick={() => showChoices("drink")}
          >
            {show_drinksubreddit ? "↑" : "↓"}
          </button>
        </div>
        <div className={show_drinksubreddit ? "flex flex-col" : "hidden"}>
          {drinksubreddit_arr.map((item) => (
            <Link
              onClick={toogleside_menu}
              key={`${item}key`}
              to={`/reddit/${item}`}
            >
              <div key={`${item}1`} className="redditnav_items-btns--container">
                <button
                  key={item}
                  className={
                    picked === item ? "redditnav_btn-clicked": "redditnav_btn"
                  }
                >
                  {item}
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Subreddit;
