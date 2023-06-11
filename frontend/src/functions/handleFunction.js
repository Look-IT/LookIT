import { deleteMemories } from "../api/deleteMemories"

export const handleDeleteMemories = (memoryId) => {

  deleteMemories(memoryId)
    .then(response => {
      console.log('deleteMemories: ', response);
    })
    .catch(error => console.error(error))

}

