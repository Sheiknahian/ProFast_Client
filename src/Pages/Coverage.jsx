import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { FiSearch } from "react-icons/fi";
import '../../public/Data/districts.json'

const Coverage = () => {
    const [locs, setLocs] = useState([])
    const mapRef = useRef(null)
    useEffect(()=>{
        fetch(`../../Data/districts.json`).then(res=>res.json()).then(data=>setLocs(data))
    }, [])
    // console.log(locs);
    const handleSubmit = (e) => {
        e.preventDefault();
        const search = e.target.name.value
        const district = locs.find(c => c.district.toLowerCase().includes(search.toLowerCase()))
        console.log(district);
        if(district){
            const coord = [district.latitude, district.longitude];
            mapRef.current.flyTo(coord, 15)
        }
    }
    const position = [23.6850, 90.3563]
    return (
        <div className='bg-white mx-10 p-10 rounded-2xl'>
            <div className='w-9/10 mx-auto'>
                <div className='mx-auto'>
                    <h2 className='text-4xl font-bold text-[#03373D]'>We are available in 64 districts</h2>
                </div>
                <div className='inline-block'>
                    <form onSubmit={handleSubmit} className='mt-10 flex items-center relative'>
                        <FiSearch className='absolute left-3 text-xl'></FiSearch>
                        <input name='name' className='bg-[#e3e3e3] w-100 rounded-full py-3 pl-10 pr-4' placeholder='Search here' type="text" />
                        <input className='absolute right-0 cursor-pointer bg-[#CAEB66] font-semibold py-3 px-4 rounded-full' type="submit" value={'Search'} />
                    </form>
                </div>
                <div className='mt-10'>
                    <h3 className='text-3xl text-[#03373D] font-bold'>We deliver almost all over Bangladesh</h3>
                </div>
                <div>
                    <MapContainer className='h-150 mx-auto mt-10' center={position} ref={mapRef} zoom={8} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            locs.map((loc, index)=>{
                                return(
                                <Marker key={index} position={[loc.latitude, loc.longitude]}>
                                    <Popup>
                                        Area: {loc.district} <br />
                                        {loc.covered_area?.join(', ') || 'No area'}
                                    </Popup>
                                </Marker>
                                )
                            })
                        }
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default Coverage;