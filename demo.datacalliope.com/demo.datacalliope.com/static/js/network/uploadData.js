import axios from "axios";
import { url } from './url';

const uploadData = async (data) => axios({
    "method": "POST",
    "url": url + "/upload",
    "config": {
        "headers": {
          'Content-Type': 'multipart/form-data'
        },
      },
    "data": data
})

export default uploadData;