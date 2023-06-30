import React, { useState } from 'react';

const NewTweetForm = ({ tweetService, onError }) => {
  const [tweet, setTweet] = useState('');
  const [imageSrc, setImageSrc] = useState('');


  const onChange = (event) => {
    setTweet(event.target.value);
  };

  const onUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => { 
        reader.onload = () => {	
            setImageSrc(reader.result || null);
            resolve();
        };
    });
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    tweetService
      .postTweet(tweet)
      .then((created) => {
        setTweet('');
      })
      .catch(onError);
  };

  return (
    <div>
      <form className='tweet-form' onSubmit={onSubmit}>
      <input
        type='text'
        placeholder='Edit your post'
        value={tweet}
        required
        autoFocus
        onChange={onChange}
        className='form-input tweet-input'
      />
      
      <button type='submit' className='form-btn'>
        Post
      </button>
      </form>

      <form className='img-form'>
        <input accept="image/*" 
              multiple type="file"
              onChange={e => onUpload(e)}
          />
          <img src={imageSrc} alt = "" className='image'/>
      </form>
    </div>
  );
};

export default NewTweetForm;
