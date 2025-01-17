import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='bg-[#FFFAEB] min-h-screen'>
            {children}
        </div>
    )
}