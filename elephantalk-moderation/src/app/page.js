"use client"

import { Navbar } from '@/components/interface/navbar';
import { GetReports } from '@/services/api';
import { useSession } from 'next-auth/react';
import React from 'react';
import { LuEye } from 'react-icons/lu';

export default function Home() {
  const [activePage, setActivePage] = React.useState('monitor');
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(1);
  const [reports, setReports] = React.useState([]);
  const [hasMoreReports, setHasMoreReports] = React.useState(false);

  const session = useSession();

  React.useEffect(() => {
    if (activePage === "monitor") {
      const fetchReports = async () => {
        try {
          //setIsLoading(true);
          const { data } = await GetReports({
            token: session?.data?.accessToken,
            endpoint: "monitor",
            query: `limit=${10}&page=${page}`,
          });

          setReports(data?.data?.data.reports);
          setPages(data.data?.pagination.pages);
          setHasMoreReports(data?.data?.pagination.page < data.data?.pagination.pages);

          // If the component is unmounted, don't update the state.
          //if (isMounted) {
          //  setPosts((prevPosts) => [...prevPosts, ...data]);
          //  setHasMorePosts(pagination.page < pagination.pages);
          //  setIsLoading(false);
          //}
        } catch (error) {
          //setIsLoading(false);
          //showAlert("Oops try again later...", "error");
        }
      };

      fetchReports();
    }
    else if (activePage === "history") {
      const fetchReports = async () => {
        try {
          //setIsLoading(true);
          const { data } = await GetReports({
            token: session?.data?.accesToken,
            endpoint: "history",
            query: `limit=${10}&page=${page}`,
          });


          setReports(data?.data?.data.reports);
          setPages(data.data?.pagination.pages);
          setHasMoreReports(data?.data?.pagination.page < data.data?.pagination.pages);
          // If the component is unmounted, don't update the state.
          //if (isMounted) {
          //  setPosts((prevPosts) => [...prevPosts, ...data]);
          //  setHasMorePosts(pagination.page < pagination.pages);
          //  setIsLoading(false);
          //}
        } catch (error) {
          //setIsLoading(false);
          //showAlert("Oops try again later...", "error");
        }
      };

      fetchReports();
    }
  }, []);



  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <main className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-darkprim">
          {activePage === "monitor" ? "Monitor de reportes" : "Historial de reportes"}
        </h2>

        <div className="flex justify-end mb-4">
          <select className="p-2 bg-white border border-gray-300 rounded-md shadow-sm">
            <option>Todos</option>
            {/* Add other filter options here */}
          </select>
        </div>

        <div className="bg-white shadow-md rounded-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-primary">
              <tr className='text-white'>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Tipo de reporte
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Fecha de creación
                </th>
                {(activePage === "historial") && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Decisión
                    </th>
                  </>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Detalle
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-gray-500">
              {(activePage === "monitor") && (
                <>
                  {reports.map(({ username, type, createdAt }, i) => (
                    <tr
                      key={`${i} - ${createdAt}`}
                    >
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        {username}
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        {type}
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        {createdAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <LuEye className="text-gray-500" />
                      </td>
                    </tr>
                  ))}
                </>
              )}
              {(activePage === "historial") && (
                <>
                  {reports.map(({ username, type, createdAt, status }, i) => (
                    <tr
                      key={`${i} - ${createdAt}`}
                    >
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        {username}
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        {type}
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        {createdAt}
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        {status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <LuEye className="text-gray-500" />
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-gray-500">Página {page}/{pages}</div>
          <div className="flex space-x-2">
            <button className="p-2 bg-primary text-white rounded-md">
              {'<'}
            </button>
            <button className="p-2 bg-primary text-white rounded-md">
              {'>'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
