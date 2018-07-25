

    jQuery(function () {

    // init the validator
    // validator files are included in the download package
    // otherwise download from http://1000hz.github.io/bootstrap-validator



    jQuery('#contact-form').validator();
    jQuery('.regestration-form').validate();

    // when the contact us form is submitted
    var explode=  jQuery('#contact-form').on('submit', function (e) {
        jQuery("#btnsubmit").prop('disabled', true);

        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            var url = "email.php";

            jQuery("#loader").show();



            jQuery.ajax({
                type: "POST",
                url: url,
                data: jQuery(this).serialize(),
                success: function (data)
                {
                    console.log(data);

                    // data = JSON object that contact.php returns

                    // we recieve the type of the message: success x danger and apply it to the
                    var messageAlert = 'alert-' + data.type;

                    var messageText = data.message;


                    // let's compose Bootstrap alert box HTML
                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" ' +
                        'class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';

                    // If we have messageAlert and messageText
                    if (messageAlert && messageText) {

                        // inject the alert to .messages div in our form
                        jQuery('#contact-form').find('.messages').html(alertBox);
                        // empty the form
                        grecaptcha.reset();

                        jQuery('#contact-form')[0].reset();
                        jQuery("#btnsubmit").prop('disabled', false);
                        jQuery("#loader").hide();

                    }
                }
            });
            return false;
        }setTimeout(function() {
            jQuery("#loader").hide();
            location.reload();
        }, 2000);
    });

        var explod= jQuery('.regestration-form').on('submit', function(e){

        jQuery('.btn-sumbit').prop('disabled', true);
        alert('form submitted');
        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            var url = "regestration.php";

            // jQuery("#loader").show();



            jQuery.ajax({
                type: "POST",
                url: url,  
                data: jQuery(this).serialize(),

                success: function (data)
                {
                    console.log(data);

                    // data = JSON object that contact.php returns

                    // we recieve the type of the message: success x danger and apply it to the
                    var messageAlert = 'alert-' + data.type;

                    var messageText = data.message;


                    // let's compose Bootstrap alert box HTML
                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" ' +
                        'class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';

                    // If we have messageAlert and messageText
                    if (messageAlert && messageText) {

                        // inject the alert to .messages div in our form
                        jQuery('.regestration-form').find('.messages').html(alertBox);
                        // empty the form
                        grecaptcha.reset();
                        jQuery('.regestration-form')[0].reset();
                        jQuery(".btn-sumbit").prop('disabled', false);
                        // jQuery("#loader").hide();

                    }
                }
            });
            return false;
        }
        setTimeout(function() {
            jQuery("#loader").hide();
            location.reload();
        }, 2000);
        // other code
    });




});