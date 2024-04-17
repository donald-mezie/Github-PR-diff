import { Octokit } from "@octokit/rest";
import OpenAI from "openai";
import * as dotenv from 'dotenv';
dotenv.config();

async function getPRDiff() {

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const prNumber = process.argv[2];
  const owner = process.argv[3];
  const repository = process.argv[4];
  const repo = repository.split('/')[1];

  try {
    const { data: prInfo } = await octokit.pulls.get({
        owner,
        repo,
        pull_number: prNumber,
    });

    const diffUrl = prInfo.diff_url;

    const diffResponse = await octokit.request('GET ' + diffUrl);
    const diff = diffResponse.data;
    
    return diff;
  } catch (error) {
    console.error('Error fetching PR diff: ',error.message);
    throw error;
  }  
}

async function writeACustomerFacingDeprecationMessage() {
  try {
    const diff = await getPRDiff();

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemContent = `You are an assistant. 
    Your task is to go through the github PR DIFF passed in and create a customer-facing deprecation message. 
    Stating exactly what was removed and what was added; and what the customer should do. 
    You will only use the provided code using the provided data and nothing else`

    const userQuery = `
        PR Diff:
        ---
        ${diff}
        --- 
        Stating exactly what was removed and what was added; and what the customer should do. 
        We don't really care about repo level changes, .env files, yml files, etc. we only care about operations
        You will only use the provided code using the provided data and nothing else.
        Focus more on the controllers and the routes the changes to the endpoint, or newly added params.`

    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'assistant',
          content: systemContent,
        }, 
        {
          role: 'user',
          content: userQuery,
        }
    ],
      model: 'gpt-4-vision-preview',
      temperature:0.7,
      top_p:1,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.log('Error writing a customer-facing deprecation message: ', error.message);
    throw error;
  }
}

writeACustomerFacingDeprecationMessage().then((message) => {
  console.log(message);
}).catch((error) => {
  console.error(error);
});