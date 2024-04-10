import axios from "axios"
import { API_ROOT } from "~/utils/constants"

export const fetchGetBoardAPI = async (bId) =>{
  const response = await axios.get(`${API_ROOT}/boards/${bId}`)
  // axios trả về kết quả có thuộc tính của nó là data
  return response.data
}
