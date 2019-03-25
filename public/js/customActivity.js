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
        console.log(data);
        if (data) {
            payload = data;
        }
        
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        console.log(inArguments);

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
        var campaignName=$("#camp").val();
        var title=$("#titl").val();
        var imageUrl=$("#imgurl").val();
        var bannerUrl=$("#banurl").val();
        var description=$("#desc").val();
        var notificationUrl=$("#noturl").val();
        var ttl=$("#ttl").val();
        var batchContacts=$("#batch").val();

        //Generating json to send
        var jsonObj={
            "api_key": "abdullah",
            "campaign_name": campaignName,
            "segment_name": "All People",
            "title": title,
            "content": description,
            "deeplink": {
                "your_deeplink_key": "value", 
                "your_another_deeplink_key": "value"
            },
            "notification_image": notificationUrl,
            "android_sound": "Your custom sound name for Android goes here",
            "ios_sound": "Your custom sound name for iOS goes here",
            "test_push":true,
        }    
        console.log("Json structure: "+JSON.stringify(jsonObj));
        var xhr=new XMLHttpRequest();
        xhr.open("GET","https://my-json-server.typicode.com/typicode/demo",true);
        //xhr.open("POST","https://mobile.useinsider.com/api/v1/push/bulk",true);
        xhr.setRequestHeader("Content-Type","application/json",true);
        xhr.onreadystatechange = function(e){
            console.log(xhr.status);
            console.log(xhr.readyState);    
        };
        console.log(xhr.status);
        console.log(xhr.responseText);
        xhr.send(jsonObj);
        payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "emailAddress": "{{Contact.Attribute.PostcardJourney.EmailAddress}}"
        }];
        
        payload['metaData'].isConfigured = true;
        connection.trigger('updateActivity', payload);
    }
 
});