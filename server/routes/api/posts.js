const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// Post
router.post('/', async (req, res) => {
    await loadPostsCollection().then((posts) => posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    }));

    res.status(201).send(req.body);
});

// Delete
router.delete('/:id', async (req, res) => {
    await loadPostsCollection().then((posts) => posts.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    }));

    res.status(200).send();
})

async function loadPostsCollection() {
    const client = await mongodb.MongoClient
        .connect('mongodb+srv://tigrolis:tigrolis@tigrolis-efq1y.gcp.mongodb.net/test?retryWrites=true&w=majority',
            { useUnifiedTopology:true });

    return client.db('affairs').collection('posts');
}

module.exports = router;