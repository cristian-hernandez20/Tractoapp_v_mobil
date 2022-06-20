import axios from "axios";

const journalApi = axios.create({
  baseURL: "https://tractorapp-50795-default-rtdb.firebaseio.com/",
  
});
export default journalApi;
