var FCM = require('fcm-node');
var serverKey = 'AAAAtbCIC3w:APA91bFHVHDcTeJTjmiLJ7gWzVF9aA0P8_gwB8XAvUvdVgOFRuQSrICZApzIDVyB4BeUe9PgmS8LpMOKiJsxQ35n4a-DL09_rRaHG7uULx4vApeT_JAM1fCA_11lNEjWQ5zMabr4M7Pc'; //put your server key here
var fcm = new FCM(serverKey);

var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    to: 'eg0hilJpRWi4z5h3h4cWaW:APA91bEWUZAooB9HjSRihwSMt_Qz0h4MxWukKaMOW2LX5gQBPx6Dch1bZfeVQcSNRvJBkJpawH-1pZFPXTrUfziUzEymJxqWTdsvDo0T-zYDJtubBQQSU64K-3L-9_3jAxWqpfiOLgfV', //device key
    // collapse_key: 'your_collapse_key',
    
    notification: {
        title: 'NotificationTestApp', 
        body: 'Hello... message from the node js' 
    },
    
    data: {  //you can send only notification or only data(or include both)
        my_key: 'my value',
        my_another_key: 'my another value'
    }
};

fcm.send(message, function(err, response){
    if (err) {
        console.log("Something has gone wrong!");
    } else {
        console.log("Successfully sent with response: ", response);
    }
});