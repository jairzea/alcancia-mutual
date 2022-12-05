import { useState } from 'react';
import Slide from '@mui/material/Slide';
import piggyBank from '../../assets/piggyBank.png'
import { Grid, Button, Tooltip } from '@mui/material';
import { fifty, fiveHundred, oneHundred, oneThousand, twoHundred, wallet } from '../../assets';
import { save } from '../../services/apis/savingsService';
import SeeSavings from '../SeeSavings/SeeSavings';

const Currency = () => {

    const [checked, setChecked] = useState(false);
    const [coinPath, setCoinPath] = useState(false);
    const [coin, setCoin] = useState(false);
    const [disable, setDisable] = useState(false);
    const [showSavings, setShowSavings] = useState(false);

    const handleTransition = (img, coin) => {
        setDisable(true)
        setCoin(coin)
        setCoinPath(img)
        setChecked((prev) => {
            !prev && setTimeout(() => {
                        setCoinPath(false)
                        setChecked(prev)
                        setDisable(false)
                    }, 70);
            return !prev
        });
    }

    const handleSavings = (coin) => {
        save(coin).then(response =>{
            console.log(response);
        }).catch(error => console.log(error))
    }

    const handleChange = (img, coin) => {
        handleTransition(img, coin)
        handleSavings(coin)
    };

    const coins = [ 
    {
        img: fifty,
        value: 50
    }, 
    {
        img: oneHundred,
        value: 100
    }, 
    {
        img: twoHundred,
        value: 200
    }, 
    {
        img: fiveHundred,
        value: 500
    }, 
    {
        img: oneThousand,
        value: 1000
    }]

    const handleClose = () => setShowSavings(false);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                {coins.map(({img, value}, key) => (
                    <Tooltip title={"Presioname para ahorra " + value + " pesos"} key={key}>
                        <Button onClick={() => handleChange(img, value)} disabled={disable}>
                            <img src={img} className="App-currrency" alt="porky" />
                        </Button>
                    </Tooltip>
                ))}
                </Grid>
                <Grid item xs={10.1}>
                    <img src={wallet} className="wallet" alt="porky" /></Grid>
                <Grid item xs={12}>
                    {coinPath && (<Slide direction="down" in={checked} mountOnEnter unmountOnExit>
                        <img src={coinPath} className="move-coin" alt="coin" id={`${coin}-pesos`} />
                    </Slide>)}
                    <img src={piggyBank} className="App-porky" alt="porky" />
                </Grid>
                <Grid item xs={12}>
                <Button variant='contained' color='success' onClick={ () => setShowSavings(!showSavings) }>Ver mis ahorros</Button>
                </Grid>
            </Grid>
            {showSavings && <SeeSavings show={showSavings} updateStatusClose={handleClose} coins={coins}/>}
        
        </>
    );
}

export default Currency