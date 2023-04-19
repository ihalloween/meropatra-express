// Import dependencies
const express = require('express');
const axios = require('axios');

// Create Express app
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set up static file serving
app.use(express.static('public'));

// Fetch posts from WordPress API
app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://meropatra.com/wp-json/wp/v2/posts');
    const posts = response.data;
    res.render('index', { posts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching posts');
  }
});

// Render individual post
app.get('/post/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const response = await axios.get(`https://meropatra.com/wp-json/wp/v2/posts/${postId}`);
    const post = response.data;
    res.render('post', { post });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching post');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
