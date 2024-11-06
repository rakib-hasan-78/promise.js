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
