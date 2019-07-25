import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem,addQuantity,subtractQuantity} from './actions/bagActions'
import Recipe from './Recipe'
class Bag extends Component {

    //to remove the item completely
    handleRemove = (skuCode) => {
        this.props.removeItem(skuCode);
    }
    //to add the quantity
    handleAddQuantity = (skuCode) => {
        this.props.addQuantity(skuCode);
    }
    //to substruct from the quantity
    handleSubtractQuantity = (skuCode) => {
        this.props.subtractQuantity(skuCode);
    }
    render(){
              
        let addedItems = this.props.items.length ?
            (  
                this.props.items.map(item=>{
                    let imgUrl = item.productImages[0]["name"];
                    return(
                       
                        <li className="collection-item avatar" key={item.skuCode}>
                                    <div className="item-img"> 
                                        <img src={imgUrl} alt={imgUrl} className=""/>
                                    </div>
                                
                                    <div className="item-desc">
                                        <span className="title">{item.productName}</span>
                                        <p>{item.skuCode}</p>
                                        <p><b>Selling Price: {item.sellingPrice}$</b></p> 
                                        <p>
                                            <b>Quantity: {item.quantity}</b> 
                                        </p>
                                        <div className="add-remove">
                                            <Link to="/bag"><i className="material-icons" onClick={()=>{this.handleAddQuantity(item.skuCode)}}>arrow_drop_up</i></Link>
                                            <Link to="/bag"><i className="material-icons" onClick={()=>{this.handleSubtractQuantity(item.skuCode)}}>arrow_drop_down</i></Link>
                                        </div>
                                        <button className="waves-effect waves-light btn remove" onClick={()=>{this.handleRemove(item.skuCode)}}>Remove</button>
                                    </div>
                                    
                                </li>
                         
                    )
                })
            ):

             (
                <p>Nothing.</p>
             )
       return(
            <div className="container">
                <div className="bag">
                    <h5>You have ordered:</h5>
                    <ul className="collection">
                        {addedItems}
                    </ul>
                </div> 
                <Recipe />          
            </div>
       )
    }
}


const mapStateToProps = (state)=>{
    return{
        items: state.addedItems,
        //addedItems: state.addedItems
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (skuCode)=>{dispatch(removeItem(skuCode))},
        addQuantity: (skuCode)=>{dispatch(addQuantity(skuCode))},
        subtractQuantity: (skuCode)=>{dispatch(subtractQuantity(skuCode))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Bag)