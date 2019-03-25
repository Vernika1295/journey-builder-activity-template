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
            "campaign_name": "Insider API Demo",
            "segment_name": "All People",
            "title": "Your push notification title goes here",
            "content": "Your push content goes here.",
            "deeplink": {
                "your_deeplink_key": "value", 
                "your_another_deeplink_key": "value"
            },
            "notification_image": "https://your_image_url.jpg",
            "android_sound": "Your custom sound name for Android goes here",
            "ios_sound": "Your custom sound name for iOS goes here",
            "test_push":true,
        }    
        var xhr=new XMLHttpRequest();
        xhr.open("POST","https://mobile.useinsider.com/api/v1/push/bulk",true);
        xhr.setRequestHeader("Content-Type","application/json");
        var responseObj=xhr.send(jsonObj);
        alert(JSON.stringify(xhr.status));
        
        
        payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "emailAddress": "{{Contact.Attribute.PostcardJourney.EmailAddress}}"
        }];
        
        payload['metaData'].isConfigured = true;
        connection.trigger('updateActivity', payload);
    }



    function sendRequestToInsider(payload)
    {   /*
        var JSONResponse = '';
        var JsonBody = '';
        JsonBody = '{Request Body}';
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://mobile.useinsider.com/api/v1/push/bulk", true);
        // xhr.setRequestHeader("Authorization","Bearer {!AccessToken}" ); 
        xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onload = function () 
        {
            JSONResponse = xhr.responseText;
        };
        JSONResponse=xhr.send(JsonBody);
        alert(JSON.stringify(JSONResponse));
        setTimeout( function()
            {
                if(xhr.status == 404){
                    alert("404");                     
                }
                else if(xhr.status == 401){
                    alert("401");
                }
                else if(xhr.status == 500){
                    alert("500");
                }
                else if(xhr.status == 200)
                {
                    alert("Hey it worked");
                    obj1 = JSON.parse(JSONResponse );
                    for(var x=0;x< obj1.length;x++)
                    {
                        var singleEle = obj1[x];
                    }
                }
            },
        2000);
        */
    }
});