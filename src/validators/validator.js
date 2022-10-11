const isvalidEmail = /^\s*[a-zA-Z0-9]+([\.\-\_\+][a-zA-Z0-9]+)*@[a-zA-Z]+([\.\-\_][a-zA-Z]+)*(\.[a-zA-Z]{2,3})+\s*$/

const checkPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;

function validateObjectId(id) {
    var bool = false;
    if (id.length == 24) bool = /[a-f]+/.test(id);
    return bool;
}

const stringChecking = function (data) {
    if (typeof data !== 'string' || data === undefined) {
        return false;
    } else if (typeof data === 'string' && data.trim().length === 0) {
        return false;
    } else {
        return true;
    }
}


module.exports = { isvalidEmail, checkPassword, validateObjectId, stringChecking }