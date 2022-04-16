let delay = time => new Promise(res => setTimeout(res, time));

document.body.onclick = async () => {
    await delay(400);
    console.log("sent 400ms after the body was clicked");
}
