import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { fetchLocationById, updateLocation } from '../../api/data';
import { Location } from '../../../interfaces/locations-countries';

const EditExistingLocation = () => {
    const [location, setEditedLocation] = useState<Location | null>(null);
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [formFilled, setFormFilled] = useState(false);
    const latitudePattern = /^-?([1-8]?\d{1,2}(\.\d+)?|90(\.0+)?)$/;
    const longitudePattern = /^-?((1[0-7]\d{1}|[1-9]?\d)(\.\d+)?|180(\.0+)?)$/;
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        async function getEditedLocation() {
            if (id) {
                const data = await fetchLocationById(Number(id));
                setEditedLocation(data);
                setName(data.name);
                setLatitude(data.latitude);
                setLongitude(data.longitude);
                console.log(data)
            }
        }
        getEditedLocation();
    }, [id]);

    useEffect(() => {
        if (name.trim() !== '' && latitudePattern.test(latitude) && longitudePattern.test(longitude)) {
            setFormFilled(true);
        } else {
            setFormFilled(false);
        }
    }, [name, latitude, longitude, latitudePattern, longitudePattern]);

    if (!location) {
        return <div>Loading...</div>;
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const locationEdited = {
            id: location.id,
            name,
            latitude,
            longitude,
            countryId: location.countryId
        }
        try {
            await updateLocation(locationEdited);
            alert('Destino actualizado');
            setName('');
            setLatitude('');
            setLongitude('');
            setFormFilled(false);
            window.location.href = '/';
        } catch (error) {
            console.error(error);
            alert('Error! No pudimos actualizar el nuevo destino');
            window.location.href = '/';
        }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <form onSubmit={handleSubmit}>
        <h1>Editar Destino </h1>
        <label>
            Nombre:
            <input className="bg-slate-800 mb-1.5 ml-1.5"
            type="text" name="nombre" defaultValue={location.name}
            onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
            Latitud:
            <input className="bg-slate-800 mb-1.5 ml-1.5" 
            type="text" name="latitud" defaultValue={location.latitude}
            onChange={(e) => setLatitude(e.target.value)} />
            {!latitudePattern.test(latitude) && latitude !== '' && 
            <p className="text-red-500">Por favor ingresa una latitud válida.</p>}
        </label>
        <br />
        <label>
            Longitud:
            <input className="bg-slate-800 mb-1.5 ml-1.5" 
            type="text" name="longitud" defaultValue={location.longitude}
            onChange={(e) => setLongitude(e.target.value)}/>
            {!longitudePattern.test(longitude) && longitude !== '' && 
            <p className="text-red-500">Por favor ingresa una longitud válida.</p>}
        </label>
        <br />
        <label>
            Pais:
            <input className="bg-slate-800 mb-1.5 ml-1.5 disabled:opacity-75" 
            type="text" name="latitude" defaultValue={location.countryId} disabled/>
        </label>
        <br />
        <label>
            ID:
            <input className="bg-slate-800 mb-1.5 ml-1.5 disabled:opacity-75" type="text" name="latitude" defaultValue={location.id} disabled />
        </label>
        <br />
        {!formFilled && (<p className="text-red-500">Complete el formulario antes de enviarlo</p>)}
            <button type="submit" disabled={!formFilled} className="p-3.5 my-4 transition ease-in-out delay-150 rounded-lg hover:-translate-y-1 hover:scale-110 duration-300 bg-blue-500 hover:bg-blue-600" >
                Guardar
            </button>
        </form>
      </div>
    </main>
  );
}

export default EditExistingLocation;