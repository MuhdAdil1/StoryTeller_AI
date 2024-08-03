import { GPTScript } from "@gptscript-ai/gptscript";
import 'dotenv/config';


 const g= new GPTScript({
    APIKey: process.env.OPENAI_API_KEY,
 });



export default g;




// Function to load the pre-trained model
// async function loadModel() {
//   try {
//     const model = await AutoModel.from_pretrained("Xenova/gpt-4o");
//     return model;
//   } catch (error) {
//     console.error("Error loading the model:", error);
//     throw error;
//   }
// }

// // Export the loaded model
// const modelPromise = loadModel();
// export default modelPromise;





