import React, { Component } from 'react';
import { connect } from 'react-redux'

import {
    getItemsError, 
    getItems, 
    getItemsPending
} from './reducers/bagReducer';

import {
    addToBag,
    fetchItemsPending, 
    fetchItemsSuccess, 
    fetchItemsError
} from './actions/bagActions';

import Search from './Search'

 class Home extends Component{
    state = {
        receivedItems: []
    }
    componentDidMount = async() => {
        const fetchedItems = await this.props.fetchItems();
        this.setState({receivedItems: fetchedItems})
    }
    shouldComponentRender() {
        const { pending } = this.props;
        return pending;
    }
    handleClick = (skuCode) => {
        this.props.addToBag(skuCode); 
    }
    filterList = (searchTxt) => {
        const { items } = this.props;
		let updatedList = items.filter(item => {
            return item.productName.toLowerCase().search(searchTxt.toLowerCase()) !== -1;
        });
        this.setState({receivedItems: updatedList});
    }
    
    render(){
        const { receivedItems } = this.state;
        if(this.shouldComponentRender()) return <h3 className="center">Loading...</h3>
        let itemList = receivedItems.map(item => {
            return(
                <div className="card" key={item.skuCode}>
                        <div className="card-image">
                            <img src={item.productImages[0]["name"]} alt={item.productName}/>
                            <span to="/" className="btn-floating halfway-fab waves-effect waves-light" onClick={()=>{this.handleClick(item.skuCode)}}><i className="material-icons">add</i></span>
                        </div>

                        <div className="card-content">
                            <p>{item.skuCode}</p>
                            <span className="card-title">{item.productName}</span>
                            <p><b>Selling Price: {item.sellingPrice}$</b></p>
                        </div>
                 </div>

            )
        })

        return(
            <div className="container">
                <Search handleChange={this.filterList}/>
                <h5 className="list-title center">{(receivedItems.length)? 'Available Products' : 'No Matched Products'}</h5>
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }

}
const mapStateToProps = (state)=>{
    return {
      items: state.items,
      error: getItemsError(state),
      items: getItems(state),
      pending: getItemsPending(state)
    }
  }
const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToBag: (skuCode)=>{dispatch(addToBag(skuCode))},
        fetchItems: ()=>{
            dispatch(fetchItemsPending())
            return fetch('http://www.mocky.io/v2/5b3de5ed310000db1f6de257')
                .then(res => {
                    return res.json()
                })
                .then(res => {
                    if(res.error) {
                        throw(res.error);
                    }
                    const { productList } = res.responseData
                    dispatch(fetchItemsSuccess(productList));
                    return productList;
                })
                .catch(error => {
                    dispatch(fetchItemsError(error));
                })
            
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)