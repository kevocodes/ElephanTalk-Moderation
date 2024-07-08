"use client"

import { Navbar } from '@/components/interface/navbar';
import { MonitorModal } from '@/components/interface/MonitorModal';
import { GetReports, GetReportsByType } from '@/services/api';
import { formatDate } from '@/utils/formatDate';
import { useSession } from 'next-auth/react';
import React from 'react';
import { LuEye } from 'react-icons/lu';
import ClipLoader from "react-spinners/ClipLoader";
import { DropdownMenu } from '@/components/interface/DropdownMenu';
import { SortIcon } from '@/components/interface/SortIcon';

export default function Home() {
  const [activePage, setActivePage] = React.useState('monitor');
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(1);
  const [reports, setReports] = React.useState([]);
  const [selectedRep, setSelectedRep] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [rep, setReport] = React.useState({});
  const [refresh, setRefresh] = React.useState(false);
  const [monitorOpen, setMonitorOpen] = React.useState(false);
  const [historyOpen, setHistoryOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState('')
  const session = useSession();
  //estado para poder cambiar el filtrado de los reportes
  const [optionToFilter, setOptionToFilter] = React.useState('')
  //estado para identificar cambio en ordenamiento por defecto estará ordenado en sentido ascendente
  const [clickEvent, setClickEvent] = React.useState(false)

  React.useEffect(() => {
    if (!session?.data?.accessToken) {
      return;
    }

    if (activePage === "monitor") {
      const fetchReports = async () => {
        try {
          const query = new URLSearchParams()
          query.append("limit", 10)
          query.append("page", page)

          if (optionToFilter) {
            query.append("type", optionToFilter)
            if (clickEvent == true) {
              query.append("order", "desc")
            } else if (clickEvent == false) {
              query.append("order", "asc")
            }
          } else if (clickEvent == true) {
            query.append("order", "desc")
            if (optionToFilter) {
              query.append("type", optionToFilter)
            }
          } else if (clickEvent == false) {
            query.append("order", "asc")
            if (optionToFilter) {
              query.append("type", optionToFilter)
            }
          }

          setLoading(true);
          const { data } = await GetReports({
            token: session?.data?.accessToken,
            endpoint: "monitor",
            query: query.toString(),
          });

          console.log(data);

          setReports(data?.reports);
          setPages(data?.pagination.pages);

          setLoading(false);
          if (refresh) {
            setRefresh(false);
          }

        } catch (error) {
          setLoading(false);
          //showAlert("Oops try again later...", "error");
        }
      };

      fetchReports();
    }
    else if (activePage === "history") {
      const fetchReports = async () => {
        try {
          const query = new URLSearchParams()
          query.append("limit", 10)
          query.append("page", page)

          if (optionToFilter) {
            query.append("type", optionToFilter)
            if (clickEvent == true) {
              query.append("order", "desc")
            } else if (clickEvent == false) {
              query.append("order", "asc")
            }
          } else if (clickEvent == true) {
            query.append("order", "desc")
            if (optionToFilter) {
              query.append("type", optionToFilter)
            }
          } else if (clickEvent == false) {
            query.append("order", "asc")
            if (optionToFilter) {
              query.append("type", optionToFilter)
            }
          }

          setLoading(true);
          const { data } = await GetReports({
            token: session?.data?.accessToken,
            endpoint: "history",
            query: query.toString(),
          });


          setReports(data?.reports);
          setPages(data?.pagination.pages);

          setLoading(false);
          if (refresh) {
            setRefresh(false);
          }
        } catch (error) {
          setLoading(false);
          //showAlert("Oops try again later...", "error");
        }
      };

      fetchReports();
    }
  }, [session, activePage, page, refresh, optionToFilter, clickEvent]);


  React.useEffect(() => {
    if (selectedRep === "") {
      return;
    }

    const fetchReport = async () => {
      try {
        const report = await GetReports({
          token: session?.data?.accessToken,
          endpoint: selectedRep,
        });

        if (activePage === "monitor") {
          setReport(report?.data);
          setMonitorOpen(true);
        }
        else if (activePage === "history") {
          setReport(report?.data);
          setHistoryOpen(true)
        }

      } catch (error) {

      }
    };

    fetchReport();

  }, [selectedRep])

  const loadNext = () => {
    setPage((page) => page + 1);
  };

  const loadLast = () => {
    setPage((page) => page - 1);
  }

  //funciones para renderizar las opciones del filtro y además obtener el valor de estas opciones
  const selectOptions = ['Seleccionar...', 'Todos', 'Tipo de reporte']

  function renderOptions() {
    return selectOptions.map((option, index) => {
      return (
        <option key={index} value={option}>
          {option}
        </option>
      )
    })
  }

  //estado para poder abrir y cerrar el dropdownMenu 
  const [visibility, setVisibility] = React.useState(false)

  const hideDropdown = () => {
    setVisibility(false)
    setSelectedOption('')
  }

  //función para obtener el valor del select que es el filtro
  function obtainSelectValue(e) {
    if (e.target.value === "Tipo de reporte") {
      setSelectedOption(e.target.value)
      setVisibility(true)
    } else if (e.target.value === "Todos") {
      setSelectedOption('')
      setOptionToFilter('')
    }
  }

  //función para obtener la opción seleccionada del dropdownMenu
  function obtainOptionFilter(option) {
    console.log(visibility)
    console.log(selectedOption)
    setSelectedOption('')
    setOptionToFilter(option)
    hideDropdown()
  }

  //función para determinar si se ha hecho click sobre el ícono de ordenamiento
  function handleIcon(click) {
    setClickEvent(!click)
  }

  return (
    <>
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
            <select className="p-2 bg-white border border-gray-300 rounded-md shadow-sm"
              onClick={obtainSelectValue}>
              {renderOptions()}
            </select>
            <DropdownMenu selectedOption={selectedOption} options={['post', 'comment']}
              obtainOption={obtainOptionFilter} isVisible={visibility} invisible={hideDropdown}
            />
          </div>
          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <MonitorModal
              report={rep}
              isOpen={monitorOpen}
              onClose={() => setMonitorOpen(false)}
              refresh={setRefresh}
            />
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-primary">
                <tr className='text-white'>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                    Tipo de reporte
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider flex
                  justify-center items-center gap-3">
                    Fecha de creación
                    <SortIcon eventClick={handleIcon} />
                  </th>
                  {(activePage === "history") && (
                    <>
                      <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                        Decisión
                      </th>
                    </>
                  )}
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                    Detalle
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-gray-500">
                {(!loading) && (<>
                  {(activePage === "monitor") && (
                    <>
                      {
                        reports?.map(({ _id, user, type, createdAt }, i) => (
                          <tr
                            key={`${i} - ${createdAt}`}
                          >
                            <td className="px-6 py-4 text-center whitespace-nowrap">
                              {user.username}
                            </td>
                            <td className="px-6 py-4 text-center whitespace-nowrap">
                              {type}
                            </td>
                            <td className="px-6 py-4 text-center whitespace-nowrap">
                              {formatDate(createdAt)}
                            </td>
                            <td className="px-6 py-4 flex justify-center items-center whitespace-nowrap">
                              <LuEye className="text-gray-500 hover:text-primary"
                                onClick={() => setSelectedRep(_id)}
                              />
                            </td>
                          </tr>
                        ))
                      }
                    </>
                  )}
                  {(activePage === "history") && (
                    <>
                      {
                        reports?.map(({ _id, user, type, createdAt, status }, i) => (
                          <tr
                            key={`${i} - ${createdAt}`}
                          >
                            <td className="px-6 py-4 text-center whitespace-nowrap">
                              {user.username}
                            </td>
                            <td className="px-6 py-4 text-center whitespace-nowrap">
                              {type}
                            </td>
                            <td className="px-6 py-4 text-center whitespace-nowrap">
                              {formatDate(createdAt)}
                            </td>
                            <td className="px-6 py-4 text-center whitespace-nowrap">
                              {status}
                            </td>
                            <td className="px-6 py-4 flex justify-center items-center whitespace-nowrap">
                              <LuEye className="text-gray-500 hover:text-primary"
                                onClick={() => setSelectedRep(_id)}
                              />
                            </td>
                          </tr>
                        ))
                      }
                    </>
                  )}
                </>)
                }
              </tbody>
            </table>
            {((loading)) &&
              (<article className="flex items-center justify-center w-full h-[28rem]">
                <ClipLoader
                  color='#25a2b5'
                  size={70}
                />
              </article>)}
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-gray-500">Página {page}/{pages}</div>
            {(pages > 1) && (
              <div className="flex space-x-2">
                <button className="p-2 bg-primary hover:bg-darkprim text-white rounded-md"
                  onClick={loadLast}
                  disabled={page === 1}
                >
                  {'<'}
                </button>
                <button className="p-2 bg-primary hover:bg-darkprim text-white rounded-md"
                  onClick={loadNext}
                  disabled={page === pages}
                >
                  {'>'}
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
