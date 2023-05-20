import axios from 'axios';

export const memoriesCreatePost = async (url, userId, path) => {

    return await axios({
        method: 'POST',
        url: url,
        data: {
            userId: 4,
            path: path,
        }
    })
}