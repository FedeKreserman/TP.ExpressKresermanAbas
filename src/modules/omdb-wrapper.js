import axios from "axios";
const APIKEY = "63547bf4"; 


const OMDBSearchByPage = async (searchText, page = 1) => {

    let returnObject = {
        respuesta: false,
        cantidadTotal: 0,
        datos: []
    };

    const Test = async () => {
        const requestString = `http://www.omdbapi.com/?apikey=63547bf4&s=${searchText}&page=${page}`;
        const apiResponse = await axios.get(requestString);
        return apiResponse.data;
    };

    let respuesta = await Test();

    console.log('respuesta', respuesta);

    if (respuesta.Response === "True") {
        returnObject.respuesta = true;
        returnObject.cantidadTotal = respuesta.totalResults;
        returnObject.datos = respuesta.Search;
    }

    return returnObject;
};

const OMDBSearchComplete = async (searchText) => {
    let returnObject = {
        respuesta: false,
        cantidadTotal: 0,
        datos: []
    };

    try {
        let page = 1;
        let total = 0;
        let allResults = [];
        while (true) {
            const url = `http://www.omdbapi.com/?apikey=63547bf4s=${searchText}&page=${page}`;
            const response = await axios.get(url);
            const data = response.data;
            if (data.Response === "False") break;

            if (page === 1) {
                total = Number(data.totalResults);
            }
            allResults = allResults.concat(data.Search);
            if (allResults.length >= total) break;
            page++;
        }


        returnObject.respuesta = true;
        returnObject.cantidadTotal = total;
        returnObject.datos = allResults;


    } catch (error) {
        returnObject.respuesta = false;
    }


    return returnObject;
};

const OMDBGetByImdbID = async (imdbID) => {
    let returnObject = {
        respuesta: false,
        cantidadTotal: 0,
        datos: {}
    };
    try {
        const url = `http://www.omdbapi.com/?apikey=63547bf4&i=${imdbID}`;
        const response = await axios.get(url);
        const data = response.data;


        if (data.Response === "True") {
            returnObject.respuesta = true;
            returnObject.cantidadTotal = 1;
            returnObject.datos = data;
        }


    } catch (error) {
        returnObject.respuesta = false;
    }


    return returnObject;
};


export { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID };


