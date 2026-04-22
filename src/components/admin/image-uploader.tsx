'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Loader2, ImageIcon, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SingleImageUploaderProps {
    value: string
    onChange: (url: string) => void
    label?: string
    multiple?: false
}

interface MultiImageUploaderProps {
    values: string[]
    onMultiChange: (urls: string[]) => void
    label?: string
    multiple: true
}

type ImageUploaderProps = SingleImageUploaderProps | MultiImageUploaderProps

export function ImageUploader(props: ImageUploaderProps) {
    const [isUploading, setIsUploading] = useState(false)
    const [isDragOver, setIsDragOver] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const uploadFile = useCallback(async (file: File): Promise<string | null> => {
        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || 'Yükleme başarısız')
                return null
            }

            return data.url
        } catch {
            setError('Yükleme sırasında bir hata oluştu')
            return null
        }
    }, [])

    const handleFiles = useCallback(async (files: FileList | File[]) => {
        setError(null)
        setIsUploading(true)

        try {
            if (props.multiple) {
                // Multi-image mode
                const fileArray = Array.from(files)
                const uploadPromises = fileArray.map(f => uploadFile(f))
                const urls = await Promise.all(uploadPromises)
                const validUrls = urls.filter((u): u is string => u !== null)

                if (validUrls.length > 0) {
                    props.onMultiChange([...props.values, ...validUrls])
                }
            } else {
                // Single-image mode
                const url = await uploadFile(files[0])
                if (url) {
                    props.onChange(url)
                }
            }
        } finally {
            setIsUploading(false)
        }
    }, [props, uploadFile])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)

        if (e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files)
        }
    }, [handleFiles])

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
    }, [])

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files)
        }
        // Reset input so the same file can be re-selected
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }, [handleFiles])

    const removeImage = useCallback((index?: number) => {
        if (props.multiple && index !== undefined) {
            const newValues = props.values.filter((_, i) => i !== index)
            props.onMultiChange(newValues)
        } else if (!props.multiple) {
            props.onChange('')
        }
    }, [props])

    // Single image mode
    if (!props.multiple) {
        const hasImage = !!props.value

        return (
            <div className="space-y-3">
                {/* Error */}
                <AnimatePresence>
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
                        >
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>

                {hasImage ? (
                    /* Preview */
                    <div className="relative group rounded-lg overflow-hidden border border-zinc-700">
                        <div
                            className="aspect-video bg-zinc-100 bg-cover bg-center"
                            style={{ backgroundImage: `url(${props.value})` }}
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => fileInputRef.current?.click()}
                                className="text-white hover:bg-white/20"
                            >
                                <Upload className="h-4 w-4 mr-1" />
                                Değiştir
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeImage()}
                                className="text-red-400 hover:bg-red-500/20"
                            >
                                <X className="h-4 w-4 mr-1" />
                                Kaldır
                            </Button>
                        </div>
                    </div>
                ) : (
                    /* Drop zone */
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={`
                            aspect-video rounded-lg border-2 border-dashed cursor-pointer
                            flex flex-col items-center justify-center gap-2 transition-all
                            ${isDragOver
                                ? 'border-white bg-white/5 scale-[1.02]'
                                : 'border-zinc-700 bg-zinc-100/50 hover:border-zinc-500 hover:bg-zinc-100'
                            }
                            ${isUploading ? 'pointer-events-none' : ''}
                        `}
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="h-8 w-8 text-zinc-400 animate-spin" />
                                <p className="text-sm text-zinc-400">Yükleniyor...</p>
                            </>
                        ) : (
                            <>
                                <Upload className="h-8 w-8 text-zinc-500" />
                                <p className="text-sm text-zinc-400">
                                    Sürükle & bırak veya tıkla
                                </p>
                                <p className="text-xs text-zinc-600">
                                    JPEG, PNG, WebP, GIF • Max 25MB
                                </p>
                            </>
                        )}
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleFileSelect}
                    className="hidden"
                />
            </div>
        )
    }

    // Multiple images mode
    return (
        <div className="space-y-3">
            {/* Error */}
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>

            {/* Image grid */}
            <div className="grid grid-cols-3 gap-2">
                <AnimatePresence>
                    {props.values.map((url, index) => (
                        <motion.div
                            key={url}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="relative group aspect-square rounded-lg overflow-hidden border border-zinc-700"
                        >
                            <div
                                className="w-full h-full bg-zinc-100 bg-cover bg-center"
                                style={{ backgroundImage: `url(${url})` }}
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 p-1 rounded-full bg-black/70 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/30"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Add button */}
                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`
                        aspect-square rounded-lg border-2 border-dashed cursor-pointer
                        flex flex-col items-center justify-center gap-1 transition-all
                        ${isDragOver
                            ? 'border-white bg-white/5 scale-[1.02]'
                            : 'border-zinc-700 bg-zinc-100/50 hover:border-zinc-500 hover:bg-zinc-100'
                        }
                        ${isUploading ? 'pointer-events-none' : ''}
                    `}
                >
                    {isUploading ? (
                        <Loader2 className="h-6 w-6 text-zinc-400 animate-spin" />
                    ) : (
                        <>
                            <Plus className="h-6 w-6 text-zinc-500" />
                            <p className="text-xs text-zinc-500">Ekle</p>
                        </>
                    )}
                </div>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                multiple
                onChange={handleFileSelect}
                className="hidden"
            />
        </div>
    )
}
