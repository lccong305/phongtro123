import React, { memo, useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react';
import icons from '../ultils/icons'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'




const AnyReactComponent = ({ text }) => <div>{text}</div>;
const {CiLocationOn} = icons




const Map = ({address}) => {
    // console.log(address)
    const [coords, setCoords] = useState(null)
    useEffect(() => {
      const getCoords =  async () => {
        //neu api key gg map hoat dong mo doan code phia duoi
        // const result = await geocodeByAddress(posts[0].address)
        // const latLng = await getLatLng(result[0])
        // setCoords(latLng)
      }
      if (address) {
            //neu api key gg map hoat dong dong doan code phia duoi
            navigator.geolocation.getCurrentPosition(({coords: {longitude, latitude}}) => {
            setCoords({lat: latitude, lng: longitude})
         })
        getCoords()
      }
      else{
        navigator.geolocation.getCurrentPosition(({coords: {longitude, latitude}}) => {
            setCoords({lat: latitude, lng: longitude})
         })
      }
    },[address])

  return (
    <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyB9IJBKPNXz_5MpoNQdJS-Sge3lFvMsHfI" }}
        defaultCenter = {coords}
        defaultZoom = {11}
        center = {coords}
        >
        <AnyReactComponent
            lat={coords?.lat}
            lng={coords?.lng}
            text={<CiLocationOn color='red' size='24' />}
        />
        </GoogleMapReact>
    </div>
  )
}

export default memo(Map)