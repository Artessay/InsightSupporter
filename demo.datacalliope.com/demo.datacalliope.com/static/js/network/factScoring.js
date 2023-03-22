import axios from "axios";
import {url} from './url';

const factScoring = async (filename, fact, method) => axios({
        "method": "POST",
        "url": url + "/fact",
        "headers": {
            "Content-Type": "application/json; charset=utf-8"
        },
        "data": {
            "file_name": filename,
            "fact": fact,
            "method": method,
        }
    })

export default factScoring;