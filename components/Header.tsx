import { BookOpen, FilePen } from "lucide-react"
import Link from "next/link"

function Header() {
  return (
    <header className="relative p-16 text-center">
        <Link href='/'>
            <h1 className="text-6xl font-black">StoryTeller</h1>
            <div className="flex justify-center whitespace-nowrap  space-x-5 text-3xl lg:text-5xl">
                <h2>Bring your thoughts</h2>
                <div className="relative">
                    <div className="absolute bg-purple-500 -left-2 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-bottom-0 md:-right-3 -rotate-1 "/>
                    
                    <p className="relative text-white">To life!</p>
                    
                </div>
            </div>
        </Link>
        {/*Nav icons */}
        <div className=" absolute -top-5 right-5 flex space-x-2">
            <Link href="/">
            <FilePen
                className="w-10 h-10 lg:w-12 lg:h-12 mx-auto text-purple-500 
                mt-10 border-purple-500 p-2 rounded-md hover:opacity-50 cursor-pointer"
            />
            </Link>
            <Link href='/stories'>
            <BookOpen
                className="w-10 h-10 lg:w-12 lg:h-12 mx-auto text-purple-500 
                mt-10 border-purple-500 p-2 rounded-md hover:opacity-50 cursor-pointer"
            />

            </Link>
        </div>

    </header>
  )
}

export default Header