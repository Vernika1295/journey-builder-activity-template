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
        payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "emailAddress": "{{Contact.Attribute.PostcardJourney.EmailAddress}}"
        }];
        
        payload['metaData'].isConfigured = true;

        console.log(payload);
        connection.trigger('updateActivity', payload);
    }


});