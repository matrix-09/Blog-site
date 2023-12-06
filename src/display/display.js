// Import necessary dependencies
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './display.css';

// Create a BlogForm component
const Display = () => {
  // Initialize the react-hook-form
  const { register, handleSubmit } = useForm();

  const navigate=useNavigate()

  let [error,setError]=useState("")
  // Function to handle form submission
  const onSubmit = (data) => {
    console.log(data); // You can perform any actions with the data here
    axios
        .post("http://localhost:4000/post-blog",data)
        .then((response)=>{
          if(response.status===201){
            //navigate to success page
            navigate('/blogs')
            console.log("success");
          }
          if(response.status!==201){
            setError(response.data.message)
          }
        })
        .catch((err)=>{
          //the client is given an error respnse
          if(err.response){
            setError(err.message)
          }
          else if(err.request){
            setError(err.message)
          }
          else{
            setError(err.message)
          }
        })
  };

  return (
    <div>
      <h1>Create a Blog Post</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Input for Blog Heading */}
        <div>
          <label htmlFor="heading">Heading:</label>
          <input
            type="text"
            id="heading"
            name="heading"
            {...register('heading', { required: 'Heading is required' })}
          />
        </div>

        {/* Textarea for Blog Content */}
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            {...register('content', { required: 'Content is required' })}
          />
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit">Publish</button>
        </div>
      </form>
    </div>
  );
};

export default Display;
