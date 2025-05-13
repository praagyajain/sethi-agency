import { Box, Grid } from "@mui/material";

const ImageTile = ({ images }) => {
  const displayImages = images.slice(0, 5);

  const renderImages = () => {
    const length = displayImages.length;

    const imageStyles = {
      full: { width: "100%", height: "100%", objectFit: "cover", borderRadius: 2 },
      halfLeft: { width: "100%", height: "400px", objectFit: "cover", borderTopLeftRadius: 8, borderBottomLeftRadius: 8 },
      halfRight: { width: "100%", height: "400px", objectFit: "cover", borderTopRightRadius: 8, borderBottomRightRadius: 8 },
      quarter: { width: "100%", height: "200px", objectFit: "cover" },
      topLeft: { borderTopLeftRadius: 8 },
      topRight: { borderTopRightRadius: 8 },
      bottomLeft: { borderBottomLeftRadius: 8 },
      bottomRight: { borderBottomRightRadius: 8 },
    };

    switch (length) {
      case 1:
        return <Box component="img" src={displayImages[0].URL} alt="image-0" sx={imageStyles.full} />;
      case 2:
        return (
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Box component="img" src={displayImages[0].URL} alt="image-0" sx={imageStyles.halfLeft} />
            </Grid>
            <Grid item xs={6}>
              <Box component="img" src={displayImages[1].URL} alt="image-1" sx={imageStyles.halfRight} />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Box component="img" src={displayImages[0].URL} alt="image-0" sx={imageStyles.halfLeft} />
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Box component="img" src={displayImages[1].URL} alt="image-1" sx={{ ...imageStyles.quarter, ...imageStyles.topRight }} />
                </Grid>
                <Grid item>
                  <Box component="img" src={displayImages[2].URL} alt="image-2" sx={{ ...imageStyles.quarter, ...imageStyles.bottomRight }} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      case 4:
        return (
          <Grid container spacing={1}>
            {displayImages.map((image, index) => (
              <Grid item xs={6} key={index}>
                <Box
                  component="img"
                  src={image.URL}
                  alt={`image-${index}`}
                  sx={{
                    ...imageStyles.quarter,
                    ...(index === 0 ? imageStyles.topLeft : {}),
                    ...(index === 1 ? imageStyles.topRight : {}),
                    ...(index === 2 ? imageStyles.bottomLeft : {}),
                    ...(index === 3 ? imageStyles.bottomRight : {}),
                  }}
                />
              </Grid>
            ))}
          </Grid>
        );
      default:
        return (
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Box component="img" src={displayImages[0].URL} alt="image-0" sx={imageStyles.halfLeft} />
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={1}>
                {displayImages.slice(1, 5).map((image, index) => (
                  <Grid item xs={6} key={index}>
                    <Box
                      component="img"
                      src={image.URL}
                      alt={`image-${index + 1}`}
                      sx={{
                        ...imageStyles.quarter,
                        ...(index === 1 ? imageStyles.topRight : {}),
                        ...(index === 3 ? imageStyles.bottomRight : {}),
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        );
    }
  };

  return <Box sx={{ width: "100%", height: "420px", margin: "0 auto", borderRadius: 2 }}>{renderImages()}</Box>;
};

export default ImageTile;