import '../App.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react';
import Chart1 from './Chart1';
import HistoryStats from './HistoryStats';


function History() {

    const [sessionHistory, setSessionHistory] = useState([])
    const [user, setUser] = useState('')
    const [averageTime, setAverageTime] = useState('')


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/history')
            .then(res => {
                let data = res.data.practice_sessions

                // Reversing array data to show newest first
                // Not sure why thing needs an arrow => to thing again.  This works though.
                let reversedData = data.map(thing => thing).reverse();
                setSessionHistory(reversedData)

                // Finding Average Time Here
                let totalTime = 0
                for (let i=0; i < data.length; i+=1) {
                    totalTime += data[i].length
                }
                let averagePracticeAmountFloat = totalTime / data.length
                let averagePracticeAmountDisplay = averagePracticeAmountFloat.toFixed(1)
                setAverageTime(averagePracticeAmountDisplay)
            })
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

    // console.log(sessionHistory)
    // console.log(user)

    return(
        <>  
            <h3>Stats for {user}</h3>
            <button onClick={initiateClick}>Go Home</button><br></br>
            <Chart1 /><br></br>
            <HistoryStats /><br></br>
            <button onClick={initiateClick}>Go Home</button><br></br>
            <button onClick={contactClick}>Contact</button><br></br>
            <button onClick={loginClick}>Log Out</button>
        </>
    )
}

export default History