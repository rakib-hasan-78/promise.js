    import { promiseGetRequest } from "./customPromiselib.js";

    const getBtn = document.getElementById('get-data');
    getBtn.addEventListener('click', (e) => {
        e.preventDefault();
        promiseGetRequest('http://localhost:3000/users')
            .then(response => {
                let output = '';
                response.forEach(data => {
                    output += `
                        <ol>
                            <li>ID: ${data.id}</li>
                            <li>Name: ${data.name}</li>
                            <li>Age: ${data.age}</li>
                            <li>Address: ${data.address}</li>
                            <li>Country: ${data.country_code}</li>
                            <li>State: ${data.state}</li>
                            <li>Email Address: ${data.email}</li>
                            <li>Contact No: ${data.contact_no}</li>
                            <li>Profession: ${data.profession}</li>
                            <li>Position: ${data.position}</li>
                            <li>Unit: ${data.unit}</li>
                        </ol>
                    `;
                });
                document.getElementById('user-data-section').innerHTML = output;
            })
            .catch(error => {
                console.error("Error occurred while fetching data:", error);
                document.getElementById('user-data-section').innerHTML = `<p style="color:red;">${error}</p>`;
            });
    });