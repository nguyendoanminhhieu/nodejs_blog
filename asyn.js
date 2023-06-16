const number = require("joi/lib/types/number");
console.log('before');
Display();
async function Display()
{
    const user = await getUser(1);
    console.log(user);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos);
    displayCommits(commits);
}
console.log('after');

function getUser(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading from database...');
            if (typeof id == 'number')
            resolve({id: id, gitHubUsername: 'huan'});
            else reject(Error('id is not a number'));
        }, 2000);
    });
}

function getRepositories(username){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            console.log('hello')
            if (typeof username == 'string')
            resolve (['repo1', 'repo2', 'repo3']);
            else reject(Error('username is not a string'));
        }, 2000);
    });
}

function getCommits(repos){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling commits...');
            resolve (['commit 1', 'commit 2', 'commit 3', 'commit 4']);
        }, 2000);
    });
}

function displayCommits(commits){
    return console.log(commits);
}