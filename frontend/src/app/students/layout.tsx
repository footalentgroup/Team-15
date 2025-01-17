"use client"
import { useState } from 'react'
import Sidebar from '@/components/sidebar/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isVisible, setIsVisible] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className='bg-[#FFFAEB] min-h-screen'>
            <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            <div className='h-screen ms-32'>
                {children}
            </div>
        </div>
    )
}