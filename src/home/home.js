import React, { useEffect, useState } from 'react';
import './home.css';
const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch('http://localhost:4000/get-blog')
      .then(response => response.json())
      .then(data => setBlogPosts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      {blogPosts.map(post => (
        <div key={post._id} className='blocks'>
          <h2>{post.heading}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
