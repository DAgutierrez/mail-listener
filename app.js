var MailListener = require("mail-listener2");
var fs = require("fs");

var mailListener = new MailListener({
    username: "correo",
    password: "password correo",
    host: "imap.gmail.com",
    port: 993, // imap port
    tls: true,
    connTimeout: 10000, // Default by node-imap
    authTimeout: 5000, // Default by node-imap,// Or your custom function with only one incoming argument. Default: null
    tlsOptions: { rejectUnauthorized: false },
    mailbox: "INBOX", // mailbox to monitor// the search filter being used after an IDLE notification has been retrieved
    mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
    attachments: true, // download attachments as they are encountered to the project directory
    attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments
});

mailListener.start(); // start listening

// stop listening
//mailListener.stop();

mailListener.on("server:connected", function(){
    console.log("imapConnected");
});

mailListener.on("server:disconnected", function(){
    console.log("imapDisconnected");
});

mailListener.on("error", function(err){
    console.log(err);
});

mailListener.on("mail", function(mail, seqno, attributes){
    // do something with mail object including attachments

    console.log("Mail incomming");
    console.log(JSON.stringify(mail,null,2))

        // console.log("emailParsed", mail);
    // mail processing code goes here
});

mailListener.on("attachment", function(attachment){
    console.log("Here adjunt");
    var output = fs.createWriteStream('./attachments/' + attachment.generatedFileName);
    attachment.stream.pipe(output);
});

// it's possible to access imap object from node-imap library for performing additional actions. E.x.
