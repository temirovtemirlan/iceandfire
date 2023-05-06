export default class gotService {

    constructor() {
        this._apiBase = 'https://anapioficeandfire.com/api';
    }

    exData = (item) => {
        for (const key in item) {
            if (item[key] === '' || item[key] === null || item[key] === undefined || item[key] === [""] || item[key] === [] || item[key] === {} || (typeof item[key] === 'string' && item[key].startsWith("https"))) {
                item[key] = "Не найдено";
            }
        }
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {throw new Error(`Could not fetch ${url}, status : ${res.status}`)}

        return await res.json();
    }

    async getAllCharacters() {
        const res = await this.getResource(`/characters/`);
        return res.map(this._transformCharacter)
    }

    async getCharacter(id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    async getAllHouses() {
        const houses = await this.getResource(`/houses/`);
        return houses.map(this._transformHouse);
    }

    async getHouses(id) {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }

    async getAllBooks() {
        return await this.getResource(`/books/`)
    }

    async getBook(id) {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }
    
    _transformCharacter(char) {

        this.exData(char);
        return {
            name: char.name ? char.name : "Ничео не найдено" ,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.died
        }
    }

    _transformHouse(house) {

        this.exData(house);

        return {
            name: house.name,
            region: house.region,
            words: house.words,
            title: house.title,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBook(book) {
        
        this.exData(book);

        return {
            name: book.name,
            isbn: book.isbn,
            authors: book.authors,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            country: book.country,
            released: book.released
        }
    }
}
