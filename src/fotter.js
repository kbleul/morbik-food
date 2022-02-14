import React from 'react'

const Footer = () => {
    return (
        <footer>
            <article className="creditarticle">
                <section className="creditsection">
                    <h3>API Credit</h3>
                    <p><a href="https://www.themoviedb.org/documentation/api" target="_blank" rel="noreferrer">The Movie Database API</a></p>
                    <p><a href="https://www.reddit.com/dev/api" target="_blank" rel="noreferrer">Reddit API</a></p>
                </section>
                <section className="creditsection">
                    <h3>Other Projects</h3>
                    <p><a href="https://knotess.netlify.app" target="_blank" rel="noreferrer">KNotes</a></p>
                    <p><a href="https://seka-card-game.netlify.app" target="_blank" rel="noreferrer">Seka Card Game</a></p>
                    <p><a href="https://k-artis.netlify.app" target="_blank" rel="noreferrer">K-ARTis</a></p>

                </section>
                <section className="creditsection">
                    <h3>Checkout My Github - <a href="https://github.com/kbleul" rel="noreferrer">here</a></h3>

                </section>
            </article>
            <section><p className="lastpara"> MorbikInc.  </p></section>
        </footer>
    )
}

export default Footer
