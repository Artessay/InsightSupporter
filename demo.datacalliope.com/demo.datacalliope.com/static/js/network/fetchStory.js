import axios from "axios";
import {url} from './url';

const fetchStory = async (public_id) => axios({
    "method": "POST",
    "url": url + "/public",
    "headers": {
        "Content-Type": "application/json; charset=utf-8"
    },
    "data": {
        "public_id": public_id
    }
})

export default fetchStory;