import "./nav.css"

const Nav = () => {
    const nxt = (event) => {
        // Prevent default behavior of the anchor tag
        event.preventDefault();

        // Navigate using window.location
        window.location.href = event.target.getAttribute('href');
    }

    return(
        <div className="nav">
            <ul className="ul">
                <li className="li_img left">
                </li>

                <li className="li left">
                    <input type="text" placeholder="recherche..."></input>
                </li>

                <li className="li_bouton right">
                    <button className="bouton">CONNECT</button>
                </li>

                <li className="li right">CATALOGUE</li>

                <li className="li right" href="/" onClick={nxt}>HOME</li>

                <li className="li_img right">
                </li>
            </ul>
        </div>
    );
}

export default Nav;