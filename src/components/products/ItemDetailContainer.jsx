import { Grid } from "@mui/material"
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../services/firebase/firebase";
import { ItemDetail } from "./"
import { ClipLoader } from "react-spinners";


export const ItemDetailContainer = () => {

  const { id } = useParams();
  const [selectedItem, setSelectedItem] = useState();  
  const [load, setLoad] = useState(true) 
  const getSelected = async ( idItem ) => { // trae el producto seleccionado segun el id
      try {
          const document = doc(db, "products", idItem)
          const response = await getDoc(document)
          const result = { id: response.id, ...response.data() }
          setSelectedItem(result)
          setLoad(false)
      } catch (error) {
          console.log(error)
      }
  }

  useEffect(() => {
      getSelected(id)
  }, [id]) // se ejecuta cada vez que el id cambia
 

  return (
    <Grid 
      container 
      direction="row"
      justifyContent="center"
      sx={{ m: 3, p: 2, borderRadius: 1, flexWrap: 'noWrap', width: '98%' }}
      className="shadow"
    >
      {
        load ? <ClipLoader color="primary.main" size={100}/> /* muestra un espiner mientras el fetch esta en proceso */
              :  <ItemDetail product={ selectedItem }/> 
      }
    </Grid>
  )
}
