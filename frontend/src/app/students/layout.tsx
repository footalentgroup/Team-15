"use client"
import { useEffect, useState } from 'react'
import Sidebar from '@/components/sidebar/sidebar'
import { ICourses } from '@/interfaces/ICourses.interface'
import { getCourses } from '@/actions/getCourse.action'

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isVisible, setIsVisible] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [currentCourse, setCurrentCourse] = useState<ICourses[] | undefined>(undefined)

    const fetchCourses = async () => {
        await getCourses().then((response) => {
            const data = Array.isArray(response.data) ? response.data : undefined
            setCurrentCourse(data)
        })
    }

    useEffect(() => {
        if (!currentCourse) {
            fetchCourses()
        }
    }, [])

    return (
        <div className='bg-[#FFFAEB] min-h-screen'>
            <Sidebar currentCourse={currentCourse ? currentCourse![0] : undefined} isVisible={isVisible} setIsVisible={setIsVisible} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            <div className='h-screen ms-32'>
                {children}
            </div>
        </div>
    )
}