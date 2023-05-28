import React, { useEffect } from 'react'
import { Grid, MenuItem, MenuList, TextField } from '@mui/material'
import Map from './Map/Map'
import { Controller } from 'react-hook-form'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import useOnclickOutside from 'react-cool-onclickoutside'

import s from './ShoppingCartForm.module.css'

const ShoppingCartForm = ({
  errors,
  control,
  isLoaded,
  onSelect,
  userCoordinates,
  restaurantCoordinates,
}) => {
  const normalizePhoneNumber = value => {
    const phoneNumber = parsePhoneNumberFromString(value)
    if (!phoneNumber) {
      return value
    }

    return phoneNumber.formatInternational()
  }

  const {
    ready,
    value,
    init,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    initOnMount: false,
    debounce: 300,
  })
  const ref = useOnclickOutside(() => {
    clearSuggestions()
  })

  const handleInput = e => {
    setValue(e.target.value)
  }

  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false)
      clearSuggestions()
      console.log(description)

      getGeocode({ address: description }).then(results => {
        const { lat, lng } = getLatLng(results[0])
        console.log('📍 Coordinates: ', { lat, lng })
        onSelect({ lat, lng })
      })
    }

  const renderSuggestions = () =>
    data.map(suggestion => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion

      return (
        <div
          className={s.addressText}
          key={place_id}
          onClick={handleSelect(suggestion)}
          sx={{ justifyContent: 'center', gap: 0 }}
        >
          <strong>{main_text}</strong>{' '}
          <p className={s.secondaryText}>{secondary_text}</p>
        </div>
      )
    })

  useEffect(() => {
    if (isLoaded) {
      init()
    }
  }, [isLoaded, init])

  return (
    <div className={s.wrapper}>
      <Grid
        container
        direction='column'
        justifyContent='flex-center'
        alignItems='center'
      >
        <div className={s.from}>
          <Grid item>
            <div className={s.googleMap}>
              {isLoaded ? (
                <Map
                  userCoordinates={userCoordinates}
                  restaurantCoordinates={restaurantCoordinates}
                />
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </Grid>

          <Grid item>
            <Controller
              name='userName'
              control={control}
              rules={{ required: 'Enter your name' }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id='outlined-basic'
                  label='Name'
                  variant='outlined'
                  margin='normal'
                  onChange={e => field.onChange(e.target.value)}
                  value={field.value}
                  helperText={errors.userName?.message}
                  error={errors.userName?.message}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              name='email'
              control={control}
              rules={{
                required: 'Enter your email',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Enter valide email',
                },
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id='outlined-basic'
                  label='Email'
                  variant='outlined'
                  margin='normal'
                  onChange={e => field.onChange(e.target.value)}
                  value={field.value}
                  helperText={errors.email?.message}
                  error={errors.email?.message}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              name='phoneNumber'
              control={control}
              rules={{
                required: 'Enter phone number',
                pattern: {
                  value: /^[\d\+][\d\(\)\ -]{4,14}\d$/,
                  message: 'Enter only numbers',
                },
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id='outlined-basic'
                  label='Phone number'
                  variant='outlined'
                  margin='normal'
                  type={'tel'}
                  onChange={e => (
                    (e.target.value = normalizePhoneNumber(e.target.value)),
                    field.onChange(e.target.value)
                  )}
                  value={field.value}
                  helperText={errors.phoneNumber?.message}
                  error={errors.phoneNumber?.message}
                />
              )}
            />
          </Grid>
          <Grid item>
            <div ref={ref}>
              <Controller
                name='address'
                control={control}
                rules={{ required: 'Enter your address' }}
                render={({ field }) => (
                  <TextField
                    disabled={!ready}
                    fullWidth
                    id='outlined-basic'
                    label='Address'
                    variant='outlined'
                    margin='normal'
                    onChange={e => (field.onChange(e), handleInput(e))}
                    value={value}
                    helperText={errors.address?.message}
                    error={errors.address?.message}
                  />
                )}
              />
              {status === 'OK' && (
                <MenuList sx={{ border: '1px solid #000' }}>
                  <div className={s.address}>{renderSuggestions()}</div>
                </MenuList>
              )}
            </div>
          </Grid>
        </div>
      </Grid>
    </div>
  )
}

export default ShoppingCartForm
