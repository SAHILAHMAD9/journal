import HTMLFlipBook from "react-pageflip";
import JournalCard from "@/components/JournalCard";
import Image from "next/image";

export default function JournalBook({ journals, onDelete }) {
    if (!journals || journals.length === 0) return <p>No entries found.</p>;

    return (
        <div className="relative flex justify-center">
            <HTMLFlipBook
                width={400}
                height={600}
                size="stretch"
                minWidth={320}
                maxWidth={1000}
                minHeight={600}
                maxHeight={1536}
                maxShadowOpacity={0.5}
                showCover={true}
                // className="md:shadow-none shadow-xl rounded-md"
                mobileScrollSupport={true}
                drawShadow={true}
            >
                {/* Cover */}
                <div className="relative bg-teal-950 text-center h-full flex items-center gap-2 justify-center text-3xl rounded-md text-pink-700">
                    <Image className="absolute md:left-[30px] left-[10px] md:w-[400px] md:h-[500px] z-10" alt="Journal Cover" width={200} height={300} src={'/images/frontpagemain.png'}/>
                    <Image className="absolute rounded-r-lg right-0  -top-[1px] z-10" alt="Journal Cover" width={100} height={100} src={'/images/frontpage.png'}/>
                    <Image className="absolute -rotate-[20deg] rounded-r-lg -right-[16px]  -bottom-[13px] z-10" alt="Journal Cover" width={200} height={200} src={'/images/flowers.png'}/>
                    <div className="absolute left-0 top-0 bottom-0 w-6 md:w-8 bg-pink-800 rounded-l-lg z-10 flex items-center justify-center">
                        <div className="h-5/6 w-1 bg-pink-600"></div>
                    </div>
                    {/* <p className=""> My Journal</p> */}

                </div>

                {journals.map((journal, idx) => (
                    <div key={journal._id} className="bg-rose-900 rounded-md p-4 sm:p-6">
                        <JournalCard key={journal._id} journal={journal} onDelete={onDelete} />
                        {/* Optional: Page Number */}
                        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-xs text-pink-700 ">
                            Page {idx + 1}
                        </div>
                    </div>
                ))}
                {/* Back cover */}
                <div className="bg-teal-950 flex text-center items-center justify-center rounded-md text-pink-700 italic">
                    <div className="absolute right-0 top-0 bottom-0 w-6 md:w-8 bg-pink-800 rounded-r-lg z-10 flex items-center justify-center">
                        <div className="h-5/6 w-1 bg-pink-600"></div>
                    </div>
                    {/* ✨ End of Entries ✨ */}
                </div>
            </HTMLFlipBook>
        </div>
    );
}
