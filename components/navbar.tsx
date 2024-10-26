import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Free Films
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:text-gray-300">
              Início
            </Link>
          </li>
          <li>
            <Link href="/busca" className="hover:text-gray-300">
              Busca
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}