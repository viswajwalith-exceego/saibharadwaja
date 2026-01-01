
$(document).ready(function () {
    var sbAudioModal = document.getElementById('sbAudioModal')
    sbAudioModal.addEventListener('show.bs.modal', function (event) {
        // Button that triggered the modal
        var button = event.relatedTarget
        // Extract info from data-bs-* attributes
        var audioDisplayName = button.getAttribute('data-bs-whatever')
        var audioFileName = button.getAttribute('data-src')
        // If necessary, you could initiate an AJAX request here
        // and then do the updating in a callback.
        //
        // Update the modal's content.
        //var modalTitle = exampleModal.querySelector('.modal-title')

      
        $("#sbAudioEmb").attr('src', audioFileName);
        $("#pAudFooterText").text(audioDisplayName);


        // stop playing the youtube video when I close the modal
        $('#sbAudioModal').on('hide.bs.modal', function (e) {
            // a poor man's stop video
            $("#sbAudioEmb").attr('src', '');
        })
       })

});


$(document).ready(function () {

    // Gets the video src from the data-src on each button

    var $videoSrc;
    $('.video-btn').click(function () {
        $videoSrc = $(this).data("src");
    });
    //console.log($videoSrc);
    
    // when the modal is opened autoplay it  
    $('#sbVideoModal').on('shown.bs.modal', function (e) {

        // set the video src to autoplay and not to show related video. Youtube related video is
        $("#iFrmSbVideoBS").attr('src', $videoSrc + "?autoplay=0&modestbranding=1&rel=0&showinfo=0");

        //--To Extract file number when Single digit/2 digit filenumber
        var videoName1 = $videoSrc;
        var Last6LettersInName = '';
        var firstLetterInName='';        
        if (videoName1.length > 6) {
            Last6LettersInName = videoName1.substr(videoName1.length - 6, 6);

            firstLetterInName = Last6LettersInName.substr(0, 1);
            if (firstLetterInName == 'd') {
                Last6LettersInName = Last6LettersInName.substr(1, 5);
             }

        }

        //--For YouTube Videos
        if (Last6LettersInName.substr(Last6LettersInName.length - 1, 1) == '4')
            videoName1 = 'Video ' + Last6LettersInName;
        else
            videoName1 = 'Video@Youtube';


        $("#pVidFooterText").text(videoName1);
        
    })

    // stop playing the youtube video when I close the modal
    $('#sbVideoModal').on('hide.bs.modal', function (e) {
        // a poor man's stop video
        $("#iFrmSbVideoBS").attr('src', '');
    })
          
    // document ready  
 
});

// Function to hide the Spinner
function hideSpinner() {
    document.getElementById('spinnerVid').style.display = 'none';
}