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

        $("#desc").keydown(function(e){
            var descValue=$("#desc").val();
            var banValue=$("#banurl").val();
            var charValue="";
            if(banValue==""){
                charValue=(12-descValue.length)+" characters remaining";
                if(descValue.length==12){
                    e.preventDefault();
                }
            }else{
                charValue=(30-descValue.length)+" characters remaining";
                if(descValue.length==30){
                    e.preventDefault();
                }
            }
            $("#chars").html(charValue); 
        });
        $("#banurl").keyup(function(e){
            var descValue=$("#desc").val();
            var banValue=$("#banurl").val();
            var charValue="";
            if(banValue==""){
                charValue=(12-descValue.length)+" characters remaining";
            }else{
                charValue=(30-descValue.length)+" characters remaining";
            }
            $("#chars").html(charValue); 
        });    
    }

    function initialize(data) {
        if (data) {
            payload = data;
        }
        console.log(data);
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        console.log(payload['arguments'].execute.inArguments);

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
       
        //Validations
        if(title.trim()=="" || message.trim()=="" || apikey.trim()==""){
            alert("Please fill all the required fields: Api Key, Message and Title.");
            return false;
        }

        //Generating json to send
        var jsonObj={  
            "api_key":apikey,
            "notifications":[  
               {
                  "target":{  
                     "email":"vernika.1295@gmail.com"
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
        xhr.onreadystatechange = function(e){
            console.log(xhr.status);
            console.log(xhr.readyState);    
        };
        xhr.send(jsonObj);
        payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "contactFirstName" : "{{Contact.Default.FirstName}}",
            "contactLastName" : "{{Contact.Default.LastName}}",
            "contactEmailAddress": "{{Contact.Attribute.TestJourney.EmailAddress}}"
        }];
        
        payload['metaData'].isConfigured = true;
        connection.trigger('updateActivity', payload);
    }
 
});