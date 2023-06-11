import { deleteMemories } from "../api/deleteMemories"

export const handleDeleteMemories = (memoryId) => {

  deleteMemories(memoryId)
    .then(response => {
      console.log('deleteMemories: ', response);
      return response;
    })
    .catch(error =>{
      return error
    })

}

