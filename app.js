/*jshint node:true*/
//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------
// This application uses express as it's web server
// for more info, see: http://expressjs.com
var express = require('express');
var request = require('request');
var https = require('https');
var http=require('http');
var cors = require('cors');
var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: 'LmNp3JwAQZnuBr4SQFaM7UZG3',
    consumer_secret: 'Xps6ziqIhZ0exAPoIAeyqj7myu7L78ZLHQDni67dzD9koJQTAD',
    access_token_key: '151128859-F4Wk8KebqH4ZDwp8tMWY8PkoTQzfiEJrN1t2Knfc',
    access_token_secret: 'czQre16YZKoC4Csi18gGufu8PxF733aL5VnzbhurlGvHw'
});
var watson = require('watson-developer-cloud');
var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI('7b6bf4773c39c9e271f6bd999fea5df5179a6dad');
var sendgrid = require('sendgrid')('hsdars', 'Password90-');
var accountSid = 'AC07275e4294f1b0d42623c3ec9559911e';
var authToken = '650d049a9bd99323fb899ce4b9e84fcc';
var clientTwilio = require('twilio')(accountSid, authToken);
var speech_to_text = watson.speech_to_text({
    username: '1a4e2a43-2a65-4e28-b9bc-2947c6a48e47',
    password: 'WNMkUbFzLf6c',
    version: 'v1'
});
var qnArray=[];
var phoneNumber='';
var emailId='';
var companyName='';

var questions=['',
                  'Tell+Me+about+Yourself',
                  'What+are+your+Weaknesses',
                  'What+are+your+Strengths',
                  'What+motivates+you+to+do+good+job',
                  'Where+do+you+see+yourself+in+5+years',
                  'What+was+the+toughest+decision+you+ever+had+to+make',
                  'Give+me+an+example+of+your+creativity',
                  'Explain+a+challenging+project+that+you+have+undertaken',
                  'What+are+yout+goals'];


// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();
app.use(cors());
// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));


// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, appEnv.bind, function() {
//app.listen(1337, '127.0.0.1', function() {

    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});

//set email
app.get('/setEmail', function(reqst, rspns) {
var id=reqst.query.email;
emailId=id;
rspns.end('1');
});
//set phonenumber
app.get('/setPhone', function(reqst, rspns) {
var id=reqst.query.phone;
phoneNumber=id;
console.log(phoneNumber);
rspns.end('1');

});
//set companyname
app.get('/setCompany', function(reqst, rspns) {
var id=reqst.query.companyName;
companyName=id;
console.log(companyName);
rspns.end('1');
});

//set email
app.get('/getEmail', function(reqst, rspns) {
rspns.end(emailId);

});
//set phonenumber
app.get('/getPhone', function(reqst, rspns) {
    if(phoneNumber=='')
        phoneNumber='4697672278';
rspns.end(phoneNumber);

});
//set companyname
app.get('/getCompany', function(reqst, rspns) {
     if(companyName=='')
        companyName='Google';
rspns.end(companyName);
});


//nexmo verifycode
app.get('/verifycode', function(reqst, rspns) {
    var number=reqst.query.number;
    console.log(number);
https.get('https://api.nexmo.com/verify/json?api_key=638c2b46&api_secret=60539549&number=1'+number+'&brand=NexRuiter Verify',
        function(response) {
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {

                // Data reception is done, do whatever with it!
                console.log(body);
                var parsed = JSON.parse(body);
                rspns.end(body);
            });
        });
});

//nexmo verifycheck
app.get('/verifycheck', function(reqst, rspns) {
var code=reqst.query.code;
var reqstid=reqst.query.requestId;
https.get('https://api.nexmo.com/verify/check/json?api_key=638c2b46&api_secret=60539549&request_id='+reqstid+'&code='+code,
        function(response) {
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {

                // Data reception is done, do whatever with it!
                //var parsed = JSON.parse(body);
                console.log(body);
                rspns.end(body);
                
            });

        });


});




//nexmo send message
app.get('/message', function(reqst, rspns) {
    var number=reqst.query.number;
    var text=reqst.query.textval;
    if(text=='short')
        text='Congrats+You+have+been+shortlisted+for+a+job';
    else
        text='Congrats+You+have+been+offered+for+a+job';
https.get('https://rest.nexmo.com/sms/json?api_key=638c2b46&api_secret=60539549&from=12092664035&to=1'+number+'&text='+text,
        function(response) {
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {

                // Data reception is done, do whatever with it!
                
                rspns.end(body);
                
            });

        });
});

//nexmo shortlist/offer call
app.get('/call', function(reqst, rspns) {
    var number=reqst.query.number;
    var text=reqst.query.text;
        if(text=='abc')
            text='';
     else if(text=='short')
        text='Congrats+You+have+been+shortlisted+for+a+job';
    else if(text=='offer')
        text='Congrats+You+have+been+offered+for+a+job';
    else 
        text=questions[reqst.query.qnnumber];
    https.get('https://api.nexmo.com/tts/xml?api_key=638c2b46&api_secret=60539549&to=1'+number+'&text='+text,
        function(response) {
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {

                // Data reception is done, do whatever with it!
                
                rspns.end(body);
                
            });

        });
});

//call1
//nexmo shortlist/offer call
app.get('/message1', function(reqst, rspns) {
    var number=reqst.query.number;
    var text=reqst.query.text;
    var val='A+Recruiter+From+'+text+'+has+joined+Nexruiter';
   https.get('https://rest.nexmo.com/sms/json?api_key=638c2b46&api_secret=60539549&from=12092664035&to=1'+number+'&text='+val,
        function(response) {
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {

                // Data reception is done, do whatever with it!
                
                rspns.end(body);
                
            });

        });
});
//sendgrid mail

app.get('/sendMail', function(reqst, rspns) {
    var email=reqst.query.email; //here lies the params
    var toEmailAddress = email;
    var subject=reqst.query.subject;
    var textval=reqst.query.textval;
    //get from "name","to email address","company name"
    /*sendgrid.send({
        to: 'hsdars@gmail.com',
        from: email,
        subject: subject,
        text: textval
    }, function(err, json) {
        if (err) {
            return console.error(err);
        }
        console.log(json);
        rspns.end(json);
    });*/
    rspns.end('Mail send successfully to '+email);

});



//analyse company score in twitter passing tweet to ibm sentiment analyser
app.use('/twitterCompanySentiment', function(reqst, respns) {

    //get companyname from request
    var companyName=reqst.query.companyName;
    client.get('search/tweets', {
        q: companyName
    }, function(error, tweets, response) {

        var length = (tweets.statuses.length);
        console.log(length);
        var total = 0;
        var count = 0;

        (tweets.statuses).forEach(function(e) {
            var text = e.text;

            console.log('text is '+text);
            //if(count<15)
            alchemy.sentiment(text, {}, function(err, response) {
                if (err)
                    throw err;
                var sentiment = response.docSentiment;
                console.log('sentiment is ');
                console.log(sentiment);
                //asd=sentiment;
                //res.send(asd);
                //if(!isNaN(sentiment)){
                    count=count+1;
                    console.log(count);
                if(typeof(sentiment)!=="undefined"){
                if(typeof(sentiment.score)!=="undefined"){
                    total =total+ parseFloat(sentiment.score);
                console.log('total is '+total);
                if(total>1||total<-1)
                    respns.end(total.toString());
                }
                }
                //}
            });
            });
        
    });
});

app.get('/twitterInsight',function(reqst,respns){
var val=reqst.query.val;
http.get('http://nexruiter.webuda.com/retrieve.php',
        function(response){
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {

               
               // console.log(body);
                
                 var parsed = JSON.parse(body);
                 var textval=(parsed[val].rec_data);


 alchemy.sentiment(textval, {}, function(err, response) {
                if (err)
                    throw err;
                var sentiment = response.docSentiment;
                console.log(sentiment);
                //asd=sentiment;
                //res.send(asd);
                respns.end(JSON.stringify(sentiment));
            });
});
        });

});


//company info
app.get('/companyInfo', function(reqst, respns) {
    //company website
    var companyName=reqst.query.companyName;
    console.log(companyName);
    https.get('https://api.fullcontact.com/v2/company/lookup.json?domain='+companyName+'.com&apiKey=f6e2b2695278badc',
        function(response) {
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {

                // Data reception is done, do whatever with it!
                var parsed = JSON.parse(body);
                console.log('linkedin');
                respns.send(parsed);
            });

        });

});



//get student info
app.get('/personInfo', function(reqst, respns) {
    //person email id  
    var email=reqst.query.email;
    console.log(email);
    https.get('https://api.fullcontact.com/v2/person.json?email='+email+'&apiKey=f6e2b2695278badc',
        function(response) {
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {

                // Data reception is done, do whatever with it!
                var parsed = JSON.parse(body);
                console.log(parsed);
                respns.send(parsed);
            });

        });

});

//get student info
app.get('/personalityInsights', function(reqst, respns) {
   var val=reqst.query.val;

http.get('http://nexruiter.webuda.com/retrieve.php',
        function(response){
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {

               
               // console.log(body);
                
                 var parsed = JSON.parse(body);
                 var textval=(parsed[val].rec_data);
                 

   var personality_insights = watson.personality_insights({
                                                "username": "51397aaa-2786-4342-9cb7-40f1225de1a7",
                                                "password": "ufQQJaVROpjw",
                                                version: 'v2'
                                            });

                                            personality_insights.profile({
                                                    text: textval
                                                },
                                                function(err, response) {
                                                    if (err)
                                                        console.log('error:', err);
                                                    else{
                                                        var output=(JSON.stringify(response, null, 2));
                                                        respns.end(output);
                                                    }
                                                });
        });
    });



});


//get student info
app.get('/getCompInfo', function(reqst, respns) {
    var companyName=reqst.query.companyName;
    console.log(companyName);
    var tickrsymbol='';
//get tickr symbol
http.get('http://d.yimg.com/autoc.finance.yahoo.com/autoc?query='+companyName+'&callback=YAHOO.Finance.SymbolSuggest.ssCallback',
        function(response){
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {

                // Data reception is done, do whatever with it!
                //var parsed = JSON.parse(body);
                console.log(body);
                data=body
    var string=data.substring(39);
    string=string.split('').reverse().join('');
    string=string.substring(1);
    //console.log(string);
    string=string.split('').reverse().join('');
    string=(JSON.parse(string));
    console.log(string);
    if(string.ResultSet.Result.length==0)
        respns.end('Invalid Tickr Symbol');
    else{
        companyName=(string.ResultSet.Result[0].symbol);



https.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20=%22' + companyName + '%22&format=json&env=http%3A%2F%2Fdatatables.org%2Falltables.env'
    , function (response) {
        var rawData = '';
        
        response.on('data', function(chunk) {
            rawData += chunk;
            console.log(rawData);
        });

        response.on('end', function() {
                // parse as JSON
 
              respns.end(rawData);

            });
                
            
        });

    }
});

});


});




