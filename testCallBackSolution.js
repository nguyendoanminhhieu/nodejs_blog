console.log('before');
getUser(1, function (user){
    console.log(user);
    getRepositories(user.gitHubUsername, (repos) => {
        console.log(repos);
        getCommits(repos,displayCommits);
    })
});
console.log('after');

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading database...');
        callback({id: id, gitHubUsername: 'huan'});
    }, 2000);
    return 1;
}

function getRepositories(username, callback){
    setTimeout(() => {
        console.log('Calling GitHub API...');
        callback (['repo1', 'repo2', 'repo3']);
    }, 2000);
}

function getCommits(repos, callback){
    setTimeout(() => {
        console.log('Calling commit...');
        callback(['commit 1', 'commit 2', 'commit 3', 'commit 4']);
    }, 2000);
}

function displayCommits(commits){
    return console.log(commits);
}


