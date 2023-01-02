import  React from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import  { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "../Carousel/Carousel";
import YouTubeIcon from '@mui/icons-material/YouTube';
import {img_500,unavailable,unavailableLandscape} from "../../config/config";
import Box from '@mui/material/Box';
import "./ContentModal.css";
  
  const style = {
    width: "90%",
    height:"70%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow:4,
   padding:(1,1,2)
  };
  
  export default function TransitionsModal({ children, media_type, id }) {
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = useState();
    const [video, setVideo] = useState();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=eb17dd6834686b61e5700f2f1abb058f&language=en-US`
      );
  
      setContent(data);
      // console.log(data);
    };
  
    const fetchVideo = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=eb17dd6834686b61e5700f2f1abb058f&language=en-US`
      );
  
      setVideo(data.results[0]?.key);
    };
  
    useEffect(() => {
      fetchData();
      fetchVideo();
      // eslint-disable-next-line
    }, []);
  
    return (
      <>
       <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
        <Modal 
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          style={{display: "flex",
          alignItems: "center",
          justifyContent: "center"}}
          onClose={handleClose}
          closeAfterTransition
        >
          <Fade in={open}>
            <Box sx={style}>
                {content && (
               <div className="ContentModal">
                  <img
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                  src={
                    content.poster_path
                      ? `${img_500}${content.poster_path}`
                      : unavailable
                  } 
                /> 
                <img
                alt={content.name || content.title}
                className="ContentModal__landscape"
                  src={
                    content.backdrop_path
                      ? `${img_500}${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  />
                  <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}
                  <span className="ContentModal__description">
                    {content.overview}
                  </span>
                  <div>
                  <Carousel id={id} media_type={media_type} />
                  </div>
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                  </div>
              </div>
                )};
            </Box>
          </Fade>
        </Modal>
      </>
    );
  }