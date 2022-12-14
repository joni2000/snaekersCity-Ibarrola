import { Button, Grid, ImageListItem, Typography } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart/CartContext";
import { toThousand } from "../../helpers/toThousand";
import { ItemCount } from "../ItemCount";
export const ItemDetail = ({ product }) => {
  const { addItem } = useContext(CartContext);

  const [ productInCart, setProductInCart ] = useState(false);

  const navigate = useNavigate();

  const onAdd = (counter) => {
    addItem(product, counter);
    setProductInCart(true);
  };

  const { title, description, price, pictureUrl, stock } = product;

  return (
    <>
      <Grid item>
        <ImageListItem className="animate__animated animate__zoomIn" sx={{ width: 600 }}>
            <img src={pictureUrl} alt={`imagen de ${title}`} />
        </ImageListItem>
      </Grid>

      <Grid container direction="column" sx={{ gap: 2 }}>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="p">{description}</Typography>
        <Typography variant="p" color="price.main" sx={{fontSize: "18px"}}>
          ${ toThousand( price ) }
        </Typography>

            <Typography 
              variant="span" 
              color="white.main"
              sx={{ 
                backgroundColor: 'primary.main', 
                width: 'fit-content', 
                px: 2,
                borderRadius: 1
              }}
            >
              Stock: {stock}
            </Typography>

        { !productInCart && ( <ItemCount stock={stock} min={stock === 0 ? 0 : 1} onAdd={onAdd} /> ) } {/* si el producto esta en el carrito desaparece el boton de agregar al carrito */}
        
        { stock === 0 && ( <Typography color="error.main">Agotado</Typography>) } {/* si el stock es igual a 0, muestra el mensaje de "agotado" */}

        { (productInCart && stock > 0 ) && ( /* si el producto ya esta en el carrito aparece el boton de ir al carrito */
              <Button
                variant="contained"
                sx={{ width: "fit-content" }}
                onClick={ ()=> navigate('/cart') }
              >
                Ir al carrito 
              </Button>
            )
        }


      </Grid>
    </>
  );
};
