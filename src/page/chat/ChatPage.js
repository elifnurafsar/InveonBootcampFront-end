import React from 'react'
import Header from '../../components/Common/Header'
import Banner from '../../components/Common/Banner'
import ChatComponent from '../../components/Chat'
import Footer from '../../components/Common/Footer'

const ChatPage = () => {
    return (
        <>
            <Header/>
            <Banner title="Chat - Help" />
            <ChatComponent/>
            <Footer/>

        </>
    )
}

export default ChatPage