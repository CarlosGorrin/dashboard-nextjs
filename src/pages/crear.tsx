import React from 'react';
import { useState, useEffect } from 'react';
import { fetchCountries, fetchLocations, createLocation } from './api/data';
import { Country } from '../interfaces/locations-countries';

const NewLocationForm = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [latestId, setLatestId] = useState(0);
    const [preselectedCountryId, setPreselectedCountryId] = useState<number>(1);
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [country, setCountry] = useState(countries[0]);
    const [formFilled, setFormFilled] = useState(false);
    const latitudePattern = /^-?([1-8]?\d{1,2}(\.\d+)?|90(\.0+)?)$/;
    const longitudePattern = /^-?((1[0-7]\d{1}|[1-9]?\d)(\.\d+)?|180(\.0+)?)$/;

    useEffect(() => {
        const getCountries = async () => {
            const data = await fetchCountries();
            setCountries(data);
        };

        const getLatestId = async () => {
            const data = await fetchLocations();
            const latestId = Math.max(...data.map(location => location.id));
            setLatestId(latestId);
        };
        getCountries();
        getLatestId();
    }, []);

    useEffect(() => {
        if (preselectedCountryId && countries.length > 0) {
          const selectedCountry = countries.find(
            (c) => c.id === preselectedCountryId
          );
          if (selectedCountry) {
            setCountry(selectedCountry);
          }
        }
    }, [preselectedCountryId, countries]);

    useEffect(() => {
        if (name.trim() !== '' && country.id && latitudePattern.test(latitude) && longitudePattern.test(longitude)) {
            setFormFilled(true);
        } else {
            setFormFilled(false);
        }
    }, [name, latitude, longitude, country, latitudePattern, longitudePattern]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const newLocation = {
            id: latestId + 1,
            name,
            latitude,
            longitude,
            countryId: country.id
        }

    try {
        await createLocation(newLocation);
        alert('Nuevo destino creado!');
        setName('');
        setLatitude('');
        setLongitude('');
        setPreselectedCountryId(1);
        setLatestId(latestId + 1);
        setFormFilled(false);
        window.location.href = '/';
      } catch (error) {
        console.error(error);
        alert('Error! No generar la nueva locacion');
        window.location.href = '/';
      }

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <form onSubmit={handleSubmit}>
        <label>
            Nombre:
            <input className="bg-slate-800 mb-1.5 ml-1.5"
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required />
        </label>
        <br />
        <label>
            Latitud:
            <input className="bg-slate-800 mb-1.5 ml-1.5" 
            type="text" 
            value={latitude} 
            onChange={(e) => setLatitude(e.target.value)} 
            required />
            {!latitudePattern.test(latitude) && latitude !== '' && 
            <p className="text-red-500">Por favor ingresa una latitud válida.</p>}
        </label>
        <br />
        <label>
            Longitud:
            <input className="bg-slate-800 mb-1.5 ml-1.5" 
            type="text" 
            value={longitude} 
            onChange={(e) => setLongitude(e.target.value)}
            required />
            {!longitudePattern.test(longitude) && longitude !== '' && 
            <p className="text-red-500">Por favor ingresa una longitud válida.</p>}
        </label>
        <br />
        <label>
            Pais:
            <select className="bg-slate-800 mb-1.5 ml-1.5 w-50" value={country?.id || ''}
            onChange={(e) => {
                const selectedCountry = countries.find(
                (c) => c.id === parseInt(e.target.value));
                if (selectedCountry) {
                setCountry(selectedCountry);
                }
            }}>
                {countries.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name} id: {c.id}
                    </option>
                ))}
            </select>
        </label>
        <br />
        <label>
            ID:
            <input className="bg-slate-800 mb-1.5 ml-1.5  disabled:opacity-75" type="text" value={latestId + 1} disabled />
        </label>
        <br />
        {!formFilled && (<p className="text-red-500">Complete el formulario antes de enviarlo</p>)}
            <button type="submit" disabled={!formFilled} className="p-3.5 my-4 transition ease-in-out delay-150 rounded-lg hover:-translate-y-1 hover:scale-110 duration-300 bg-blue-500 hover:bg-blue-600" >
                Crear nuevo destino
            </button>
        </form>
      </div>
    </main>
  );
}

export default NewLocationForm;