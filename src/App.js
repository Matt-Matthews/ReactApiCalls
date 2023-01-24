import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React from 'react';

function App() {

  const url = "http://localhost:3000/posts/";

  const [post,setPost] = React.useState({
    title: '',
    description: ''
  });
  const [posts,setPosts] = React.useState([]);

  async function getPosts() {
    try{
      // const results = await instance.get('/posts');
      const res = await fetch(url)
      const results = await res.json()
      console.log(results)
      setPosts(results);
    }catch(err){
      console.log(err.message);
    }
  }

  React.useEffect(()=>{
    getPosts();
  },[]);

  function handleInput(event) {
    const {value, name} = event.target;
    setPost(p=>{
      return {
        ...p,
        [name]: value
      }
    });
  }

  async function addPosts() {
    try{
      if(post.title&&post.description){
        const results = await fetch(url, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(post)
        });
        console.log(results.status);
        getPosts();
      
      }else alert('fill in the form')
    }catch(err){
      console.log(err.message);
    }
  }

  async function deletePosts(postId) {
    try{
      const result = await fetch(url+postId, {
        method: "DELETE"
      })
      getPosts();
    }catch(err){
      console.log(err.message);
    }
  }

  return (
    <div className="App">
      <div style={{color: 'black'}}>
       {posts.length !==0
       ?posts.map((p,index)=>{
        return <div key={index.toString()}> 
          <h3>{index.toString() + '. ' +p.title}</h3>
          <p>{p.description}</p>
          <button onClick={() =>deletePosts(p._id)}>Delete</button>
        </div>
       })
       :'No data found'}
      </div>
     <input placeholder='title' name='title' onChange={(event)=>handleInput(event)} />
     <br></br>
     <input placeholder='description' name='description' onChange={(event)=>handleInput(event)} />
     <br></br>
     <button onClick={addPosts}>Add</button>
    </div>
  );
}

export default App;
