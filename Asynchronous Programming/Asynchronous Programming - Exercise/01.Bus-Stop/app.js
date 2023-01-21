// Using async/await
async function getInfo() {
    const stopName = document.getElementById('stopName');
    const list = document.getElementById('buses');
    const stopId = document.getElementById('stopId').value;

    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;
    try {
        stopName.textContent = 'Loading...';
        const res = await fetch(url);
        if (res.status !== 200) {
            throw new Error('Stop Id not found');
        }
        const data = await res.json();
        stopName.textContent = data.name;
        list.replaceChildren();
        Object.entries(data.buses).forEach(([busId, time]) => {
            const liElement = document.createElement('li');
            liElement.textContent = `Bus ${busId} arrives in ${time} minutes`;
            list.appendChild(liElement);
        });
    } catch (error) {
        list.replaceChildren();
        stopName.textContent = 'Error';
    }
}

// Using then catch
// function getInfo() {
//     const stopName = document.getElementById('stopName');
//     const list = document.getElementById('buses');
//     const stopId = document.getElementById('stopId').value;

//     const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

//     stopName.textContent = 'Loading...';
//     fetch(url)
//         .then(res => {
//             if (res.status !== 200) {
//                 throw new Error('Stop Id not found');
//             } 
//             return res.json();
//         })
//         .then(data => {
//             list.replaceChildren();
            
//             stopName.textContent = data.name;
//             Object.entries(data.buses).forEach(([busId, time]) => {
//                 const liElement = document.createElement('li');
//                 liElement.textContent = `Bus ${busId} arrives in ${time} minutes`;
//                 list.appendChild(liElement);
//             })
//         })
//         .catch(error => {
//             list.replaceChildren();
//             stopName.textContent = 'Error';
//         });
// }