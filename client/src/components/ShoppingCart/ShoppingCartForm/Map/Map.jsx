import React, { useRef } from 'react'
import { DirectionsRenderer, GoogleMap, Marker } from '@react-google-maps/api'
import restaurantIcon from '../../../../assets/img/market.x24.png'

const Map = ({
  restaurantCoordinates,
  userCoordinates,
  directions,
}) => {
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
      {directions && userCoordinates && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              zIndex: 50,
              strokeColor: '#1976D2',
              strokeWeight: 5,
            },
            markerOptions: {
              visible: false
            }
          }}
        />
      )}
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
