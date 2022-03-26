import React from 'react'

const Footer = () => {
    return (
        <footer className="footer">
            <article className="main_flexitems-container">
                <section className="first_section">
                    <h3 className="first_section-h3">API<span className="lowercase">s</span> Used</h3><hr/>
                    <p className="section-p"><a href="https://www.themealdb.com/api.php" target="_blank" rel="noreferrer">TheMealDB API</a></p>
                    <p className="section-p"><a href="https://www.thecocktaildb.com/api.php" target="_blank" rel="noreferrer">TheCocktailDB API</a></p>
                    <p className="section-p"><a href="https://www.reddit.com/dev/api" target="_blank" rel="noreferrer">Reddit API</a></p>
                </section>
                <section className="second_section">
                    <h3 className="second_section-h3">Other Projects</h3><hr/>
                    <p className="section-p "><a href="https://morbik-movies.netlify.app/" target="_blank" rel="noreferrer">Morbik-Movies</a></p>
                    <p className="section-p"><a href="https://k-artis.netlify.app" target="_blank" rel="noreferrer">K-ARTis</a></p>
                    <p className="section-p"><a href="https://seka-card-game.netlify.app" target="_blank" rel="noreferrer">Seka-Card-Game</a></p>
                    <p className="section-p"><a href="https://knotess.netlify.app" target="_blank" rel="noreferrer">K-Notes</a></p>
                
                </section>
                <section className="third_section">
                    <h3>Checkout My Github - <a className="third_section-a" href="https://github.com/kbleul" rel="noreferrer">here</a></h3>
                </section>
            </article>
            <section><p className="font-extralight text-center"> MorbikInc.  </p></section>
        </footer>
    )
}

export default Footer
