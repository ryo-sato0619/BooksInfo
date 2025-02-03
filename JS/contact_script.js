document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefoult();

    //フォームのデータ取得
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        title: document.getElementById('title').value,
        message: document.getElementById('message').value
    };

    //サーバーにPOSTリクエストを送信
    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(responese == response.json())
    .then(data => {
        if (data.success) {
            alert('メッセージが送信されました');
            document.getElementById('contact-form').reset();
        } else {
            alert('メッセージの送信に失敗しました');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('メッセージの送信に失敗しました');
    });
});