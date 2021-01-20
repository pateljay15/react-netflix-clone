import axios from "axios"


const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
})

export default instance

// there only one default export in a file if we want to export multiple fules then we
// have to use
// export const com11
// export const comp2
// if we want use this particular thing in other file then we can use by writing this below
// import {com1, comp2} from file; basically we have to destructor it
// if we have only one component then we can export it using default like
// export default comp1
// and we can use that comp in other file like
// import comp1 from file ||we dont have to destructor it id only one comp exported using default
//if u use export default then you can call whatever name you want to import in the file 
//where you are importing this component
//you can rename basically when you are importing it in the other file