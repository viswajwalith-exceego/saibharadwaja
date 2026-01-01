<%@ Page Title="" Language="C#" MasterPageFile="~/sbjsm.master" AutoEventWireup="true" CodeFile="gallery1.aspx.cs" Inherits="photos_gallery" %>


<asp:Content ID="Content1" ContentPlaceHolderID="cphSbMasterHead" Runat="Server">
    <title>Photo Gallery - Saibharadwaja.org</title>
    <!-- Include Unite Gallery core files -->
    <script src="unitegallery/dist/js/jquery-11.0.min.js"></script>
    <script src='unitegallery/dist/js/unitegallery.min.js' type='text/javascript'></script>
    <link href='unitegallery/dist/css/unite-gallery.css' rel='stylesheet' type='text/css' />
    <!-- include Unite Gallery Theme Files -->
    <script src='unitegallery/dist/themes/tilesgrid/ug-theme-tilesgrid.js' type='text/javascript'></script>
    <link rel='stylesheet' href='unitegallery/skins/alexis/alexis.css' type='text/css' />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphSbChildPageContent" Runat="Server">

        <div class="table-responsive">
            <table class="table table-transparant table-borderless text-center textJustifiedNoMargin">
                <tbody>
                    <tr>
                        <td><span class="PageHeadingBS1">Photo Gallery</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

<div class="photosNavigator GglSourceSansPro">
        <ul>
            <li><a  class="active" href="gallery1.aspx">Early Years  [15]</a></li>
            <li><a href="gallery2.aspx">Family</a></li>
            <li><a href="gallery3.aspx">Photos Set 3</a></li>
            <li><a href="gallery4.aspx">Photos Set 4</a></li>
            <li><a href="gallery5.aspx">Photos Set 5</a></li>
            <li><a href="gallery6.aspx">Photos Set 6</a></li>
            <li><a href="gallery7.aspx">Photos Set 7</a></li>
        </ul>
    </div>
        
    <br />
    <br />
    <br />

        <div id="gallery">
        <img alt="" src="../images/Photos/1 Early Years/C1.jpg" data-image="../images/Photos/1 Early Years/CI1.jpg" data-description="">
        <img alt="" src="../images/Photos/1 Early Years/C2.jpg" data-image="../images/Photos/1 Early Years/CI2.jpg" data-description="">
        <img alt="" src="../images/Photos/1 Early Years/C3.jpg" data-image="../images/Photos/1 Early Years/CI3.jpg" data-description="">
        <img alt="" src="../images/Photos/1 Early Years/C4.jpg" data-image="../images/Photos/1 Early Years/CI4.jpg" data-description="">
        <img alt="" src="../images/Photos/1 Early Years/C5.jpg" data-image="../images/Photos/1 Early Years/CI5.jpg" data-description="">
        <img alt="" src="../images/Photos/1 Early Years/C6.jpg" data-image="../images/Photos/1 Early Years/CI6.jpg" data-description="">
        <img alt="" src="../images/Photos/1 Early Years/C7.jpg" data-image="../images/Photos/1 Early Years/CI7.jpg" data-description="">
        <img alt="" src="../images/Photos/1 Early Years/C8.jpg" data-image="../images/Photos/1 Early Years/CI8.jpg" data-description="">
        <img alt="" src="../images/Photos/1 Early Years/C9.jpg" data-image="../images/Photos/1 Early Years/CI9.jpg" data-description="">
        <img alt="" src="../images/Photos/1 Early Years/C10.jpg" data-image="../images/Photos/1 Early Years/CI10.jpg" data-description="">
        <img alt="" src="../images/Photos/1 Early Years/C11.jpg" data-image="../images/Photos/1 Early Years/CI11.jpg" data-description="">
        <img alt="" src="../images/Photos/1 Early Years/C12.jpg" data-image="../images/Photos/1 Early Years/CI12.jpg" data-description="">
        <img alt="" src="../images/Photos/1 Early Years/C13.jpg" data-image="../images/Photos/1 Early Years/CI13.jpg" data-description="">
        <img alt="" src="../images/Photos/1 Early Years/C15.jpg" data-image="../images/Photos/1 Early Years/CI15.jpg" data-description="">
        <img alt="" src="../images/Photos/1 Early Years/C14.jpg" data-image="../images/Photos/1 Early Years/CI14.jpg" data-description="">
        </div>

  
    <script type="text/javascript">
        jQuery(document).ready(function () {
            <%--var idOfDIV = document.getElementById("<%= Gallery1.ClientID %>").id;
            alert(idOfDIV);--%>
            jQuery("#gallery").unitegallery({
                gallery_theme: "tilesgrid",
                theme_navigation_type: "arrows",
                tile_enable_shadow:false,
                tile_enable_border: true,
                tile_enable_outline: false,
	            tiles_space_between_cols:15,
	            tiles_justified_space_between:15,
	            tile_border_color: "#c5b61d",
	            tile_border_width:2,
	            tiles_col_width:250,
	            tile_border_radius:5,
                slider_bullets_skin: "alexis"
            });
        });
    </script>


    <br />
    <br />
    <p class="TitleColourNShadow1">To see next page of images on Mobiles <br /> Touch and Pull any Image sideways</p>
    <p class="jaisaimaster">__Jai Sai Master__</p>
    <br /><br />


</asp:Content>