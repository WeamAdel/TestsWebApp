import axios from "axios";

const instance = axios.create({
  baseURL: "https://testswebapp-af51f-default-rtdb.firebaseio.com/",
});

export default instance;
