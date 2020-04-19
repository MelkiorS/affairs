import Vue from "vue";

const url = 'api/posts/';

export default class PostService {
    // Get posts
    static async getPosts() {
        return await Vue.axios.get(url)
                .then((rsp)=> {
                    return rsp.data
                        .map((post) => (
                            { ...post, createdAt : new Date(post.createdAt)})
                        )
                });
    }

    // Creat post
    static createPost(text) {
        return  Vue.axios.post(url, {text})
            .then(rsp=>{
                if (rsp.status === 201){
                    console.log('Cool');
                }
            });
    }

    // Delete post
    static deletePost(id) {
        return Vue.axios.delete(`${url}${id}`);
    }
}



