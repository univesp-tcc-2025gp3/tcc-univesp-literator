import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth-context";
import { useNavigate } from 'react-router-dom';
import { Header } from "../components/header";

import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Loading } from "../components/loading";

interface ISearchBooks {
  title: string
  author_name: string
  first_publish_year: number
  edition_count: number
  cover_i: number
}

export function Dashboard() {
  const { user, loading } = useAuth();
  const [books, setBooks] = useState<ISearchBooks[]>([]);
  const [searchBook, setSearchBook] = useState('');
  const navigate = useNavigate();
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [favoriteBooks, setFavoriteBooks] = useState<ISearchBooks[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [loading, user]);

  async function searchBooks() {
    setBooks([]);
    if (searchBook.trim() === '') return;

    setLoadingBooks(true)

    const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(searchBook)}&limit=20`);
    const data = await response.json();
    const aux_books = [] as ISearchBooks[];
    data.docs.forEach((doc: any) => {
      aux_books.push({
        title: doc.title,
        author_name: doc.author_name.toString(),
        first_publish_year: doc.first_publish_year,
        edition_count: doc.edition_count,
        cover_i: doc.cover_i
      });
    });

    setBooks(aux_books);
    setLoadingBooks(false)
  }

  function handleAddFavorite(book: ISearchBooks) {
   
    const isAlreadyFavorite = favoriteBooks.some(favBook => favBook.cover_i === book.cover_i);
    if (isAlreadyFavorite) {
      setFavoriteBooks(favoriteBooks.filter(favBook => favBook.cover_i !== book.cover_i));
    } else {
      setFavoriteBooks([...favoriteBooks, book]);
    }
  
  }

  return (
    <div className="h-full flex flex-col gap-4">
      <Header />

      {loadingBooks && (
        <Loading />
      )}
      <div className="p-6 flex flex-col gap-6">
        <div className="w-full justify-center flex items-center gap-3">
          <input value={searchBook} onChange={(e) => setSearchBook(e.target.value)} type="text" placeholder="Pesquisar livros..." className="border border-gray-300 rounded py-2 px-4 w-[460px]" />
          <button disabled={loadingBooks} onClick={searchBooks} className="bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-blue-700 transition duration-300 w-[220px] max-sm:w-full disabled:opacity-50 disabled:cursor-not-allowed">
            Pesquisar
          </button>

          <button onClick={() => {setSearchBook(''); setBooks([]);}} className="bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-gray-700 transition duration-300 w-[220px] max-sm:w-full disabled:opacity-50 disabled:cursor-not-allowed">
            Limpar pesquisa
          </button>
        </div>

        <div className="w-full flex flex-col gap-0.5 justify-start items-center max-h-[520px] overflow-y-auto">
          {books.length > 0 && books.map((book) => (
            <div className="flex flex-col border border-gray-300 rounded p-2 w-[600px] bg-white" key={book.cover_i}>
              <div className="flex flex-col gap-0.5">
                <div className="w-full flex justify-between items-center border-b border-gray-300 pb-1">
                  <h1 className="font-semibold text-md">{book.title}</h1>
                  <button onClick={() => handleAddFavorite(book)}>

                    {favoriteBooks.some(favBook => favBook.cover_i === book.cover_i) ? (
                      <StarIcon sx={{ cursor: 'pointer', fontSize: '28px', color: '#fbbf24' }} />
                    ) : (
                      <StarBorderIcon sx={{ cursor: 'pointer', fontSize: '28px' }} />
                    )}
                  </button>
                  
                </div>
                <p className="text-gray-500 font-semibold text-sm underline">Autor: <span className="text-black inline-block">{book.author_name}</span></p>
                <p className="text-gray-500 font-semibold text-sm underline">Ano de publicação: <span className="text-black inline-block">{book.first_publish_year}</span></p>
                <p className="text-gray-500 font-semibold text-sm underline">Edições: <span className="text-black inline-block">{book.edition_count}</span></p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center gap-4 mt-10 w-[1200px] m-auto">
          <h1 className="font-semibold text-3xl border-b border-gray-300 pb-1">Meus favoritos</h1>
          

          <div className="w-full flex flex-col gap-0.5 justify-start items-center">
            {favoriteBooks.length > 0 ? favoriteBooks.map((book) => (
              <div className="flex flex-col border border-gray-300 rounded p-2 w-full bg-white" key={book.cover_i}>
                <div className="flex flex-col gap-0.5">
                  <div className="w-full flex justify-between items-center border-b border-gray-300 pb-1">
                    <h1 className="font-semibold text-md">{book.title}</h1>
                    
                      <button onClick={() => handleAddFavorite(book)}>
                        <StarIcon sx={{ cursor: 'pointer', fontSize: '28px', color: '#fbbf24' }} />
                      </button>
                  
                  </div>
                  <p className="text-gray-500 font-semibold text-sm underline">Autor: <span className="text-black inline-block">{book.author_name}</span></p>
                  <p className="text-gray-500 font-semibold text-sm underline">Ano de publicação: <span className="text-black inline-block">{book.first_publish_year}</span></p>
                </div>
              </div>
            )) : (
              <p className="text-gray-500 text-xl">Nenhum livro favorito encontrado.</p>
            )}
          </div>

        </div>

      </div>
    </div>

  )
}