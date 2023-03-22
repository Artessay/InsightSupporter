import axios from "axios";
import {url} from './url';

const generateStory = async (filename, maxStoryLength, timeLimit, rewardWeight, facts, relations, method, tree) => axios({
        "method": "POST",
        "url": url + "/generate",
        "headers": {
            "Content-Type": "application/json; charset=utf-8"
        },
        "data": {
            "file_name": filename,
            "max_story_length": maxStoryLength,
            "time_limit": timeLimit,
            "reward_weight": JSON.stringify(rewardWeight),
            "facts": JSON.stringify(facts),
            "relations": JSON.stringify(relations),
            "method": method,
            "tree": JSON.stringify(tree),
        }
    })

export default generateStory;