var https=require('https');

//number verify
https.get('https://api.nexmo.com/verify/json?api_key=638c2b46&api_secret=60539549&number=14697672278&brand=NexmoVerifyTest',
        function(response) {
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {

                // Data reception is done, do whatever with it!
                var parsed = JSON.parse(body);
                console.log(parsed);
                
            });

        });
//entered verification number
/*https://api.nexmo.com/verify/check/json?api_key={api_key}&api_secret={api_secret}
&request_id=8g88g88eg8g8gg9g90&code=123445*/



//message
/*https.get('https://rest.nexmo.com/sms/json?api_key=638c2b46&api_secret=60539549&from=12092664035&to=14697672278&text=Welcome+to+Nexmo',
        function(response) {
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {

                // Data reception is done, do whatever with it!
                var parsed = JSON.parse(body);
                console.log(parsed);
                
            });

        });*/

//call ivr
/*https.get('https://api.nexmo.com/tts/xml?api_key=638c2b46&api_secret=60539549&to=14697672278&text=Welcome+to+Nexmo',
        function(response) {
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {

                // Data reception is done, do whatever with it!
                var parsed = JSON.parse(body);
                console.log(parsed);
                
            });

        });*/

