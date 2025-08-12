import React, { useState, useRef, type FC } from 'react';
import Webcam from 'react-webcam';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const WebcamContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

/* styled('div')({
 // borderRadius: '50%',
  position: 'relative',
  width: '100%',
  maxWidth: '600px', // Ajusta el ancho máximo según tus necesidades
  margin: '0 auto',
  '& video': {
    width: '100%',
    display: 'block',
  },
}); */

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '16px',
});

const ImageContainer = styled('div')({
  position: 'relative',
  width: '100%',
  maxWidth: '600px',
  margin: '16px auto',
  '& img': {
    width: '100%',
    display:  'block',
  },
}); 

interface Props {
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
  sendImage: () => void;
}

export const Camera: FC<Props> = (props: Props ) => {

  const webcamRef = useRef<Webcam|null>(null);

  const [imgSrc, setImgSrc] = useState<string|null>(null);

  const capture = React.useCallback(() => {

    const imageSrc = webcamRef.current!.getScreenshot();

    if(imageSrc !== null) setImgSrc(null);

    setImgSrc(imageSrc);
    props.setValue(imageSrc);
    
  }, [webcamRef, setImgSrc]);

  const retake = () => {
    props.sendImage();
    //setImgSrc(null);

  };

  return (

    <Box sx={{ width: '100%', maxWidth: '600px', margin: '0 auto', borderRadius: '50%'}}>

      <WebcamContainer>
        {imgSrc ? (
          <ImageContainer>
            <img src={imgSrc} alt="Captured" />
          </ImageContainer>
        ) : (
         <Grid sx={{mb:2}}>
           <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: 'user',
            }}
          />
         </Grid>
        )}
      </WebcamContainer>
      
      <ButtonContainer>
        {imgSrc ? (
          <Button variant="contained" onClick={retake}>
            Send
          </Button>
        ) : (
          <Button variant="contained" onClick={capture}>
            Capturar foto
          </Button>
        )}
      </ButtonContainer>
    </Box>
  );
};