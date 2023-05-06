import React, {Component} from "react";

import gotService from "../../services/gotService";
import './randomChar.scss';

/* ! Импорт компопенентов из других частей приложения ! */ 
import Spinner from "../spinner/"
import ErrorMessage from "../errorMessage/";

export default class RandomChar extends Component {
    gotService = new gotService();

    
    state = {
        char: {},
        loading: true,
           error: false
    };

    componentDidMount() {
        this.updateCharater(); // Добавьте вызов функции здесь
        this.updateInervalChar = setInterval(() => this.updateCharater(), 1500);
        console.log("Component did mounted");
    }
    componentWillUnmount() {
        clearInterval(this.updateInervalChar);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        });
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateCharater() {
        const id = Math.floor(Math.random() * 25 + 100);
            // const id = 130000000;
            this.gotService.getCharacter(id)
                .then(this.onCharLoaded)
                .catch(this.onError);
    }


    render() {
        const { char, loading, error } = this.state;
    
        const content = error ? (<ErrorMessage />) : loading ? (<Spinner />) : (<View char={char} />);
    
        return (
            <>
                <div className="character__container align-items-center d-flex d-flex flex-column">
                    {content}
                </div>
            </>
        );
    }
}

const View = ({char}) => {

    if (!char) {
        return null;
      }
    
    const { name, gender, born, died, culture } = char;

    return (
        <>
        <h5 className="character__title">Random character: {name}</h5>
            <ul className="character__list w-50">
                <li className="character__item w-100 d-flex justify-content-between"> 
                    <div><b>Gender:</b></div>
                    <div>{ gender }</div>
                </li>
                <li className="character__item w-100 d-flex justify-content-between"> 
                    <div><b>Born:</b></div>
                    <div>{ born }</div>
                </li>
                <li className="character__item w-100 d-flex justify-content-between"> 
                    <div><b>Died:</b></div>
                    <div>{ died }</div>
                </li>
                <li className="character__item w-100 d-flex justify-content-between"> 
                    <div><b>Culture:</b></div>
                    <div>{culture}</div>
                </li>
            </ul>
        </>
    )
}