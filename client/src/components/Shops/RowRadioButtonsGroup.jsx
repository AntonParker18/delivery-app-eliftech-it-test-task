import React, { useEffect, useState } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { useSelector } from 'react-redux'

const RowRadioButtonsGroup = ({ setFilterProduct }) => {
  const { products } = useSelector(state => state.shops)
  const [selectValue, setSelectValue] = useState('allProducts')

  const handleChange = e => {
    const value = e.target.value
    setSelectValue(value)

    if (value === 'allProducts') {
      setFilterProduct(products)
      return
    }

    const filterProduct = products.filter(
      product => product.productType === value
    )

    setFilterProduct(filterProduct)
  }

  useEffect(() => {
    setSelectValue('allProducts')
  }, [products])

  return (
    <FormControl>
      <FormLabel id='demo-row-radio-buttons-group-label'>Categories</FormLabel>
      <RadioGroup
        row
        aria-labelledby='demo-row-radio-buttons-group-label'
        name='row-radio-buttons-group'
      >
        <FormControlLabel
          checked={selectValue === 'allProducts'}
          value='allProducts'
          onChange={handleChange}
          control={<Radio />}
          label='All product'
          disabled={!products.length}
        />
        <FormControlLabel
          checked={selectValue === 'burgers'}
          value='burgers'
          onChange={handleChange}
          control={<Radio />}
          label='Burgers'
          disabled={!products.length}
        />
        <FormControlLabel
          checked={selectValue === 'drinks'}
          value='drinks'
          onChange={handleChange}
          control={<Radio />}
          label='Drinks'
          disabled={!products.length}
        />
        <FormControlLabel
          checked={selectValue === 'naggets'}
          value='naggets'
          onChange={handleChange}
          control={<Radio />}
          label='Nuggets'
          disabled={!products.length}
        />
      </RadioGroup>
    </FormControl>
  )
}

export default RowRadioButtonsGroup
