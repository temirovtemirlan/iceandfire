import React, { Component } from "react";

import gotService from "../../services/gotService";

export default class Houses extends Component {
    gotService = new gotService();

    state = {
        house: {}
    }


    /**
     * ! dfsadfasflj
     * ? fasdfsdkfdsklf
     * TODO:
     **/
    
    onHouseLoaded = (house) => {
        this.setState({
            house
        })
    }

    updateHouse = () => {
        const id = Math.floor(Math.random() * 1 + 20);
        this.gotService.getHouses(id)
            .then(this.onHouseLoaded)
                .catch(err => console.log("hello"));
    }
    

    componentDidMount() {
        setInterval(() => this.updateHouse(), 1400);
            console.info("The House was mounted");
    }

    render() {

        const { house: { name, region, words, title, overlord, ancestralWeapons }} = this.state;

        return (
            <>
                <div className="mt-4 books__container d-flex align-items-center flex-column ">
                <h5>Random books: {name} </h5>
                        
                </div>
            </>
        )
    }
}
