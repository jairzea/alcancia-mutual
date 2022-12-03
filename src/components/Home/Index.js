import piggyBank from '../../assets/piggyBank.png'
import { Button } from '@mui/material';
import Currency from '../Currency/Currency';
import { useState } from 'react';

const Home = () => {

    const [showCurrencys, setShowCurrency] = useState(false)


    return(
        <>
            {!showCurrencys && (
                <>
                    <img src={piggyBank} className="App-logo" alt="porky" />
                    <p>Comencemos a Ahorrar</p>
                    <Button variant="contained" color='primary' onClick={() => setShowCurrency(true)}>Mi alcancia</Button>
                </>)}
            {showCurrencys && <Currency/>}
            
        </>
    )
}

export default Home