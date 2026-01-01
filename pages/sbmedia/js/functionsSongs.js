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
            "songnumber": "P01",
            "name": "పరమ పురుషుడు",
            "engname": "Parampurushudu",
            "artist": "Smt.A. Vedavathi n Team",
            "url": "media/songs/P01_Parampurushudu.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "00:06:17"
        }

        , {
            "songnumber": "P02",
            "name": "బాల భరద్వాజునకు",
            "engname": "Baala Bharadwajunaku",
            "artist": "Smt.A. Vedavathi n Team",
            "url": "media/songs/P02_Bala_Bharadwajunaku.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "00:08:31"
        }

        , {
            "songnumber": "P03",
            "name": "భోగి పండ్లు",
            "engname": "Bhogi Pandlu",
            "artist": "Smt.A. Vedavathi n Team",
            "url": "media/songs/P03_Bhogi_Pandlu.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "00:05:00"
        }

        , {
            "songnumber": "P04",
            "name": "చిట్టి చిట్టి భరద్వాజులు",
            "engname": "Chitti Chitti Bharadwajulu",
            "artist": "Smt.A. Vedavathi n Team",
            "url": "media/songs/P04_Chitti_Chitti_Bharadwajulu.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "00:04:20"
        }, {
            "songnumber": "P05",
            "name": "కల్యాణము చూదము రారండి",
            "engname": "Kalyaanamu Chodamu Rarandi",
            "artist": "Smt.A. Vedavathi n Team",
            "url": "media/songs/P05_Kalyanamu_Chudararandi.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "00:08:31"
        },
        {
            "songnumber": "P06",
            "name": "కుసుమాంజలి",
            "engname": "Kusumanjali",
            "artist": "Smt.A. Vedavathi n Team",
            "url": "media/songs/P06_Kusumanjali.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "00:06:34"
        }
        , {
            "songnumber": "P07",
            "name": "మంగళం జయ మంగళం",
            "engname": "Mangalam Jaya Mangalam",
            "artist": "Smt.A. Vedavathi n Team",
            "url": "media/songs/P07_Mangalam_Jaya_Mangalam.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "00:07:06"
        },

        {
            "songnumber": "S01",
            "name": "లాలి శ్రీ గురు భరద్వాజ",
            "engname": "Laali Sriguru Bharadwaja Maharaja Meeku Laali",
            "artist": "Smt.A. Vedavathi",
            "url": "media/songs/S01_Laali_SriGuruBharadwaja.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "00:04:59"
        }
        , {
            "songnumber": "S02",
            "name": "నిదురించు మాయమ్మా",
            "engname": "Nidurinchu Mayamma",
            "artist": "Smt.A. Vedavathi",
            "url": "media/songs/S02_Nidurinchu_Mayamma.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "00:06:15"
        }

        , {
            "songnumber": "B01",
            "name": "దత్తా దత్తా",
            "engname": "Datta Datta",
            "artist": "Smt.A. Vedavathi n Team",
            "url": "media/songs/B01_Datta_Datta.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "00:22:09"
        }


        , {
            "songnumber": "B02",
            "name": "జయ గురు జయ గురు",
            "engname": "Jayaguru Jayaguru",
            "artist": "Smt.A. Vedavathi n Team",
            "url": "media/songs/B02_Jaya_Guru_Jaya_Guru.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "00:23:41"
        }

        , {
            "songnumber": "B03",
            "name": "సాయినాధ జై జై భరద్వాజ జై జై",
            "engname": "Sainatha Jai Jai",
            "artist": "Smt.A. Vedavathi n Team",
            "url": "media/songs/B03_Sainatha_Jai_Jai_Bharadwaja_Jai_Jai.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "00:08:34"
        }

        , {
            "songnumber": "B04",
            "name": "శిష్యప్రియ భజనప్రియ",
            "engname": "Shishya Priya Bhajana Priya",
            "artist": "Smt.A. Vedavathi n Team",
            "url": "media/songs/B04_Sishya_Priya_Bhajana_Priya_Sainatha_Pahimaam.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "00:04:44"
        }

        , {
            "songnumber": "B05",
            "name": "అవధూతరూప సాయి",
            "engname": "Avadhuta Roopa Sai",
            "artist": "Smt.A. Vedavathi n Team",
            "url": "media/songs/B05_Avadhuta_Roopa_Sai.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "00:08:15"
        }
        , {
            "songnumber": "N01",
            "name": "ఓం సమర్థ సద్గురు - నామ జపము",
            "engname": "Naama Japamu",
            "artist": "Smt.A. Vedavathi n Team",
            "url": "media/songs/N01_OmSamarthaSadguru.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "00:59:35"
        }

    ],
    continue_next: false,
    callbacks: {
        song_change: function () {

        }
    }

}


);
