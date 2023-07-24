import React, {useCallback, useEffect, useState} from "react";
import '../../css/style.css'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useAppQuery, useAuthenticatedFetch} from "../../hooks";
import { Modal, TextField, Typography } from "@mui/material";

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
};

export default function ProductPicker(props: any) {
  const [open, setOpen] = useState(false)
  const [list, setList] = useState([]);
  const [title, setTitle] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  // const [url, setUrl] = useState('/api/products/select');
  const [selectedProducts, setSelectedProducts] = useState([]);

  const fetchData = useCallback(() => {
    useAppQuery({
      url: `/api/products/select?title=${title}?page=${page}`,
      reactQueryOptions: {
        onSuccess: () => {
        }
      },
    })
  }, [title, page])

  const { data } = fetchData();
  useEffect(() => {
    if (data) {
      setList(list => [...list, ...data]);
    }
  }, [title, page])

  const handleChangeTitle = (title: string) => {
    setTitle(title);
    setList([]);
    setPage(0);
  }

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
                return <div>{item.title}</div>
              })}
            </div>
          </Box>
        </Modal>
      </Box>
    </>
  )
}
