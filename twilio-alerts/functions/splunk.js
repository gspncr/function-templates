exports.handler = function(context, event, callback) {
  
    const twilioClient = context.getTwilioClient();
    let from = context.MSG_SERVICE_SID;
    let number = event.number;
    
    let url = event.alert_url;
    let state = event.alert_status;
    let title = event.check_name + ": " + event.alert_description + " - " + event.check_url;
    let valid164 = validatePhoneForE164(number);
    let output = {
      "telephoneNumber": number, 
      "isValid":valid164,
      "url": url,
      "state":state,
      "title":title
      };
    
    if (!valid164) number = '+' + number;
  
    console.log(valid164);
  
    if (state != 'Failed'){
      let output = {"error": true, "possibleReasons":{"state": state, "telephoneNumberValide164":valid164}, "inputted":{"state":state, "number":number}}
      return callback(null, output)
    } else if (number){
      let body = 'New ' + state + ' incident: ' + title + ' Action at: ' + url;
      let to = number;
      console.log(to);
  
      twilioClient.messages
        .create({ body, to, from })
        .then((message) => {
          console.log('SMS successfully sent');
          console.log(message.sid);
          //return callback(null, `Success! Message SID: ${message.sid}`);
          return callback(null, output);
        })
      .catch((error) => {
        console.error(error);
        return callback(error);
      });
    }
  
    //console.log('error', event);
  
  };
  
  function validatePhoneForE164(phoneNumber) {
      const regEx = /^\+[1-9]\d{10,14}$/;
  
      return regEx.test(phoneNumber);
  };