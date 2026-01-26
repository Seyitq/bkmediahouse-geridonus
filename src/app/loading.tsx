export default function Loading() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-zinc-800" />
                    <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin" />
                </div>
                <p className="text-zinc-500 text-sm">Yükleniyor...</p>
            </div>
        </div>
    )
}
