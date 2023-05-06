import React, { Component } from "react";
import './booksPages.scss'

import Spinner from '../spinner/';
import ErrorMessage from "../errorMessage";
import gotService from '../../services/gotService'

export default class BooksPages extends Component {

    gotService = new gotService();

    constructor() {
        super();
    }

    state = {
        book: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateInterval = setInterval(() => this.updateBook(), 1500);
        console.log("Book pages was mounted");
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval);
    }
    
    onBookLoaded = (book) => {
        this.setState({
            book,
            loading: false,
            error: false
        });
    }

    onBookError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateBook() {
        const id = Math.floor(Math.random() * 10) + 1;
        this.gotService.getBook(id)
            .then(this.onBookLoaded)
                .catch(this.onBookError);
    }

    render() {

        const {loading, book, error} = this.state;

        const content = error ? <ErrorMessage/> : loading ? <Spinner/> : <ViewBook book={book} />;
        
        return (
            <div className="mt-4 books__container d-flex align-items-center flex-column ">
                <h5>Random books: {book.name} </h5>
                {content}
            </div>
        )

    }
}

const ViewBook = ({book}) => {

    const { name, isbn, authors, numberOfPages, publisher, country, released } = book;

    return (
        <>
            <ul className="character__list w-50">
                <li className="character__item w-100 d-flex justify-content-between"> 
                <div><b>Name:</b></div>
                <div>{name}</div>
                </li>
                <li className="character__item w-100 d-flex justify-content-between"> 
                <div><b>isbn:</b></div>
                <div>{isbn}</div>
                </li>
                <li className="character__item w-100 d-flex justify-content-between"> 
                <div><b>Authors:</b></div>
                <div>{authors}</div>
                </li>
                <li className="character__item w-100 d-flex justify-content-between"> 
                <div><b>NumberOfPages:</b></div>
                <div>{numberOfPages}</div>
                </li>
                <li className="character__item w-100 d-flex justify-content-between"> 
                <div><b>Publisher:</b></div>
                <div>{publisher}</div>
                </li>
                <li className="character__item w-100 d-flex justify-content-between"> 
                <div><b>Released:</b></div>
                <div>{released}</div>
                </li>
            </ul>
        </>
    )
}