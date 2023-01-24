window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', onRegister);

    if (sessionStorage.getItem('token')) {
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
    }
});

async function onRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');

    try {
        if (password !== rePass) {
            throw new Error("Passwords don't match!");
        }
        if (!email || !password || !rePass) {
            throw new Error('All fileds are required!');
        }
        const response = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        const data = await response.json();

        const userData = {
            email: data.email,
            id: data._id,
            token: data.accessToken
        };
        sessionStorage.setItem('userData', JSON.stringify(userData));
        window.location = './index.html';
    } catch (err) {
        alert(err.message);
    }
}