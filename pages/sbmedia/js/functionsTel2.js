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
            "songnumber": "A",
            "name": "గురుధ్యానము",
            "engname": "Guru Dhyanamu",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/0A_Gurudhyanam_PujyaSriAcharyaEB.mp3",
            "cover_art_url": "imgs/Song_Images/u1.webp",
            "duration": "0:27"
        },
        {
            "songnumber": "B",
            "name": "భజన",
            "engname": "Bhajana",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/0B_Bhajana_PujyaSriAcharyaEB.mp3",
            "cover_art_url": "imgs/Song_Images/m1.jpg",
            "duration": "40:09"
        },
        {
            "songnumber": "1",
            "name": "సుప్రభాతము",
            "engname": "Suprabhatamu",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/01_Suprabhatam.mp3",
            "cover_art_url": "imgs/Song_Images/m1.jpg",
            "duration": "27:43"
        },
        {
            "songnumber": "2",
            "name": "కాకడ ఆరతి",
            "engname": "Kakada Arati",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/02_Kakada_Arati.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "26:31"
        }
        , {
            "songnumber": "3A",
            "name": "బాబా జీవితము బోధ",
            "engname": "Baba Jeevithamu Bodha @Kalichedu",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/03A_Baba_Jeevithamu_Bodha_Kalichedu.mp3",
            "cover_art_url": "imgs/Song_Images/m1.jpg",
            "duration": "34:02"
        }
        , {
            "songnumber": "3B",
            "name": "బాబా జీవితము బోధ",
            "engname": "Baba Jeevithamu Bodha @Kalichedu",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/03B_Baba_Jeevithamu_Bodha_Kalichedu.mp3",
            "cover_art_url": "imgs/Song_Images/m1.jpg",
            "duration": "27:24"
        }
        , {
            "songnumber": "3C",
            "name": "బాబా జీవితము బోధ",
            "engname": "Baba Jeevithamu Bodha @Kalichedu",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/03C_Baba_Jeevithamu_Bodha_Kalichedu.mp3",
            "cover_art_url": "imgs/Song_Images/m1.jpg",
            "duration": "30:08"
        }
        , {
            "songnumber": "3D",
            "name": "బాబా జీవితము బోధ",
            "engname": "Baba Jeevithamu Bodha @Kalichedu",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/03D_Baba_Jeevithamu_Bodha_Kalichedu.mp3",
            "cover_art_url": "imgs/Song_Images/m1.jpg",
            "duration": "23:19"
        }


        , {
            "songnumber": "4",
            "name": "భగవంతునియందు విశ్వాసము",
            "engname": "Bhagwantudu Endu Viswasam",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/04_Bhagwantudu_Endu_Viswasam.mp3",
            "cover_art_url": "imgs/Song_Images/m2.jpg",
            "duration": "1:05:46"
        }
        , {
            "songnumber": "5",
            "name": "మన ధర్మము -మన కర్తవ్యము",
            "engname": "Mana Dharmam - Mana Kartavyam",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/05_Mana_Dharmam_Mana_Kartavyam.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "1:00:17"
        }
        , {
            "songnumber": "6",
            "name": "లౌకిక జీవితము - పారమార్థికత",
            "engname": "Loukika Jeevithamu - Parmarthika",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/06_Loukika_Jeevithamu_Parmarthika.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "55:14"
        }
        , {
            "songnumber": "7A",
            "name": "ప్రకృతి, పరిశోధన, విజ్ఞానము",
            "engname": "Prakruti, Parisodhana, Vignanam @Porumamilla",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/07A_Prakruti_Parisodhana_Vignanam.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "21:31"
        }
        , {
            "songnumber": "7B",
            "name": "ప్రకృతి, పరిశోధన, విజ్ఞానము",
            "engname": "Prakruti, Parisodhana, Vignanam @Porumamilla",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/07B_Prakruti_Parisodhana_Vignanam.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "22:07"
        }

        , {
            "songnumber": "7C",
            "name": "ప్రకృతి, పరిశోధన, విజ్ఞానము",
            "engname": "Prakruti, Parisodhana, Vignanam @Porumamilla",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/07C_Prakruti_Parisodhana_Vignanam.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "22:22"
        }

        , {
            "songnumber": "7D",
            "name": "ప్రకృతి, పరిశోధన, విజ్ఞానము",
            "engname": "Prakruti, Parisodhana, Vignanam @Porumamilla",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/07D_Prakruti_Parisodhana_Vignanam.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "22:51"
        }

        , {
            "songnumber": "8",
            "name": "ఆధ్యాత్మిక జీవిత రహస్యము",
            "engname": "Adhyatmika Jeevitha Rahasyam",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/08_Adhyatmika_Jeevitha_Rahasyam.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "1:09:11"
        }
        , {
            "songnumber": "9A",
            "name": "మహానంది పిల్లలు",
            "engname": "Mahanandi Children",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/09A_Mahanandi_Children.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "23:39"
        }
        , {
            "songnumber": "9B",
            "name": "మహానంది పిల్లలు",
            "engname": "Mahanandi Children",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/09B_Mahanandi_Children.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "23:41"
        }
        , {
            "songnumber": "10",
            "name": "మాస్టరుగారు పూజ",
            "engname": "Mastergaru Pooja",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/10_Mastergaru_Pooja.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "22:16"
        }


        , {
            "songnumber": "11",
            "name": "మధ్యాహ్న ఆరతి",
            "engname": "Madhyana Arati",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/11_Madhyana_Arati.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "15:22"
        }

        , {
            "songnumber": "12",
            "name": "ధుని స్థాపన - 15.12.1988",
            "engname": "Dhuni Sthapana - 15.12.1988.mp3",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/12_Dhuni_Sthapana_15_12_1988.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "43:14"
        }
        , {
            "songnumber": "13",
            "name": "అస్థి నాస్థి - విద్యానగర్",
            "engname": "Asti Naasti - Vidyanagar",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/13_Asti_Naasti_Vidyanagar.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "27:46"
        }

        , {
            "songnumber": "14",
            "name": "అస్థి నాస్థి - ఒంగోలు",
            "engname": "Asti Naasti - Ongole",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/14_Asti_Naasti_Ongole.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "37:34"
        }

        , {
            "songnumber": "15A",
            "name": "వైజ్ఞానిక శాస్త్రము - భగవంతుడు",
            "engname": "Vaignanika Sastram - Bhagwantud @Nandyala",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/15A_Vaignanika_Sastram_Bhagwantudu.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "26:04"
        }

        , {
            "songnumber": "15B",
            "name": "వైజ్ఞానిక శాస్త్రము - భగవంతుడు",
            "engname": "Vaignanika Sastram - Bhagwantud @Nandyala",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/15B_Vaignanika_Sastram_Bhagwantudu.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "31:06"
        }

        , {
            "songnumber": "15C",
            "name": "వైజ్ఞానిక శాస్త్రము - భగవంతుడు",
            "engname": "Vaignanika Sastram - Bhagwantud @Nandyala",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/15C_Vaignanika_Sastram_Bhagwantudu.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "31:07"
        }
        , {
            "songnumber": "15D",
            "name": "వైజ్ఞానిక శాస్త్రము - భగవంతుడు",
            "engname": "Vaignanika Sastram - Bhagwantud @Nandyala",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/15D_Vaignanika_Sastram_Bhagwantudu.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "34:04"
        }
        , {
            "songnumber": "16",
            "name": "గురుపూర్ణిమ  ఒంగోలు I",
            "engname": "Guru Poornima-Ongole I",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/16_Guru_Poornima_Ongole_I.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "10:47"
        }

        , {
            "songnumber": "17",
            "name": "గురుపూర్ణిమ  ఒంగోలు II",
            "engname": "Guru Poornima-Ongole II",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/17_Guru_Poornima_Ongole_II.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "28:03"
        }

        , {
            "songnumber": "18",
            "name": "పూజ్య మాస్టరుగారి పుట్టినరోజు 1984",
            "engname": "Pujya Master's Birthday 1984",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/18_Mastergaru_Birthday_1984.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "16:08"
        }, {
            "songnumber": "18A",
            "name": "పూజ్య మాస్టరుగారు",
            "engname": "Mastergaru",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/18A_Mastergaru.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "33:50"
        }

        , {
            "songnumber": "18B",
            "name": "పూజ్య మాస్టరుగారు",
            "engname": "Mastergaru",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/18B_Mastergaru.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "28:12"
        }

        , {
            "songnumber": "19",
            "name": "విజయదశమి",
            "engname": "Vijayadasami",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/19_Vijayadasami.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "1:03:38"
        }

        , {
            "songnumber": "20",
            "name": "సమస్యల పరిష్కారము - బాబా సాంప్రదాయము",
            "engname": "Samasyala Parishkaaramu - Baba Sampradaayamu",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/20_Samasyala_Parishkaramu_Baba.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "1:02:48"
        }

        , {
            "songnumber": "21",
            "name": "దత్త స్తోత్రం",
            "engname": "Datta Stotram",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/21_Datta_Stotram.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "15:36"
        }
        , {
            "songnumber": "22",
            "name": "ఆధ్యాత్మిక జీవనము",
            "engname": "Adhyatmika Jeevanam",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/22_Adhyatmika_Jeevanam.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "2:06:08"
        }

        , {
            "songnumber": "23",
            "name": "ధూప్ ఆరతి",
            "engname": "Evening Arati",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/23_Evening_Arati.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "18:56"
        }, {
            "songnumber": "24",
            "name": "భజన & టాక్",
            "engname": "Bhajana and Talk",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/24_Bhajana_and_Talk.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "41:57"
        }

        , {
            "songnumber": "25A",
            "name": "భగవద్గీత 1వ రోజు",
            "engname": "Bhagawad Gita Day 1",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/25A_Bhagawad_Gita_Day_1.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "58:36"
        }
        , {
            "songnumber": "25B",
            "name": "భగవద్గీత 2వ రోజు",
            "engname": "Bhagawad Gita Day 2",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/25B_Bhagawad_Gita_Day_2.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "58:36"
        }

        , {
            "songnumber": "25C",
            "name": "భగవద్గీత 3వ రోజు",
            "engname": "Bhagawad Gita Day 3",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/25C_Bhagawad_Gita_Day_3.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "1:17:00"
        }

        , {
            "songnumber": "25D",
            "name": "భగవద్గీత 4వ రోజు",
            "engname": "Bhagawad Gita Day 4",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/25D_Bhagawad_Gita_Day_4.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "1:31:09"
        }

        , {
            "songnumber": "25E",
            "name": "భగవద్గీత 5వ రోజు",
            "engname": "Bhagawad Gita Day 5",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/25E_Bhagawad_Gita_Day_5.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "46:03"
        }

        , {
            "songnumber": "25F",
            "name": "భగవద్గీత 6వ రోజు",
            "engname": "Bhagawad Gita Day 6",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/25F_Bhagawad_Gita_Day_6.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "28:25"
        }
        , {
            "songnumber": "25G",
            "name": "భగవద్గీత 7వ రోజు",
            "engname": "Bhagawad Gita Day 7",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/25G_Bhagawad_Gita_Day_7.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "1:02:40"
        }
        , {
            "songnumber": "25H",
            "name": "భగవద్గీత 8వ రోజు",
            "engname": "Bhagawad Gita Day 8",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/25H_Bhagawad_Gita_Day_8.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "2:13:09"
        }
        , {
            "songnumber": "25I",
            "name": "భగవద్గీత 9వ రోజు",
            "engname": "Gita Day 9 on Kaarthika Pournima",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/25I_Bhagawad_Gita_Day_9_Kaarthika.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "1:12:19"
        }
        , {
            "songnumber": "26",
            "name": "శేజ్ ఆరతి",
            "engname": "Shej Aarathi",
            "artist": "Pujya Acharya Sri E.B.",
            "url": "media/telugu/26_Night_Arati.mp3",
            "cover_art_url": "imgs/Song_Images/a1.jpg",
            "duration": "13:43"
        }

    ],
    continue_next: false,
    callbacks: {
        song_change: function () {

        }
    }

}


);
