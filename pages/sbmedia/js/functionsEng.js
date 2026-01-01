/*
  When the youtubem link is pressed, stop all propagation so AmplitudeJS doesn't
  play the song.
*/
let youtubemLinks = document.getElementsByClassName('youtubem-link');

for (var i = 0; i < youtubemLinks.length; i++) {
    youtubemLinks[i].addEventListener('click', function (e) {
        e.stopPropagation();
    });
}


let songElements = document.getElementsByClassName('song');

for (var i = 0; i < songElements.length; i++) {
    /*
      Ensure that on mouseover, CSS styles don't get messed up for active songs.
    */
    songElements[i].addEventListener('mouseover', function () {
        this.style.backgroundColor = '#00A0FF';

        this.querySelectorAll('.song-meta-data .song-number')[0].style.color = '#FFFFFF';
        this.querySelectorAll('.song-meta-data .song-title')[0].style.color = '#FFFFFF';
        this.querySelectorAll('.song-meta-data .song-engtitle')[0].style.color = 'LightGrey';

        if (!this.classList.contains('amplitude-active-song-container')) {
            this.querySelectorAll('.play-button-container')[0].style.display = 'block';
        }

        this.querySelectorAll('img.youtubem-grey')[0].style.display = 'none';
        this.querySelectorAll('img.youtubem-white')[0].style.display = 'block';
        this.querySelectorAll('.song-duration')[0].style.color = 'LightGrey';
    });

    /*
      Ensure that on mouseout, CSS styles don't get messed up for active songs.
    */
    songElements[i].addEventListener('mouseout', function () {
        this.style.backgroundColor = '#F1F1F1';
        this.querySelectorAll('.song-meta-data .song-number')[0].style.color = '#333333';
        this.querySelectorAll('.song-meta-data .song-title')[0].style.color = '#272726';
        this.querySelectorAll('.song-meta-data .song-engtitle')[0].style.color = '#272726';
        this.querySelectorAll('.play-button-container')[0].style.display = 'none';
        this.querySelectorAll('img.youtubem-grey')[0].style.display = 'block';
        this.querySelectorAll('img.youtubem-white')[0].style.display = 'none';
        this.querySelectorAll('.song-duration')[0].style.color = '#607D8B';
    });

    /*
        Show and hide the play button container on the song when the song is clicked.
    */
    songElements[i].addEventListener('click', function () {
        this.querySelectorAll('.play-button-container')[0].style.display = 'none';
    });
}


/*
  Initializes AmplitudeJS
*/
Amplitude.init({
    "songs": [
        {
            "songnumber": "1",
            "name": "ఆల్ ఇండియా సాయి సమాజ్",
            "engname": "All India Sai Samaj Speech - New Delhi 1984",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "../../audiovideos/english/PMAB_AISS_Speech_1.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "1:32:53"
        }
        , {
            "songnumber": "2",
            "name": "ఆల్ ఇండియా సాయి సమాజ్",
            "engname": "AISS Speech",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "../../audiovideos/english/PMAB_AISS_Speech_2.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "20:22"
        }
        , {
            "songnumber": "3",
            "name": "ఆల్ ఇండియా సాయి సమాజ్",
            "engname": "AISS Speech",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "../../audiovideos/english/PMAB_AISS_Speech_3.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "1:13:42"
        }
        , {
            "songnumber": "4",
            "name": "ఆల్ ఇండియా సాయి సమాజ్",
            "engname": "AISS Speech",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "../../audiovideos/english/PMAB_AISS_Speech_4.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "37:12"
        }
        , {
            "songnumber": "5",
            "name": "ఆల్ ఇండియా సాయి సమాజ్",
            "engname": "AISS Speech",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "../../audiovideos/english/PMAB_AISS_Speech_5.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "24:48"
        }
        , {
            "songnumber": "6",
            "name": "ఆల్ ఇండియా సాయి సమాజ్",
            "engname": "AISS Speech",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "../../audiovideos/english/PMAB_AISS_Speech_6.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "1:34:01"
        }
        , {
            "songnumber": "7",
            "name": "ఆల్ ఇండియా సాయి సమాజ్",
            "engname": "AISS Speech",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "../../audiovideos/english/PMAB_AISS_Speech_7.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "0:7:26"
        }

        , {
            "songnumber": "8",
            "name": "ఆల్ ఇండియా సాయి సమాజ్",
            "engname": "AISS Speech",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "../../audiovideos/english/PMAB_AISS_Speech_8.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "0:32:52"
        }
        , {
            "songnumber": "9",
            "name": "దిల్లీ స్పీచ్",
            "engname": "Delhi Speech",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "../../audiovideos/english/PMAB_Delhi Speech_9.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "1:29:31"
        }
        , {
            "songnumber": "10",
            "name": "వార్తాలాపము",
            "engname": "Vaarthaalapam",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "../../audiovideos/english/PMAB_Vaarthaalapam_10.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "0:46:48"
        }



    ],
    continue_next: false,
    callbacks: {
        song_change: function () {

        }
    }

}


);
