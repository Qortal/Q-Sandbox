import { Box, MenuItem, Select } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'

import { ShowCategories } from './ShowCategories';
import { ShowAction } from './ShowAction';
import { categories } from './constants';
import { SearchInput } from './components/SearchInput';
import { useAuthStore } from './atoms/global';

export const QortalRequests = () => {
    const myAddress = useAuthStore((state) => state.address);
        const setMyaddress = useAuthStore((state) => state.setAddress);
 const hasAsked = useAuthStore((state) => state.hasAsked);
        const setHasAsked = useAuthStore((state) => state.setHasAsked);
      const [search, setSearch] = useState('')
     const [selectedCategory, setSelectedCategory] = useState(0)
      const [selectedAction , setSelectedAction] = useState(null)
      
      const askForAccountInformation = useCallback(async () => {
        try {
          const account = await qortalRequest({
            action: "GET_USER_ACCOUNT",
          });
          if(account?.address){
            setMyaddress(account.address)
          }
        } catch (error) {
          console.error(error);
        } finally {
          setHasAsked(true)
        }
      }, []);
    
      useEffect(()=> {
        if(hasAsked) return
        askForAccountInformation()
      }, [askForAccountInformation, hasAsked])
      const handleClose = useCallback(()=> {
        setSelectedAction(null)
      }, [])
  return (
    <>
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    }}>
     <Select
            size="small"
            labelId="label-select-category"
            id="id-select-category"
            value={selectedCategory}
            displayEmpty
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{
              width: '150px'
            }}
          >
            <MenuItem value={0}>
              <em>All</em>
            </MenuItem>
            {categories?.map((category) => {
              return (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              );
            })}
          </Select>
          <SearchInput placeholder='Filter requests' value={search} onChange={setSearch} />
          </Box>
        <ShowCategories search={search} selectedCategory={selectedCategory} setSelectedAction={setSelectedAction}  />
        <ShowAction myAddress={myAddress} selectedAction={selectedAction} handleClose={handleClose} />
    </>
  )
}
