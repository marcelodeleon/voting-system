const sgMail = require('@sendgrid/mail');

exports.handler = async function (event, context, callback) {
  console.log(event);
  // Parse the body sent to the function.
  //   const body = JSON.parse(event.body);
  //   // Find the conditional value.
  //   const type = body.data.type_of_inquiry.trim();

  // The list of potential email addresses to use.
  const emails = {
    Marketing: 'gonzalogg.garcia@gmail.com',
    //  Sales: 'sales@helloworld.com'
  };

  // This is the data coming from the form. This is specific to Netlify forms.
  const dataArray = Object.entries(body.human_fields);
  // Use that data to build a series of <tr> and <td> (table rows and columns)
  // for each field in the form.
  //
  // Note: I'm doing this so the email recipient can see the contents of the
  // form and respond directly via email rather than having to go to the source
  // to find the form contents.
  const tableData = dataArray
    .map((x) => `<tr><td>${x[0]}</td><td>${x[1]}</td></td>`)
    .join('');
  // Wrap the field data in a table so it will render properly in email clients.
  const html = `<table><tbody>${tableData}</tbody></table>`;
  // Build a text version of the contents, as well.
  const text = dataArray.map((x) => `${x[0]}: ${x[1]};`).join('');

  // The message object contains the information to pass to SendGrid to send the
  // appropriate email message.
  const msg = {
    to: emails[type],
    from: 'topicosavanzados2020@gmail.com',
    subject: 'New Contact Form Submission',
    text: text,
    html: html,
  };

  // Set the SendGrid API key.
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  // Send the message.
  sgMail
    .send(msg)
    .then(() => {
      // If the message was successfully sent, we log the object to the console.
      // This enables us to see what was sent directly in the Netlify logs.
      console.log(msg);
      // The callback in this form tells the service initiating this function
      // that it was successful.
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(msg),
      });
    })
    // If the message was not successfully sent, then we catch the error and
    // render it to the logs. This also tells the service that intitiated this
    // function that it was not successful.
    .catch((error) => callback(error));
};
