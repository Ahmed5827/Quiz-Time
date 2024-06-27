// getquestions.js
import axios from "axios";
const fetchQuestions = async (categoryId) => {
  try {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=easy&type=multiple`
    );
    return Promise.resolve(data); // Resolve promise with data on success
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.log("Rate limit exceeded. Retrying after delay...");
     console.log("here")
      return await fetchQuestions(categoryId); // Retry on 429
    } else {
      console.error("Error fetching questions:", error);
      return Promise.reject(error); // Reject promise on error
    }
  }
};
const getquestions = async (Category) => {
  try {
    const { data } = await axios.get("https://opentdb.com/api_category.php");

    for (let item of data.trivia_categories) {
      if (Category === item.name) {
        return await fetchQuestions(item.id)
          .then((questions) => { // Handle successful fetch from fetchQuestions
            if (questions) {
              return questions; // Return questions if exist
            } else {
              console.log("No Data Found for category:", Category);
              return undefined; // Return undefined for no data
            }
          })
          .catch((error) => { // Handle errors from fetchQuestions
            console.error("Error fetching questions:", error);
            return undefined; // Return undefined on error
          });
      }
    }
    console.log(`Category ${Category} not found`);
    return Promise.resolve(undefined); // Resolve with undefined for not found category
  } catch (error) {
    // Handle other errors here (optional)
    console.error("Error fetching categories:", error);
    return Promise.reject(error); // Reject promise on error
  }
};

export default getquestions;
