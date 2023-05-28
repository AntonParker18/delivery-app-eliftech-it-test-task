import React, { useRef } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import restaurantIcon from '../../../../assets/img/market.x24.png'

const Map = ({ restaurantCoordinates, userCoordinates }) => {
  const containerStyle = {
    height: '200px',
    borderRadius: '10px',
  }

  const defaultOption = {
    streetViewControl: false,
    fullscreenControl: false,
    panControle: true,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControle: false,
    rotateControle: false,
    clickableIcons: false,
    keybordShortcuts: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    fullscreenCounrol: false,
    clickableIcons: false,
  }

  const mapRef = useRef(undefined)

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    mapRef.current = undefined
  }, [])

  return (
    <GoogleMap
      options={defaultOption}
      mapContainerStyle={containerStyle}
      center={userCoordinates}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {userCoordinates && <Marker position={userCoordinates} onLoad={onLoad} />}
      {restaurantCoordinates && (
        <Marker
          icon={{ url: restaurantIcon, scale: 1 }}
          position={restaurantCoordinates}
          onLoad={onLoad}
        />
      )}
    </GoogleMap>
  )
}

export default React.memo(Map)
