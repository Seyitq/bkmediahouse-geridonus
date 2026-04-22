'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Send, User } from 'lucide-react'
import { toast } from 'sonner'
import { addTaskNote } from '@/actions/tasks'

interface Note {
    id: string
    content: string
    createdAt: Date | string
    author: {
        id: string
        name: string | null
        role: string
        image: string | null
    }
}

interface TaskNotesProps {
    taskId: string
    notes: Note[]
}

export function TaskNotes({ taskId, notes }: TaskNotesProps) {
    const [isPending, startTransition] = useTransition()
    const [noteText, setNoteText] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!noteText.trim()) return

        const formData = new FormData()
        formData.set('content', noteText)
        formData.set('taskId', taskId)

        startTransition(async () => {
            const result = await addTaskNote(formData)
            if (result?.error) {
                toast.error(result.error)
            } else {
                toast.success('Not eklendi')
                setNoteText('')
            }
        })
    }

    return (
        <Card className="border-zinc-200 bg-white">
            <CardHeader>
                <CardTitle className="text-white text-base">Notlar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Add Note Form */}
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Not ekleyin..."
                        className="flex-1 rounded-lg border border-zinc-700 bg-zinc-100 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <Button
                        type="submit"
                        disabled={isPending || !noteText.trim()}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </form>

                {/* Notes Timeline */}
                {notes.length === 0 ? (
                    <p className="text-sm text-zinc-500 text-center py-4">
                        Henüz not yok
                    </p>
                ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {notes.map((note) => (
                            <div
                                key={note.id}
                                className="flex gap-3 p-3 rounded-lg bg-zinc-100/50 border border-zinc-200"
                            >
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
                                    <User className="h-4 w-4 text-zinc-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-medium text-zinc-900">
                                            {note.author.name || 'Bilinmeyen'}
                                        </span>
                                        <span className="text-xs text-zinc-600">
                                            {note.author.role === 'ADMIN' ? 'Patron' : 'Çalışan'}
                                        </span>
                                        <span className="text-xs text-zinc-600 ml-auto">
                                            {new Date(note.createdAt).toLocaleDateString('tr-TR', {
                                                day: 'numeric',
                                                month: 'short',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </span>
                                    </div>
                                    <p className="text-sm text-zinc-700 break-words">{note.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
