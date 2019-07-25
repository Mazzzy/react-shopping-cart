import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import NavLogo from '../images/logo.png'

 const Navbar = (state) => {
    let addedItemsCount = state.items.length
    return(
            <nav className="nav-wrapper">
                <div className="container">
                    <Link to="/" className="brand-logo"><img src={NavLogo} alt='Logo'/></Link>
                    
                    <ul className="right">
                        <li><Link to="/">Items</Link></li>
                        <li>
                            <Link to="/bag" className='bag-container'>
                                <i className="material-icons">shopping_cart</i>
                                <span className='bag-count'>{(addedItemsCount)? addedItemsCount:''}</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
   
    
    )
}

// export default Navbar;
const mapStateToProps = (state)=>{
    return{
        items: state.addedItems
    }
}
export default connect(mapStateToProps)(Navbar)