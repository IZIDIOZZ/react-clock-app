import React, { useState, useEffect, useReducer, Component } from 'react';
import styles from '../css/index.module.css';
import image from '../images/clock_number.svg';

// this function get the currentTime and returns in 12 hour format
function get12HoursTime() {

    let hour = new Date().getHours();

    //divide the value by 12 if the value is equal to 0, it defines 12, otherwise, get the division value 
    hour = (hour % 12) || 12;

    const hourMod12 = {
        hour,
        minute: new Date().getMinutes(),
        seconds: new Date().getSeconds(),
    }
    return hourMod12;
}

/* 1 minute has 60 seconds, which is the time it takes to 
go around the clock, so we take the percentage completed 
for one lap in the unit seconds */

// example using SECONDS unit

// taking the percentage
// let percentsec = (23/60) * 100

 /* we assign this percentage to 360 degrees and take 
 the current value of the degree the pointer is*/

// let degreeSecond = (percentsec / 100) * 360

// then we pass the value on to a transformation

function ConvertTimeToPercentDegree(type) {
    const hour = get12HoursTime();

    let percentTime = 0;
    switch (type) {
        case 'second':
            percentTime = (hour.seconds / 60) * 100;
            break;
        case 'minute':
            percentTime = (((hour.minute) + (hour.seconds / 60)) / 60) * 100;
            break;
        case 'hour':
            percentTime = (((hour.hour) + (hour.minute / 60) + (hour.seconds / 3600)) / 12) * 100;
            break;
        default:
            return null;
    }
    return (percentTime / 100) * 360
}




/* Component Clock 
the component has an argument for the clock size
which is set to 500 if no arguments are passed
*/
function Clock({ size = 500 }) {

    const [{ degSec, degMin, degHour }, setTimeData] = useState({
        degSec: ConvertTimeToPercentDegree('second'),
        degMin: ConvertTimeToPercentDegree('minute'),
        degHour: ConvertTimeToPercentDegree('hour')
    })

    useEffect(() => {
        setInterval(() => {
            setTimeData(
                {
                    degSec: ConvertTimeToPercentDegree('second'),
                    degMin: ConvertTimeToPercentDegree('minute'),
                    degHour: ConvertTimeToPercentDegree('hour'),
                }
            )
        }, 1000);

    }, [])

    // render the Clock
    return (
        <div className={styles.container_clock} style={{ width: size }}>
            <div className={`${styles.hour_arrow}`} 
            style={{ transform: `rotate(${degHour}deg)` }}></div>

            <div className={`${styles.minute_arrow}`} 
            style={{ transform: `rotate(${degMin}deg)` }}></div>

            <div className={`${styles.second_arrow}`} 
            style={{ transform: `rotate(${degSec}deg)` }}></div>

            <img className={styles.clock_bg} height={`${size}`} width={`${size}`} src={image}></img>
        </div>

    )
}
export default Clock;