export const userService = {
    login,
    logout,
    register
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    // call `/users/authenticate` with requestOptions to authenticate the login process
    return fetch('/users/authenticate', requestOptions).then(response =>{
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }

      return response.json();
    }).then(user =>{
       localStorage.setItem('user', JSON.stringify(user));
       return Promise.resolve(user)
    });

}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    return true;
}

// HOST=0.0.0.0 PORT=8000
// "prestart": "npm install",
//  "pretest": "npm install",
//   "test": "rm -rf ./unit.xml; CI=true TEST_REPORT_FILENAME=./unit.xml ./node_modules/.bin/react-scripts test --verbose --env=jsdom --testResultsProcessor ./node_modules/jest-junit-reporter"
function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('/users/register', requestOptions).then(handleResponse);
}


function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}
