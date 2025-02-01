"use client"
import { useEffect, useState } from 'react'
import Sidebar from '@/components/sidebar/sidebar'
import { ICourses } from '@/interfaces/ICourses.interface'

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isVisible, setIsVisible] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [currentCourse, setCurrentCourse] = useState<ICourses | undefined>(undefined)

    useEffect(() => {
        if (!currentCourse) {
            const currentCourse = window.localStorage.getItem('currentCourse')
            if (currentCourse) {
                setCurrentCourse(JSON.parse(currentCourse))
            }
        }
    }, [])

    return (
        <div className='bg-[#FFFAEB] min-h-screen flex'>
            <Sidebar currentCourse={currentCourse ? currentCourse : undefined} isVisible={isVisible} setIsVisible={setIsVisible} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            <div className='h-screen w-full overflow-y-auto ms-8'>
                {children}
            </div>
        </div>
    )
}