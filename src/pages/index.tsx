import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { fetchLocations, fetchCountries } from './api/data';
import { Location, Country } from '../interfaces/locations-countries';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      setCountries(data);
    };

    const getLocations = async () => {
      const data = await fetchLocations();
      setLocations(data);
    };
  
    getCountries();
    getLocations();
  }, []);

  if (!countries || !locations) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div>
        <h1 className="text-lg">Destinos de vacaciones</h1>
        <Link className="text-lg font-bold text-violet-500" href="/productos/testDos" passHref>Ejercicio 2</Link>
        </div>
        <div>
          <table className="flex justify-between py-5">
              <tbody className="">
                {countries.map((country: Country) => {
                  const filteredLocations = locations.filter(
                    (location: Location) => location.countryId === country.id
                  );
                  return (
                    <tr className="divide-y divide-y-reverse divide-gray-700 py-5" key={country.id}>
                      <td className="leading-7 pr-3">{country.name}</td>
                      <td>
                        {filteredLocations.length === 0 ? (
                          <p className="text-gray-500">No se encontraron destinos</p>
                        ) : (
                          <ul>
                            {filteredLocations.map((location: Location) => (
                              <li key={location.id} className="hover:opacity-75">
                                <Link href="/locations/[id]/edit" as={`/locations/${location.id}/edit`} passHref>{location.name} 
                                  <span className="mt-1 text-xs leading-5 text-gray-500"> ({location.latitude}, {location.longitude})</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          <Link href="/crear" passHref scroll={false}>
            <button className="p-3.5 transition ease-in-out delay-150 bg-blue-500 rounded-lg hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Crear nuevo destino
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
};