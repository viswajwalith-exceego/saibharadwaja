<%@ Page Title="" Language="C#" MasterPageFile="~/sbjsm.master" AutoEventWireup="true" CodeFile="magazinebs.aspx.cs" Inherits="pages_magazinebs" %>


<asp:Content ID="Content1" ContentPlaceHolderID="cphSbMasterHead" runat="Server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="cphSbChildPageContent" runat="Server">
    <div class="theChildPageContentOffsetter">
        <div class="container bg-transparant d-flex justify-content-center ">
            <div class="row">
                <div class="col">
                    <span class="PageHeadingBS1">Saibaba Magazine</span>
                </div>
            </div>
        </div>
    </div>

    <div class="container bg-transparant pt-sm-2 pt-md-3">
        <%--Padding Div1--%>
        <div class="container bg-transparant pt-sm-2 pt-md-3">
            <%--Padding Div2--%>

            <div class="accordion accordion-flush " id="accordionFlusA1">
                <%--Accordian Flush Start--%>
                <div class="accordion-item">
                    <%--Accordian Item--%>

                    <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            <span class="TitleColourNShadow1"><strong>2021</strong></span>
                        </button>
                    </h2>

                    <div id="flush-collapseOne" class="accordion-collapse collapse show" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlusA1">
                        <%--Accordian Collapse Body--%>
                        <div class="accordion-body p-0">
                           <%--Accordian Item Body--%>    

                            <div class="table-responsive">
                            <table class="table table-light text-center textJustifiedNoMargin" >                                
                            <tbody>                                 
                                <tr>
                                    <td colspan="3" ><a href="../magazines/Saibaba_Magazine_October_2021.pdf" target="_blank">
                                        <img class="img-fluid" src="../images/Magazines/2021October.jpg" /></a>
                                   </td>                                   
                                </tr>
                                  <tr>
                                    <td colspan="3">October 2021</td>                                    
                                </tr>
                                  <tr>
                                    <td><a href="../magazines/Saibaba_Magazine_April_2021.pdf" target="_blank" >
                                       <img  class="img-fluid" src="../images/Magazines/2021April.jpg" /></a>
                                   </td>
                                    <td><a href="../magazines/Saibaba_Magazine_May_2021.pdf" target="_blank" >
                                       <img  class="img-fluid" src="../images/Magazines/2021May.jpg" /> </a>
                                   </td>
                                   <td><a href="../magazines/Saibaba_Magazine_July_2021.pdf" target="_blank" >
                                       <img  class="img-fluid" src="../images/Magazines/2021July.jpg" /> </a>
                                   </td>
                                  </tr>                   

                                 <tr>
                                    <td>April 2021 </td>
                                    <td>May 2021  </td>
                                   <td>July 2021</td>
                                </tr>

                             </tbody>
                            </table>
                           </div>
                         </div>
                        <%--Accordian Item Body--%>
                    </div>
                    <%--Accordian Collapse Body--%>
                </div>
                <%--Accordian Item--%>

                
                <div class="accordion-item">
                    <%--Accordian Item--%>
                    <h2 class="accordion-header" id="flush-headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            <span class="TitleColourNShadow1"><strong>Previous Years</strong></span>
                        </button>
                    </h2>

                    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlusA1">
                        <%--Accordian Collapse Body--%>
                        <div class="accordion-body">
                            <%--Accordian Item Body--%>
                           
                        <div class="table-responsive">
                            <table class="table table-light text-center textJustifiedNoMargin " >
                            <tbody>
                                 <tr>
                                    <td><a href="../magazines/Saibaba_Magazine_October_2019.pdf" target="_blank" class="textDarkBlueLink" >
                                       <img  class="img-fluid" src="../images/Magazines/2019October.jpg" /></a>
                                   </td>
                                    <td><a href="https://issuu.com/saibabamagazine/docs/sai_baba_masapatrika__telugu__-_nov" target="_blank" class="textDarkBlueLink" >
                                       <img  class="img-fluid" src="../images/Magazines/2016November.jpg" /> </a>
                                   </td>
                                   <td><a href="https://issuu.com/saibabamagazine/docs/feb_2k16_for_issuu" target="_blank" class="textDarkBlueLink" >
                                       <img  class="img-fluid" src="../images/Magazines/2016February.jpg" /> </a>
                                   </td>
                                  </tr>
                      

                                <tr>
                                    <td>October 2019 </td>
                                    <td>November 2016  </td>
                                   <td>February 2016</td>
                                </tr>

                                <tr>
                                    <td><a href="https://issuu.com/saibabamagazine/docs/saibaba_masapatrika_-_november_2015" target="_blank" class="textDarkBlueLink" >
                                       <img  class="img-fluid" src="../images/Magazines/2015November.jpg" /></a>
                                   </td>
                                    <td><a href="https://issuu.com/saibabamagazine/docs/sai_baba_masapatrika_april_2015_iss" target="_blank" class="textDarkBlueLink" >
                                       <img  class="img-fluid" src="../images/Magazines/2015April.jpg" /> </a>
                                   </td>
                                   <td><a href="https://issuu.com/saibabamagazine/docs/sai_baba_magazine_-_march_2015_for_" target="_blank" class="textDarkBlueLink" >
                                       <img  class="img-fluid" src="../images/Magazines/2015March.jpg" /> </a>
                                   </td>
                                  </tr>
                      

                                <tr>
                                    <td>November 2015 </td>
                                    <td>April 2015  </td>
                                   <td>March 2015</td>
                                </tr>

                                
                                <tr>
                                    <td><a href="https://issuu.com/saibabamagazine/docs/sai_baba_masapatrika_2014_-_april_i" target="_blank" class="textDarkBlueLink" >
                                       <img  class="img-fluid" src="../images/Magazines/2014April.jpg" /></a>
                                   </td>
                                    <td><a href="https://issuu.com/saibabamagazine/docs/oct_2013_finals_for_web_small" target="_blank" class="textDarkBlueLink" >
                                       <img  class="img-fluid" src="../images/Magazines/2013October.jpg" /> </a>
                                   </td>
                                   <td><a href="https://issuu.com/saibabamagazine/docs/sai_baba_magazine_october_2012" target="_blank" class="textDarkBlueLink" >
                                       <img  class="img-fluid" src="../images/Magazines/2012October.jpg" /> </a>
                                   </td>
                                  </tr>
                      

                                <tr>
                                    <td>April 2014</td>
                                    <td>October 2013  </td>
                                   <td>October 2012</td>
                                </tr>

                             </tbody>
                            </table>
                           </div>


                        </div>
                        <%--Accordian Item Body--%>
                    </div>
                    <%--Accordian Collapse Body--%>
                </div>
                <%--Accordian Item--%>

             </div>
        </div>
    </div>
 	
    <br />
    <br />
    <p class="jaisaimaster">Jai Sai Master</p> 

    <br />
    <br />
    <br />

 </asp:Content>