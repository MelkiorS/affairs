<template>
  <div class="container">
      <h1>Resent posts</h1>
      <p class="error" v-if="error">{{ error }}</p>
      <div class="create-post">
          <label for="create-post">Post some text</label>
          <input type="text" id="create-post" v-model="text">
          <button @click="createPost">Create</button>
      </div>
      <div class="post-container">
          <div class="post"
               v-for="post in posts"
               :key="post._id"
               @dblclick="deletePost(post._id)"
          >
              <p class="text">{{ post.text }}</p>
          </div>
      </div>
  </div>
</template>

<script>
    import PostService from "../PostService";
    export default {
      name: 'PostComponent',
      data() {
          return {
              posts: [],
              error: '',
              text: ''
          }
      },
        async created(){
          try {
              this.posts = await PostService.getPosts();
              console.log(this.posts);
          } catch (e) {
            this.error = e.message;
          }
        },
        methods: {
          async createPost() {
              await PostService.createPost(this.text);
              this.posts = await PostService.getPosts();
          },
            async deletePost(id) {
                await PostService.deletePost(id);
                this.posts = await PostService.getPosts();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    div.container {
        max-width: 800px;
        margin: 0 auto;
    }

    p.error {
        border: 1px solid #ff5b5f;
        background-color: #ffc5c1;
        padding: 10px;
        margin-bottom: 15px;
    }

    div.post {
        position: relative;
        border: 1px solid #5bd658;
        background-color: #bcffb8;
        padding: 10px 10px 30px 10px;
        margin-bottom: 15px;
    }

    div.created-at{
        position: absolute;
        top: 0;
        left: 0;
        padding: 5px 15px 5px 15px;
        background-color: darkgreen;
        color: white;
        font-size: 13px;
    }

    p.text {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 0;
    }
</style>
