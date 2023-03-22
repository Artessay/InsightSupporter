import axios from "axios";
import { url } from './url';

const shareStory = async (filename, story) => axios({
    "method": "POST",
    "url": url + "/share",
    "headers": {
        "Content-Type": "application/json; charset=utf-8"
    },
    "data": {
        "file_name": filename,
        "story": JSON.stringify(story),
    }
})

export default shareStory;