import axios from 'axios';

const url = 'api/posts/';

class PostService {
    // Get posts
    static async getPosts() {
        return await axios.get(url)
                .then((rsp)=> {
                    return rsp.data
                        .map((post) => (
                            { ...post, createdAt : new Date(post.createdAt)})
                        )
                });
    }

    // Creat post
    static createPost(text) {
        return axios.post(url, {text})
            .then(rsp=>{
                if (rsp.status == 201){
                    console.log('Cool');
                }
            });
    }

    // Delete post
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default PostService;



