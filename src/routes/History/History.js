import './History.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react';
import Chart1 from '../../components/Chart1';
import HistoryStats from '../../components/Title/HistoryStats/HistoryStats';

function History() {

    const [user, setUser] = useState('')

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/performers')
            .then(res => {
                let name = res.data.performers[0].name
                setUser(name)
            })
    }, [])

    const navigate = useNavigate();

    const initiateClick = function() {
        navigate('/Initiate')
    }

    const contactClick = function() {
        navigate('/Contact')
    }

    const loginClick = function() {
        navigate('/')
    }

    return(
        <>  
            <button id='home-button-history-top' onClick={initiateClick}>Go Home</button><br></br>
            <h3>Stats for {user}</h3>
            <Chart1 /><br></br>
            <HistoryStats /><br></br>
            <button id='home-button' onClick={initiateClick}>Go Home</button>
            <button id='logout-button' onClick={loginClick}>Log Out</button><br></br>
            <button id='contact-button' onClick={contactClick}>Contact</button>

        </>
    )
}

export default History