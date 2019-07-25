import React, { Component } from 'react';

export default class Search extends Component {
    clearSearch = () => {
        this.inputSearch.value = "";
    }
    render() {
        const { handleChange } = this.props;
        return(
            <div className="search-container">
                <form>
                    <div className="input-field">
                    <input className="txt-search" type="search" onChange={(event) => handleChange(event.target.value)} ref={el => this.inputSearch = el}/>
                    <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                    <i className="material-icons" onClick={() => {
                        handleChange('')
                        this.clearSearch()
                    }}>close</i>
                    </div>
                </form>
            </div>
        )
    }
}
