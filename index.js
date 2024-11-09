    import { promiseGetRequest, xmlPromiseDeleteRequest, xmlPromiseEditRequest, xmlPromisePostRequest } from "./customPromiselib.js";

    function displayData(data, id) {
        let output = '';
        data.forEach(data=>{
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
        document.getElementById(id).innerHTML = output;
    }

    const userData = localStorage.getItem('user-data');
    if (userData) {
        try {
            const parsedData = JSON.parse(userData);
            displayData(parsedData, 'data-info');  // Display the data if valid
        } catch (error) {
            console.error("Error parsing saved data:", error);
            localStorage.removeItem('user-data');  // Optionally clear invalid data from localStorage
        }
    }

    const loadData = document.getElementById('btn-load');
    loadData.addEventListener('click', (e)=>{
        e.preventDefault();
        promiseGetRequest('http://localhost:3000/users')
        .then(response=>{
            displayData(response, 'data-info');
            localStorage.setItem('user-data', JSON.stringify(response));
        })
    })

    const postBtn = document.getElementById('btn-post');
    postBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const newData = {
            id: 8,
            name: "William Doe",
            age: 34,
            address: "45 DC  Ave, Moilapota",
            country_code: "BD",
            state: "sylhet",
            email: "johndoe@example.com",
            contact_no: "+1-555-1234",
            profession: "shopkeeper",
            position: "assistant train",
            unit: "Station"
        };
    // Send POST request to add a new user
    xmlPromisePostRequest('http://localhost:3000/users', newData)
        .then(()=>{
            return promiseGetRequest('http://localhost:3000/users');
        })
        .then(response=>{
            displayData(response, 'data-info');
            localStorage.setItem('user-data', JSON.stringify(response))
        })
        .catch(error => {
            console.error("Error occurred:", error);  // Log any errors
            document.getElementById('data-info').innerHTML = `<p style="color:red;">${error}</p>`;
        });
    });

   // edit button handler--->
   const editBtn = document.getElementById('btn-update');
   const newData = {
    id: 8,
    name: "William Doe",
    age: 34,
    address: "45 DC  Ave, 6th division",
    country_code: "BD",
    state: "sylhet",
    email: "johndoe@example.com",
    contact_no: "+1-555-1234",
    profession: "Bangladesh Army",
    position: "liutenant colonel",
    unit: "Artillary"
};
   editBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const targetID = newData.id;
    xmlPromiseEditRequest(`http://localhost:3000/users/${targetID}`, newData)
        .then(() => {
            return promiseGetRequest('http://localhost:3000/users');
        })
        .then((response) => {
            editingData(response, 'data-info');
            localStorage.setItem('user-data', JSON.stringify(response));
        })
        .catch(error=>{
            console.error(`Error: Error Occured ! ${error}`);
            document.getElementById('data-info').innerHTML = `<p style="color:red;">${error}</p>`;
        })

   })

   function editingData(data, id) {
     let output = '';
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
    document.getElementById(id).innerHTML = output;
   }

   const deleteBtn = document.getElementById('btn-delete');
   const deletedID = 8;
   deleteBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const url = `http://localhost:3000/users/${deletedID}`;
    xmlPromiseDeleteRequest(url)
        .then((message) => {
            console.log(message);
            return promiseGetRequest('http://localhost:3000/users')
        })
        .then((response) => {
            displayData(response, 'data-info');
            localStorage.setItem('user-data', JSON.stringify(response));
        })
        .catch(error=>{
            console.error(error);
            document.getElementById('data-info').innerHTML = error;
        })
   })

