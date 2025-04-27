import React from 'react'
import Options from './Options';
const Grid = ({ title, data, updateCss }) => {
    return (
        <div className='flex-1 space-y-2'>
            <div className="flex relative disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none min-w-0">
                <div className="flex flex-row-reverse justify-between w-full text-gray-900 dark:text-white text-xs text-opacity-60 dark:text-opacity-60">
                    <div className="w-2/3 items-center">
                        <div className="w-full flex flex-col space-y-1">
                            <div className="gap-1 w-full max-w-full grid-cols-fit grid grid-flow-col">
                                <div className="w-full">
                                <Options
                                        attr={'gridtemplatecolumn'}
                                        title={''}
                                        data={data}
                                        updateCss={updateCss}
                                    />
                                    <span className="text-xs text-gray-900 dark:text-white text-opacity-60 dark:text-opacity-60 leading-3 mt-1">Columns </span>

                                </div>
                                <div className="w-full">
                                <Options
                                        attr={'gridtemplaterows'}
                                        title={''}
                                        data={data}
                                        updateCss={updateCss}
                                    />
                                    <span className="text-xs text-gray-900 dark:text-white text-opacity-60 dark:text-opacity-60 leading-3 mt-1">Rows </span>

                                </div>
                            </div>
                        </div>
                    </div>
                    <label className="w-1/4 py-0.5 text-xs leading-5.5 truncate pr-1 font-medium panel-item-label text-gray-900 dark:text-white text-opacity-60 dark:text-opacity-60">
                        Grid
                    </label>

                </div>
            </div>
        </div>
    )
}

export default Grid;
