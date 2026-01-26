'use client'

import { Calendar, CalendarPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface AddToCalendarProps {
    title: string
    description?: string
    startTime: Date
    endTime: Date
    location?: string
}

export function AddToCalendar({ title, description, startTime, endTime, location }: AddToCalendarProps) {
    const formatDate = (date: Date) => {
        return date.toISOString().replace(/-|:|\.\d\d\d/g, '')
    }

    const formatDateForOutlook = (date: Date) => {
        return date.toISOString()
    }

    const generateGoogleCalendarUrl = () => {
        const params = new URLSearchParams({
            action: 'TEMPLATE',
            text: title,
            dates: `${formatDate(startTime)}/${formatDate(endTime)}`,
            details: description || '',
            location: location || '',
        })
        return `https://calendar.google.com/calendar/render?${params.toString()}`
    }

    const generateOutlookUrl = () => {
        const params = new URLSearchParams({
            subject: title,
            startdt: formatDateForOutlook(startTime),
            enddt: formatDateForOutlook(endTime),
            body: description || '',
            location: location || '',
            path: '/calendar/action/compose',
            rru: 'addevent',
        })
        return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
    }

    const generateICalUrl = () => {
        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'BEGIN:VEVENT',
            `DTSTART:${formatDate(startTime)}`,
            `DTEND:${formatDate(endTime)}`,
            `SUMMARY:${title}`,
            `DESCRIPTION:${description || ''}`,
            `LOCATION:${location || ''}`,
            'END:VEVENT',
            'END:VCALENDAR',
        ].join('\n')

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
        return URL.createObjectURL(blob)
    }

    const handleDownloadIcs = () => {
        const url = generateICalUrl()
        const link = document.createElement('a')
        link.href = url
        link.download = `${title.replace(/\s+/g, '-').toLowerCase()}.ics`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                    <CalendarPlus className="mr-2 h-4 w-4" />
                    Takvime Ekle
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="bg-zinc-900 border-zinc-800">
                <DropdownMenuItem asChild>
                    <a
                        href={generateGoogleCalendarUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                    >
                        <Calendar className="mr-2 h-4 w-4" />
                        Google Calendar
                    </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <a
                        href={generateOutlookUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                    >
                        <Calendar className="mr-2 h-4 w-4" />
                        Outlook
                    </a>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownloadIcs} className="cursor-pointer">
                    <Calendar className="mr-2 h-4 w-4" />
                    Apple Calendar (.ics)
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
