import axios from "axios";

/*****
 * key
 *  
 */

export const getImages = async( searchTerm = "abstract") => 
    await axios.get(`https://api.pexels.com/v1/search?query=${searchTerm}`, {
        headers: {
            Authorization: API_KEY,
        },

    });