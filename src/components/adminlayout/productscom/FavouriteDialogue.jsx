import call_api from '@/helper/Api';
import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";

const FavouriteDialogue = ({ proId, setDialogueOpen, setCheckChanges }) => {
    const [addFav, setAddFav] = useState("");

    const selectedHandler = (e) => {
        setAddFav(e.target.value)
    };
    const handleClosebtn = (e) => {
        setDialogueOpen(false);
    }

    const addToFavouriteHandler = async({proId, fav}) => {
        let favouriteValue = ''
        if(addFav === "Add To Favourite"){
            favouriteValue = true;
        }else{ favouriteValue = false};
        try {
            const rbody = { proId, Fav: favouriteValue }
            const result = await call_api.addtofavourite(rbody);
            setCheckChanges(true);
            setDialogueOpen(false)
            return result.success;
          } catch (error) {
            console.log("Error Adding Favourite List", error);
            return [];
          }
    }
    useEffect(()=>{
        if(proId && addFav){
            addToFavouriteHandler({proId, addFav})
        }
    },[addFav])
    return (
        <section className='relative'>
            <IoMdClose className='text-lg absolute right-3 top-3 text-secondary cursor-pointer' onClick={handleClosebtn}/>
            <div className='w-56 bg-gray-100 ring-2 ring-gray-300 rounded-sm p-4 shadow-sm'>
                <h6 className='sm:text-sm text-center font-medium text-secondary pb-2'>Choose an Option</h6>
                <div className='flex'>
                    <input type="radio"
                        id='addfavourite'
                        value={"Add To Favourite"}
                        checked={addFav === "Add To Favourite"}
                        onChange={selectedHandler}
                        className='bg-primary '
                        name='favourite'
                    />
                    <label className='text-xs px-4 cursor-pointer hover:text-secondary hover:font-medium' htmlFor='addfavourite' >
                        ADD TO FAVOURITE
                    </label>
                </div>
                <div className='flex'>
                    <input type="radio"
                        id='removefavourite'
                        value={"Remove From Favourite"}
                        checked={addFav === "Remove From Favourite"}
                        onChange={selectedHandler}
                        name='favourite'
                    />
                    <label className='text-xs px-4 cursor-pointer hover:text-secondary hover:font-medium' htmlFor='removefavourite'>
                        REMOVE FROM FAVOURITE
                    </label>
                </div>
            </div>
        </section>
    )
}

export default FavouriteDialogue