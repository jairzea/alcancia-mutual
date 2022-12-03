import { useEffect, useState } from "react"
import { Modal } from "@mui/material"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getCurrentAmount, getCurrentValue } from "../../services/apis/savingsService";
import SeeCurrency from "./SeeCurrency/SeeCurrency";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const SeeSavings = ({show, updateStatusClose, coins}) => {

    const [open, setOpen] = useState(false);
    const [currentAmount, setCurrentAmount] = useState(0);
    const [currentValue, setCurrentValue] = useState(0);

    const handleClose = () => {
        setOpen(false)
        show = false
        updateStatusClose()
    };

    useEffect( () => {
        setOpen(show)
        getCurrentAmount().then(response => setCurrentAmount(response)).catch(error => console.log(error))
        getCurrentValue().then(response => setCurrentValue(response)).catch(error => console.log(error))
    }, [show])



    return(
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }}>
            <b>Cantidad de dinero</b> dentro de la alcancia: <b>{currentValue}</b>
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <b>Cantidad de monedas</b> dentro de la alcancia: <b>{currentAmount}</b>
          </Typography>
        <SeeCurrency coins={coins}/>
        </Box>
      </Modal>
    )
}

export default SeeSavings