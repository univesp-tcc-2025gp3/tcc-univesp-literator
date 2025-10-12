import { Header } from "../components/header";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase-config";
import { useEffect, useState } from "react";

import { Timestamp } from "firebase/firestore";

interface IBooks {
  id: string
  name_book: string
  price_book: number
  price_return: number
  created_at: Timestamp
}

export function Admin() {
  const [books, setBooks] = useState<IBooks[]>([])
  async function handleGetData() {
    const data = await getDocs(collection(db, "sales"));
    setBooks(data.docs.map(doc => ({ id: doc.id, ...doc.data() })) as IBooks[])
  }

  useEffect(() => {
    handleGetData()
  }, [])

  const totalReturn = books.reduce((acc, book) => acc + book.price_return, 0);

  return (
    <div className="h-full flex flex-col gap-4">
      <Header />


      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Histórico de Vendas</h1>
            <p className="mt-2 text-sm text-gray-700">
              Uma lista de todas as vendas de livros registradas no sistema.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle px-6">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Nome do Livro</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Preço do livro (R$)</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Retorno (R$)</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Data da venda</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {books.length > 0 ? (
                      books.map((book) => (
                        <tr key={book.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{book.name_book}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{book.price_book.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                            <p className="bg-green-100 text-green-800 font-semibold me-2 px-2.5 py-0.5 rounded-sm border border-green-400 w-auto">
                              {book.price_return.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </p>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{book.created_at.toDate().toLocaleDateString('pt-BR')}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-4 px-3 text-center text-sm text-gray-500">
                          Nenhum registro de venda encontrado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                  {books.length > 0 && (
                    <tfoot>
                      <tr>
                        <td colSpan={2} className="py-4 pl-4 pr-3 text-right text-sm font-semibold text-gray-900 sm:pl-6">
                          Total
                        </td>
                        <td className="px-3 py-4 text-left text-sm font-semibold text-gray-900">
                          {totalReturn.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </td>
                        <td className="py-4 pl-3 pr-4 text-sm text-gray-500 sm:pr-6" />
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}