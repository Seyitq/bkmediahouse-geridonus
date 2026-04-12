export default function Loading() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-zinc-200" />
                    <div className="absolute inset-0 rounded-full border-4 border-zinc-900 border-t-transparent animate-spin" />
                </div>
                <p className="text-zinc-500 text-sm">Yükleniyor...</p>
            </div>
        </div>
    )
}
