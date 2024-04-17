
const Octokit = require('@octokit/rest');

async function getPRDiff() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  console.log('The process argv is: ')
  console.log(process.argv[0], process.argv[1]);

  const prNumber = process.argv[2];
  const owner = process.argv[3];
  const repo = process.argv[4];

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

getPRDiff().then((diff) => {
  console.log(diff);
}).catch((error) => {
  console.error(error);
});
