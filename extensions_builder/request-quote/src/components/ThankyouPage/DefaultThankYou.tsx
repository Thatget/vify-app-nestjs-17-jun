import {Box, Button, Card, CardMedia, Modal, Typography} from '@mui/material';
import {useEffect, useState} from "react";
// import React from 'react'
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type Props = {
    isOpen: boolean;
    handleModal: (modal: string) => void;
    form: string,
    dataSettings: Array<quoteEntity>
}
type quoteEntity = {
    name: string;
    value: string;
}

const DefaultThankYou = ({isOpen, handleModal, form, dataSettings}: Props) => {
    const initialValue: quoteEntity = {
        name: '',
        value: ''
    }
    const [thank_title, setThankTitle] = useState<quoteEntity>(initialValue)
    const [thank_content, setThankContent] = useState<quoteEntity>(initialValue)
    const [shopping_button, setShoppingButton] = useState<quoteEntity>(initialValue)
    useEffect(() => {
        dataSettings.map(setting => {
            let temp: quoteEntity = {
                name: setting.name,
                value: setting.value
            }
            if (temp.name === "thank_title") setThankTitle(temp)
            if (temp.name === "thank_content") setThankContent(temp)
            if (temp.name === "shopping_button") setShoppingButton(temp)
        })
    }, [])
    const closeThankyou = () => {
        handleModal('');
    }
    return (
        <>
            <Modal
                open={isOpen}
                onClose={closeThankyou}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.2}}>
                        <Typography variant="h5" sx={{
                            m: 1,
                            fontWeight: 700
                        }}>{thank_title.value || 'Thank you so much for choosing us'}</Typography>
                    </Box>
                    <Card sx={{display: 'flex', mr: 1, width: '100%', mb: 0.5}}>
                        <CardMedia
                            component="img"
                            sx={{width: 200, m: 1}}
                            image="https://png.pngtree.com/png-vector/20220903/ourmid/pngtree-thank-you-text-decorated-by-floral-ornaments-png-image_6136789.png"
                            alt=""
                        />
                        <div style={{margin: 0.5}}>
                            <Typography variant="body1"
                                        sx={{m: 1}}>{thank_content.value || 'Have a good day and continue shopping'}</Typography>
                            <Button onClick={closeThankyou}>{shopping_button.value || 'Continue Shopping'}</Button>
                        </div>
                    </Card>
                </Box>
            </Modal>
        </>
    )
}

export default DefaultThankYou