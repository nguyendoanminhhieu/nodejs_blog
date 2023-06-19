const number = require("joi/lib/types/number");
console.log('before');
getUser('a')
    .then((user) => getRepositories(user.gitHubUsername))
    .then((repos) => getCommits(repos))
    .then((commits) => displayCommits(commits))
    .catch((error) => console.log(error));
    
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