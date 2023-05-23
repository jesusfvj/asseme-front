import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../BaseComponents/Button'
import { Typography } from '../../BaseComponents/Typography'

export const ModalToLogin = () => {
    const navigate = useNavigate()
    return (
        <div className={`relative flex flex-col items-center justify-center gap-8 bg-[url('https://res.cloudinary.com/diek1olu2/image/upload/v1684833309/ASSEME%20-%20visual/mesh-708_tgaqzp.png')] w-[80vw] h-[90vh] rounded-lg`}>
            <Typography
                text="You need to be logged in to upload gifs."
                type="important"
                color="yellow"
            />
            <div className="flex gap-1">
                <Typography
                    text="Press"
                    type="p0"
                    color="white"
                />
                <Typography
                    text="accept"
                    type="p0"
                    color="blue"
                />
                <Typography
                    text="to continue to the log in page (your data will be saved),"
                    type="p0"
                    color="white"
                />
            </div>
            <div className="flex gap-1">
                <Typography
                    text="or"
                    type="p0"
                    color="white"
                />
                <Typography
                    text="cancel"
                    type="p0"
                    color="blue"
                />
                <Typography
                    text="to go back to the home page."
                    type="p0"
                    color="white"
                />
            </div>
            <div className='flex gap-10'>
                <div className='w-[20vw] h-10'>
                    <Button
                        text="accept"
                        color="blue"
                        size="sm"
                        onClick={() => {
                            navigate('/loginregister');
                        }}
                    />
                </div>
                <div className='w-[20vw] h-10'>
                    <Button
                        text="cancel"
                        color="danger"
                        size="sm"
                        onClick={() => {
                            navigate('/');
                        }}
                    />
                </div>
            </div>
        </div >
    )
}
