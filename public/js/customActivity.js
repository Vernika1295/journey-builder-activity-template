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
            var campaignId = parseInt($("#camp").val());
            var title = $("#titl").val();
            var imageUrl = $("#imgurl").val();
            var message = $("#msg").val();
            var apikey = $("#apikey").val();
            var deepLinkKey = $("#deep").val();
            var deepLinkVal = $("#deepval").val();
            var channelId = parseInt($("#channel").val());
            var emailKey = $("#eml").val();
            //Validations
            if (title.trim() == "" || message.trim() == "" || apikey.trim() == "") {
                alert("Please fill all the required fields: Api Key, Message and Title.");
                return false;
            }
            if (channelId == "") {
                channelId = 1;
            }
            var contactEmail = "vernika.1295@gmail.com";
            if (deepLinkKey == "sri") {
                contactEmail = "srikant@useinsider.com";
            }

            payload["arguments"].execute.inArguments=[{
                "api_key":apikey,
                "emailKey":emailKey,
                "title":title,
                "message":message,
                "imageUrl":imageUrl,
                "deepLinkKey":deepLinkKey,
                "deepLinkVal":deepLinkVal,
                "channel_id":channel_id,
                "camp_id":camp_id, 
                "emailAddress": "{{Contact.Attribute.Contact_Extension.EmailAddress}}"
            }];
            payload["metadata"]["isConfigured"]=true;
            console.log("Payload is -> "+payload);
            connection.trigger('updateActivity',payload);

            //Generating json to send
            /*
            var jsonObj = {
                "api_key": apikey,
                "notifications": [
                    {
                        "target": {
                            "email": contactEmail
                        },
                        "title": title,
                        "message": message,
                        "deep_link": {
                            deepLinkKey: deepLinkVal
                        },
                        "image_URL": imageUrl,
                        "android_sound": "Beep",
                        "ios_sound": "Beep",
                        "channel_id": channelId,
                        "camp_id": campaignId
                    }
                ]
            } */
            /*
            var jsonObj={};
            jsonObj["api_key"]=apikey;
            jsonObj["notifications"]=[];
            var notificationObj={};
            notificationObj["target"]={};
            notificationObj["target"][emailKey]=contactEmail;
            notificationObj["title"]=title;
            notificationObj["message"]=message;
            notificationObj["deep_link"]={};
            notificationObj["deep_link"][deepLinkKey]=deepLinkVal;
            notificationObj["image_URL"]=imageUrl;
            notificationObj["android_sound"]="Beep";
            notificationObj["ios_sound"]="Beep";
            notificationObj["channel_id"]=channelId;
            notificationObj["camp_id"]=campaignId;
            jsonObj["notifications"].push(notificationObj); 

            console.log("Json structure: " + JSON.stringify(jsonObj));
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "https://cors-anywhere.herokuapp.com/https://mobile.useinsider.com/api/v1/notification/user", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function (e) {
                console.log(xhr.status);
                console.log(xhr.readyState);
                console.log(xhr.responseText);
                if (xhr.readyState == 4) {
                    payload['arguments'].execute.inArguments = [{
                        "tokens": authTokens,
                        "EmailAddress": "{{Contact.Attribute.Contact_Extension.EmailAddress}}"
                    }];
                    
                    payload['arguments'] = payload['arguments'] || {};
                    payload['arguments'].execute = payload['arguments'].execute || {};
                    console.log("Payload from execute:"+JSON.stringify(payload));
                    payload['metaData'].isConfigured = true;
                    //payload=jsonObj;
                    console.log("Payload -> "+JSON.stringify(payload)); 
                    connection.trigger('updateActivity', payload);
                }
            };
            xhr.send(JSON.stringify(jsonObj));
            
            payload['arguments'].execute.inArguments = [{
                "tokens": authTokens,
                "EmailAddress": "{{Contact.Attribute.Contact_Extension.EmailAddress}}"
            }];
            
            payload['arguments'] = payload['arguments'] || {};
            payload['arguments'].execute = payload['arguments'].execute || {};
            console.log("Payload from execute:"+JSON.stringify(payload));
            payload['metaData'].isConfigured = true;
            //payload=jsonObj;
            console.log("Payload -> "+JSON.stringify(payload));
            //connection.trigger('updateActivity', payload); */
        }

    });
