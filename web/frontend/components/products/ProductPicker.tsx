import { useEffect, useRef, useState } from "react";
import '../../css/style.css'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useAppQuery} from "../../hooks";
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
  const [open, setOpen] = useState(false)
  const [list, setList] = useState([]);
  const [title, setTitle] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const modalContentRef = useRef<HTMLDivElement | null>(null);
  let url = '';
  if (title) {
    url = `/api/products/select?title=${title}&page=${page}`;
  } else {
    url = `/api/products/select?page=${page}`;
  }
  const { data, isLoading } = useAppQuery<Product[]>({
    url,
    reactQueryOptions: {
      onSuccess: () => {
        if(data) {
          setList([...data])
        }
      }
    },
  })

  useEffect(() => {
    if (data) {
      setList([...data]);
    }
  }, [data])
  const handleChangeTitle = (title: string) => {
    setTitle(title);
    setList([]);
    setPage(0);
  }

  const handleScroll = () => {
    const modalContent = modalContentRef.current;
    if (modalContent) {
      const isBottom =
        modalContent.scrollTop + modalContent.clientHeight + 100 >= modalContent.scrollHeight;
      if (isBottom && !isLoading && data) {
        setPage(prevPage => prevPage + 1);
      }
    }
  };

    const modalContent = modalContentRef.current;
    if (modalContent) {
      modalContent.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (modalContent) {
        modalContent.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isLoading, data]);

  return (
    <>
      <Box display="flex" justifyContent="flex-end" alignItems="flex-end" >
        <Button variant="contained" onClick={() => { setOpen(true) }} >Select Products</Button>
        <Modal open={open} onClose={() => setOpen(false)} >
          <Box sx={style}>
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
