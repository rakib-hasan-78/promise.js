export function promiseGetRequest(url) {

         return new Promise((resolve, reject)=>{
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = function(e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let data = JSON.parse(xhr.response)
                        resolve(data);
                    } else {
                        reject(`ERROR: Error Occured...! \n ${xhr.status}`)
                    }
                }
            }
            xhr.send();
        })
};

export function xmlPromisePostRequest(url, data) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json'); // Fixed header

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 201) {
                    try {
                        const response = JSON.parse(xhr.response);
                        resolve(response);
                    } catch (error) {
                        reject(`Parsing error: ${error.message}`);
                    }
                } else {
                    reject(`Request failed with status: ${xhr.status}`);
                }
            }
        };

        xhr.send(JSON.stringify(data));
    });
}
