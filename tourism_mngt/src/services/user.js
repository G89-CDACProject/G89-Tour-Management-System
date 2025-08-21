
import config from "../config"
import axios from "axios"
export async function register(firstName, lastName, email, phoneNumber, password, confirmPassword, securityQuestionId, securityAnswer) {
    // body parameters
    const body = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
      securityQuestionId,
      securityAnswer
    }
  
    // make API call
    const response = await axios.post(`${config.url}/user/register`, body)
  
    // read JSON data (response)
    return response.data
  }