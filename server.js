const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint to add a new post for a specific user
app.post('/add-post', (req, res) => {
    const { userEmail, post } = req.body; // Expecting { userId: "1", post: { author: "Author Name", authorPhoto: "URL", content: "Post content" } }
    // Read existing data
    fs.readFile('data.json', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }

        let jsonData;
        try {
            jsonData = JSON.parse(data); // Parse the JSON data
        } catch (parseError) {
            return res.status(500).send('Error parsing JSON data');
        }

        // Find the user by ID
        const user = jsonData.users.find(user => user.email === userEmail.userEmail);
       
        if (!user) {
            return res.status(404).send('User  not found');
        }

        // Push the new post into the user's posts array
        user.posts.push(post);

        // Write updated data back to file
        fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing file');
            }
            res.status(200).send({ message: 'Post deleted successfully', posts: user.posts } );
        });
    });
});
app.get('/users', (req, res) => {
    const filePath = 'data.json'; // Path to your JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }
        res.json(JSON.parse(data)); // Send the parsed JSON data
    });
});
// Endpoint to delete a post
app.delete('/users/:userId/posts/:postIndex', (req, res) => {
    const userId = req.params.userId;
    const postIndex = req.params.postIndex; // Index of the post to delete
    const filePath =  'data.json';
    //console.log(postIndex);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }

        const users = JSON.parse(data);
      //  console.log(users);
        const user = users.users.find(u => u.id === userId);
      //  console.log(user);
        if (!user) {
            return res.status(404).json({ error: 'User  not found' });
        }

        // Find the post index based on postId
      //  console.log(postIndex);
       // console.log( user.posts)
        const postInd = user.posts.findIndex(post => post.id.toString() === postIndex);
        
        if (postInd === -1) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Remove the post
        user.posts.splice(postInd, 1);

        // Write updated data back to file
        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write data' });
            }
            res.status(200).json({ message: 'Post deleted successfully', posts: user.posts });
        });
    });
});

app.patch('/users/:userId/posts/:postId/hide', (req, res) => {
    const userId = req.params.userId; // e.g., "1"
    const postId = req.params.postId; // e.g., "1-1"
    
    // Read the data from the JSON file
    fs.readFile("data.json", 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }

        // Parse the JSON data
        let users;
        try {
            users = JSON.parse(data);
        } catch (parseError) {
            return res.status(500).json({ error: 'Failed to parse data' });
        }

        // Find the user by ID
        const user = users.users.find(u => u.id === userId);
        if (!user) {
            return res.status(404).json({ error: 'User  not found' });
        }

        // Find the post by ID
        const post = user.posts.find(p => p.id === postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Update the hidden attribute
        post.hidden = true; // Set hidden to true

        // Write the updated users object back to the file
        const jsonData = JSON.stringify(users, null, 2);
        fs.writeFile('data.json', jsonData, 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write data' });
            }

            // Replace \r\n with \n to enforce Unix-style line endings
            fs.readFile('data.json', 'utf8', (err, data) => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to read data after writing' });
                }
                const updatedData = data.replace(/\r\n/g, '\n');
                fs.writeFile('data.json', updatedData, 'utf8', (err) => {
                    if (err) {
                        return res.status(500).json({ error: 'Failed to write data after replacing line endings' });
                    }
                    // Respond with success message and updated posts
                    res.status(200).json({ message: 'Post hidden successfully', posts: user.posts });
                });
            });
        });
    });
});

app.patch('/users/:userId/posts/:postId/unhide', (req, res) => {
    const userId = req.params.userId; // e.g., "1"
    const postId = req.params.postId; // e.g., "1-1"
    
    // Read the data from the JSON file
    fs.readFile("data.json", 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }

        // Parse the JSON data
        let users;
        try {
            users = JSON.parse(data);
        } catch (parseError) {
            return res.status(500).json({ error: 'Failed to parse data' });
        }

        // Find the user by ID
        const user = users.users.find(u => u.id === userId);
        if (!user) {
            return res.status(404).json({ error: 'User  not found' });
        }

        // Find the post by ID
        const post = user.posts.find(p => p.id === postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Update the hidden attribute
        post.hidden = false; // Set hidden to true

        // Write the updated users object back to the file
        const jsonData = JSON.stringify(users, null, 2);
        fs.writeFile('data.json', jsonData, 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write data' });
            }

            // Replace \r\n with \n to enforce Unix-style line endings
            fs.readFile('data.json', 'utf8', (err, data) => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to read data after writing' });
                }
                const updatedData = data.replace(/\r\n/g, '\n');
                fs.writeFile('data.json', updatedData, 'utf8', (err) => {
                    if (err) {
                        return res.status(500).json({ error: 'Failed to write data after replacing line endings' });
                    }
                    // Respond with success message and updated posts
                    res.status(200).json({ message: 'Post hidden successfully', posts: user.posts });
                });
            });
        });
    });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});