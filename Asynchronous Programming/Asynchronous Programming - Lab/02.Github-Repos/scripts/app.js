// Using asyng / await
async function loadRepos() {
	const username = document.getElementById('username').value;
	const list = document.getElementById('repos');

	const url = `https://api.github.com/users/${username}/repos`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`${response.status} ${response.statusText}`);
		}
		const data = await response.json();
		list.innerHTML = '';
		for (const repo of data) {
			const liElement = document.createElement('li');
			liElement.innerHTML = `<a href="${repo.html_url}">
											${repo.full_name}
								   </a>`;
			list.appendChild(liElement);
		}
	} catch (error) {
		list.innerHTML = '';
		list.textContent = `${error.message}`;
	}
}

// Using then catch
// function loadRepos() {
// 	const username = document.getElementById('username').value;
// 	const list = document.getElementById('repos');

// 	const url = `https://api.github.com/users/${username}/repos`;

	// fetch(url)
	// 	.then(res => {
	// 		if (!res.ok) {
	// 			throw new Error(`${res.status} ${res.statusText}`);
	// 		}
	// 		return res.json();
	// 	})
	// 	.then(handleResponse)
	// 	.catch(handleError);

	// function handleResponse(data) {
	// 	list.innerHTML = '';
	// 	for (const repo of data) {
	// 		const liElement = document.createElement('li');
	// 		liElement.innerHTML = `<a href="${repo.html_url}">
	// 										${repo.full_name}
	// 							   </a>`;
	// 		list.appendChild(liElement);
	// 	}
	// }

	// function handleError(error) {
	// 	list.innerHTML = '';
	// 	list.textContent = `${error.message}`;
	// }
// }