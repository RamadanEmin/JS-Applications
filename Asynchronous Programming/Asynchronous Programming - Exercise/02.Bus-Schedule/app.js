function solve() {
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    const info = document.getElementsByClassName('info')[0];

    let stopName;
    let nextStopId = 'depot';

    async function depart() {
        try {
            const url = `http://localhost:3030/jsonstore/bus/schedule/${nextStopId}`;

            const res = await fetch(url);
            const data = await res.json();

            nextStopId = data.next;
            stopName = data.name;
            info.textContent = `Next stop ${stopName}`;

            departBtn.disabled = true;
            arriveBtn.disabled = false;
        } catch (error) {
            info.textContent = 'Error';
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
    }

    function arrive() {
        info.textContent = `Arriving at ${stopName}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();