import Box from '@mui/material/Box';
import CardMedia from "@mui/material/CardMedia"
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {
    Card,
    CardBody,
} from "@material-tailwind/react";

const AllProductsSelected = (
    <Card sx={{width: '100%'}}>
        <CardBody>
            <Typography gutterBottom variant="h6" component="div">
                The Easy Quotes will apply to All Products
            </Typography>
        </CardBody>
        <CardMedia
            component="img"
            height="180"
            image="./assets/allProducts.png"
            alt="green iguana"
        />
    </Card>
)
export default function AllProducts() {
  return (
    <>
      <br/>
      <Container>
        <Box sx={{minWidth: 275}}>
          <Card>{AllProductsSelected}</Card>
          <br/>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            sx={{width: '100%'}}
          >
          </Box>
        </Box>
      </Container>
    </>
  );
}

