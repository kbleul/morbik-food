import React from 'react'

const Footer = () => {
    return (
        <footer className="mt-40 bg-gray-100 dark:bg-gray-700">
            <article className=" pb-24 pt-32 flex w-full">
                <section className="w-4/12 text-center mr-2 hover:border-b-2 hover:border-green-400">
                    <h3 className="font-extrabold text-2xl pb-2 font-serif uppercase">API<span className="lowercase">s</span> Used</h3><hr/>
                    <p className="italic leading-10 font-mono hover:underline hover:decoration-gray-400"><a href="https://www.themealdb.com/api.php" target="_blank" rel="noreferrer">TheMealDB API</a></p>
                    <p className="italic leading-10 font-mono hover:underline hover:decoration-gray-400"><a href="https://www.thecocktaildb.com/api.php" target="_blank" rel="noreferrer">TheCocktailDB API</a></p>
                    <p className="italic leading-10 font-mono hover:underline hover:decoration-gray-400"><a href="https://www.reddit.com/dev/api" target="_blank" rel="noreferrer">Reddit API</a></p>
                </section>
                <section className="w-4/12  hover:border-b-2 hover:border-green-400">
                    <h3 className="font-black text-2xl pb-2 font-serif uppercase pl-16">Other Projects</h3><hr/>
                    <p className="italic leading-10 font-mono hover:underline hover:decoration-gray-400 pl-16"><a href="https://morbik-movies.netlify.app/" target="_blank" rel="noreferrer">Morbik-Movies</a></p>
                    <p className="italic leading-10 font-mono pl-48 hover:underline hover:decoration-gray-400"><a href="https://k-artis.netlify.app" target="_blank" rel="noreferrer">K-ARTis</a></p>
                    <p className="italic leading-10 font-mono pl-16 hover:underline hover:decoration-gray-400"><a href="https://seka-card-game.netlify.app" target="_blank" rel="noreferrer">Seka-Card-Game</a></p>
                    <p className="italic leading-10 font-mono pl-48 hover:underline hover:decoration-gray-400"><a href="https://knotess.netlify.app" target="_blank" rel="noreferrer">K-Notes</a></p>
                
                </section>
                <section className="w-4/12 flex justify-center items-center font-extrabold text-lg uppercase hover:border-l-2 hover:border-green-400">
                    <h3>Checkout My Github - <a className="text-gray-400 decoration-2 hover:underline hover:decoration-green-500" href="https://github.com/kbleul" rel="noreferrer">here</a></h3>

                </section>
            </article>
            <section><p className="font-extralight text-center"> MorbikInc.  </p></section>
        </footer>
    )
}

export default Footer
