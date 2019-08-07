let fetch_server = (url, body, then) => {
    fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(res => {
            if (res.ok) return res.json();
            throw Error(res.message);
        })
        .then(then);
};
export default fetch_server;
