import { useEffect, useRef, useState } from "react";
import '../../css/style.css'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useAppQuery, useAuthenticatedFetch} from "../../hooks";
import { Modal, TextField, Typography } from "@mui/material";
import Product from "../../types/Product";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: '300px',
  overflowY: 'auto',
};

export default function ProductPicker() {
  const fetch = useAuthenticatedFetch();
  const [open, setOpen] = useState(false)
  const [list, setList] = useState([]);
  const [title, setTitle] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true)
  let url = '';
  if (title) {
    url = `/api/products/select?title=${title}&page=${page}`;
  } else {
    url = `/api/products/select?page=${page}`;
  }

  const handleChangeTitle = (title: string) => {
    setTitle(title);
    setList([]);
    setPage(0);
  }

  const fetchProducts = async (title: string, page?: number) => {
    setIsLoading(true);
    try {
      let url = '';
      if (title) {
        url = `/api/products/select?title=${title}&page=${page}`;
      } else {
        url = `/api/products/select?page=${page}`;
  }
      const response = await fetch(url, { method: 'GET' });
      const data = await response.json();
      if (data) {
        setList( preList => [ ...preList, ...data]);
      }
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const handleModalScroll = (event: { target: { scrollTop: any; clientHeight: any; scrollHeight: any; }; }) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    if (scrollHeight - scrollTop === clientHeight && !isLoading) {
      setPage(prePage => prePage + 1);
      fetchProducts(title);
    }
  };

  useEffect(() => {
    fetchProducts(title);
  }, [title])
  
  return (
    <>
      <Box display="flex" justifyContent="flex-end" alignItems="flex-end" >
        <Button variant="contained" onClick={() => { setOpen(true) }} >Select Products</Button>
        <Modal open={open} onClose={() => setOpen(false)} >
          <Box sx={style} onScroll={handleModalScroll}>
            <Typography id="modal-modal-title" variant="h6" component="h2">Add products</Typography>
            <TextField id="outlined-basic" label="Product" onChange={event => handleChangeTitle(event.target.value)} variant="outlined" fullWidth />
            <div>
              {list  && list.map(item => {
                return (<div>
                  <input type="checkbox" />{item.title}
                  <div>
                    { item.variants.map((variant: {price: string; title: string}) => {
                      return <div style={{ marginLeft: '12px', display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                        <div><input type="checkbox" /> {variant.title}</div>
                        <div>{variant.price}</div>
                      </div>
                    }) }
                  </div>
                </div>)
              })}
            </div>
          </Box>
        </Modal>
      </Box>
    </>
  )
}
