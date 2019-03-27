define([
    'postmonger'
], function (
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
    var authTokens = {};
    var payload = {};
    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);

    connection.on('clickedNext', save);
   
    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');

        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');        
    }

    function initialize(data) {
        if (data) {
            payload = data;
        }
        console.log(JSON.stringify(data));
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        
        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {
                
              
            });
        });

        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });
    }

    function onGetTokens(tokens) {
        console.log(tokens);
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        console.log(endpoints);
    }

    function save() {
        var campaignId=$("#camp").val();
        var title=$("#titl").val();
        var imageUrl=$("#imgurl").val();
        var message=$("#msg").val();
        var apikey=$("#apikey").val();
        var deepLink=$("#deep").val();
        /*
        module.exports.cors = {
            allRoutes: true,
            origin: '*',
            credentials: true,
            methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
            headers: 'content-type'
          };
          */
        //Validations
        if(title.trim()=="" || message.trim()=="" || apikey.trim()==""){
            alert("Please fill all the required fields: Api Key, Message and Title.");
            return false;
        }
        var contactEmail="vernika.1295@gmail.com";
        //Generating json to send
        var jsonObj={  
            "api_key":apikey,
            "notifications":[  
               {
                  "target":{  
                     "email":contactEmail
                  },
                  "title":title,
                  "message":message,
                  "deep_link":{  
                     "your_deeplink_key":deepLink,
                     "your_another_deeplink_key":deepLink
                  },
                  "image_URL":imageUrl,
                  "android_sound":"Beep",
                  "ios_sound":"Beep",
                  "channel_id": 1,
                  "camp_id": campaignId
               }
            ]
         }    
        console.log("Json structure: "+JSON.stringify(jsonObj));
        var xhr=new XMLHttpRequest();
        xhr.open("POST","https://mobile.useinsider.com/api/v1/notification/user",true);
        xhr.setRequestHeader("Content-Type","application/json",true);


        xhr.setRequestHeader("Access-Control-Allow-Origin","https://pushnotifyapp.herokuapp.com" );
        xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
        xhr.setRequestHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        xhr.setRequestHeader("Access-Control-Max-Age", "3600");
        xhr.setRequestHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");



        xhr.onreadystatechange = function(e){
            console.log(xhr.status);
            console.log(xhr.readyState);
            console.log(xhr.responseText);    
        };
        xhr.send(jsonObj);
        
        payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "contactFirstName" : "{{Contact.Default.FirstName}}",
            "contactLastName" : "{{Contact.Default.LastName}}",
            "contactEmailAddress": "{{Contact.Attribute.TestJourney.EmailAddress}}"
        }];
        
       payload['arguments'] = payload['arguments'] || {};
		payload['arguments'].execute = payload['arguments'].execute || {};
        payload['arguments'].execute.inArguments = [{  
            "api_key":apikey,
            "notifications":[  
               {
                  "target":{  
                     "email":contactEmail
                  },
                  "title":title,
                  "message":message,
                  "deep_link":{  
                     "your_deeplink_key":deepLink,
                     "your_another_deeplink_key":deepLink
                  },
                  "image_URL":imageUrl,
                  "android_sound":"Beep",
                  "ios_sound":"Beep",
                  "channel_id": 1,
                  "camp_id": campaignId
               }
            ]
         }];
        console.log("Payload from execute:"+JSON.stringify(payload));
        payload['metaData'].isConfigured = true;
        //payload=jsonObj;
        console.log("Payload -> "+JSON.stringify(payload));
        //connection.trigger('updateActivity', payload);
    }
 
});