import React from 'react'

export const DropdownMenu = ({ selectedOption, options, obtainOption, isVisible, invisible}) => {

    function obtainOption1(e) {
        obtainOption(e.target.innerText)
        invisible()
    }

    function obtainOption2(e) {
        obtainOption(e.target.innerText)
        invisible()
    }

    if (!selectedOption || selectedOption == '') {
        return null
    } else if (selectedOption === 'Tipo de reporte' && isVisible) {
        return (
            <div className={`absolute mt-2 w-48 bg-white border border-gray-300 shadow-lg z-2`}>
                <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={obtainOption1}>
                    {options[0]}
                </div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={obtainOption2}>
                    {options[1]}
                </div>
            </div>)
    }
    return null
}
