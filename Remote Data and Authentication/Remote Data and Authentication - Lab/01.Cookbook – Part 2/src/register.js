window.addEventListener('load', async () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', onRegister);
});

async function onRegister(e) {
    const url = 'http://localhost:3030/users/register';
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const rePass = formData.get('rePass').trim();

    try {
        if (!email || !password) {
            throw new Error('All fields must be filled!');
        }
        if (password !== rePass) {
            throw new Error('Password don\'t match!');
        }
        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const data = await res.json();
        const token = data.accessToken;

        localStorage.setItem('token', token);

        window.location = '/login.html';
    } catch (error) {
        alert(error.message);
    }
}