const p1 = getStudentFirstName(1);
const p2 = getStudentLastName(2);


function getStudentFirstName(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading from database of student firstname...');
            if (typeof id == 'number')
            resolve({id: id, gitHubUsername: 'huan'});
            else reject(Error('id is not a number'));
        }, 2000);
    });
}

function getStudentLastName(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading from database of student lastname...');
            if (typeof id == 'number')
            resolve({id: id, gitHubUsername: 'ly'});
            else reject(Error('id is not a number'));
        }, 2500);
    });
}