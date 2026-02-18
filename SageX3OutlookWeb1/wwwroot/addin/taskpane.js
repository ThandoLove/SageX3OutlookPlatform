Office.onReady(() => {
    document.getElementById("btnSend").onclick = sendEmail;
});

async function sendEmail() {

    const item = Office.context.mailbox.item;

    const emailData = {
        subject: item.subject,
        body: item.body.getAsync("text"),
        from: item.from.emailAddress,
        toRecipients: item.to.map(r => r.emailAddress),
        conversationId: item.conversationId
    };

    await fetch("https://yourserver/api/email/process", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(emailData)
    });
}
