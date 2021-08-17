import React, { useState, useEffect } from 'react';
import { Loader } from './components/Loader';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

// Style
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: sans-serif;
  }
`;

const WrapperImages = styled.section`
  max-width: 70rem;
  margin: 4rem auto;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 300px;
`;

let allImages = [];

function App() {
  const [images, setImage] = useState([]);

  let curIndex = 0;

  const fetchAllImages = () => {
    axios.get('https://jsonplaceholder.typicode.com/photos')
    .then(res => {
      allImages = res.data;
      fetchImages(10);
    }) 
  }

  useEffect(() => {
    fetchAllImages();
  }, [])

  const fetchImages = (count = 10) => {

    let newImages = [];
    let i = 0;
    for(i = curIndex; i < curIndex + count; i++) {
      if(i > allImages.length - 1) {
        break;
      }
      newImages.push(allImages[i]);

    }

    curIndex = i + 1;

    setImage([...images, ...newImages]);
  }





  return (
    <div>
      <GlobalStyle />
      { <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        loader={<Loader />}
      >
        
        { <WrapperImages>
          {images.map((image, key) => (
            <img key={key} src = {image.url} alt={''}/>
          ))}
        </WrapperImages> }
      </InfiniteScroll> }
    </div>
  );
}

export default App;
