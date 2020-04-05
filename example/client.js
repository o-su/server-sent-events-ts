const eventSource = new EventSource("http://localhost:3000/sse");

eventSource.onopen = (event) => {
    console.log("event", event);
};

eventSource.onmessage = (event) => {
    const divElement = document.createElement("div");

    divElement.innerText = event.data;

    document.body.appendChild(divElement);
};

eventSource.onerror = (error) => {
    console.error("EventSource failed:", JSON.stringify(error));
    eventSource.close();
};