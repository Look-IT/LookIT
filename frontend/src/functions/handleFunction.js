import { deleteMemories } from "../api/deleteMemories"

export const handleDeleteMemories = async (memoryId) => {

  try {
    const response = await deleteMemories(memoryId);

    return response;

  } catch (error) {
    throw error;
  }
}

