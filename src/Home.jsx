
import React, { useRef, useEffect, } from 'react'
import useWebSocket from "react-use-websocket";
import throttle from 'lodash.throttle';
import { Cursor } from './components/Cursor';
const wsURL = "ws://127.0.0.1:8000";


const rednerCursors = users => {
    return Object.keys(users).map(uid => {
        const user = users[uid];
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16)
        return (
            <Cursor key={uid} username={user?.username || "Unknown"} point={[user.state.x, user.state.y]} color={"red"} />
        )
    })
}


function Home({ username }) {
    // const wsURL = process.env.REACT_APP_WS_URL;
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(wsURL, {
        queryParams: { username }
    });

    const THROTTLE = 50; // 50ms

    const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE))


    useEffect(() => {
        if (!lastJsonMessage) {
            sendJsonMessage({ x: 0, y: 0 });
        }

        const handleMouseMove = (e) => {
            sendJsonMessageThrottled.current({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Cleanup to remove the event listener
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [])

    if (lastJsonMessage) {
        return (<>
            {rednerCursors(lastJsonMessage)}
        </>)
    }

    return (
        <h1>{`Hello ${username}`}</h1>
    )
}

export default Home