import { useState, useEffect, ChangeEvent, useMemo } from 'react';
import { default as OfficeDataType } from '../interfaces/types/Office';
import Offices from '../data/Offices';

export default function OfficesPage() {
  const [officeData, setOfficeData] = useState<Array<OfficeDataType>>([])
  const [countryFilter, setCountryFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<string>('table')

  const fetchOffices = () => {
    setOfficeData(Offices)
  }

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCountryFilter(e.target.value)
  }


  const filteredOffices = useMemo(
    () => {
      // with useMemo this function never re-run except officeData and countryFilter changed
      console.log("Do filter at", new Date().toLocaleTimeString());
      return officeData.filter(office => {
        if (countryFilter !== 'all') {
          return office.country === countryFilter
        } else {
          return true
        }
      });
    },
    [officeData, countryFilter]
  )

  // const filteredOffices = officeData.filter(office => {
  //   console.log('Filter office with country name: ' + countryFilter);
  //   if (countryFilter !== 'all') {
  //     return office.country === countryFilter
  //   } else {
  //     return true
  //   }
  // });

  useEffect(() => {
    fetchOffices()
  },[]);

  return (
    <div className={`table-page`}>
      <div className={`view-mode-buttons`}>
        <span>View Mode: </span>
        <button onClick={() => setViewMode('table')}>
          Table
        </button>
        <button onClick={() => setViewMode('list')}>
         List
        </button>
      </div>
      <div className={`radio-buttons`}>
        <label>
          <input
          type="radio"
          name="filter-by-country"
          value="all"
          checked={countryFilter === 'all'}
          onChange={handleOptionChange}
        />
          All
        </label>
        <label>
          <input
          type="radio"
          name="filter-by-country"
          value="Singapore"
          checked={countryFilter === 'Singapore'}
          onChange={handleOptionChange}
        />
          Singapore
        </label>
        <label>
          <input
          type="radio"
          name="filter-by-country"
          value="Malaysia"
          checked={countryFilter === 'Malaysia'}
          onChange={handleOptionChange}
        />
          Malaysia
        </label>
        <label>
          <input
          type="radio"
          name="filter-by-country"
          value="Indonesia"
          checked={countryFilter === 'Indonesia'}
          onChange={handleOptionChange}
        />
          Indonesia
        </label>
      </div>
      <div className={`table-wrapper`}>
        {
          viewMode === 'table' ? (
            <table className={`fl-table`}>
              <thead>
                <tr>
                    <th>City</th>
                    <th>Country</th>
                    <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {filteredOffices.map(office => (
                  <tr key={office.city}>
                    <td>{ office.city }</td>
                    <td>{ office.country }</td>
                    <td>{ office.address }</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={`fl-list-wrapper`}>
              <ul className={`fl-list`}>
                {filteredOffices.map(office => (
                  <li key={office.city}>
                    <strong>{ office.city } - { office.country }</strong>
                    <span>{ office.address }</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        }
      </div>
    </div>
  )
}