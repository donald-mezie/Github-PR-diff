const { Octokit } = require("@octokit/rest");

async function getPRDiff() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const prNumber = process.argv[2];
  const owner = process.argv[3];
  const repository = process.argv[4];
  const repo = repository.split('/')[1];

  console.log('PR Number: ', prNumber);
  console.log('Owner: ', owner);
  console.log('Repo: ', repo);

  try {
    const { data: prInfo } = await octokit.pulls.get({
        owner,
        repo,
        pull_number: prNumber,
    });

    const diffUrl = prInfo.diff_url;

    console.log('Diff URL: ', diffUrl);

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
