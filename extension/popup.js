document.getElementById('count-button').addEventListener('click', async () => {
	const cssSelector = document.getElementById('css-selector').value;
	const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	const countElements = (selector) => {
		return document.querySelectorAll(selector).length;
	};

	try {
		const result = await chrome.scripting.executeScript({
			target: { tabId: tab.id },
			func: countElements,
			args: [cssSelector],
		});

		document.getElementById('result').textContent = `Total elements: ${result[0].result}`;
	} catch (error) {
		document.getElementById('result').textContent = `Error: ${error.message}`;
	}
});
