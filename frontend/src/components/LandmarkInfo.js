import { landmarkInfo } from "../api/landmarkInfo";

const LandmarkInfo = ({landmarkId}) => {
  console.log('Info: ', landmarkId);

  async function getLandmarkInfo() {
    try {
      const response = await landmarkInfo(
        'https://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/main',
        landmarkId
      )
  
      if (response.data) {
        console.log(response.data);
        return response.data;
      }
  
    } catch (error) {
      console.log(error.messsage);
    }
  }
  getLandmarkInfo();
}

export default LandmarkInfo;