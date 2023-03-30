const senderEmail = "sender@example.com";
const recipientEmail = "recipient@example.com";
const apiKeyPublic = "your-api-key-public";
const apiKeyPrivate = "your-api-key-private";

const data = {
  Messages: [
    {
      From: {
        Email: senderEmail,
        Name: "Me",
      },
      To: [
        {
          Email: recipientEmail,
          Name: "You",
        },
      ],
      Subject: "My first Mailjet Email!",
      TextPart: "Greetings from Mailjet!",
      HTMLPart:
        '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
    },
  ],
};

fetch("https://api.mailjet.com/v3.1/send", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${btoa(apiKeyPublic + ":" + apiKeyPrivate)}`,
  },
  body: JSON.stringify(data),
})
  .then((response) => {
    console.log(response);
    // Handle response here
  })
  .catch((error) => {
    console.error(error);
    // Handle error here
  });
