<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Shridi_Arathi_Download.aspx.cs" Inherits="pages_Shridi_Arathi_Download" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Download Arathi</title>
     <style>
      nav{
      display:flex;
      flex-wrap:wrap;
      text-decoration: none;
      display:block;
      padding: 15px 25px;
      text-align: center;
      background-color: #BADEF6;
      color : #093E61 ;
      margin-left:auto; 
      margin-right:auto; 
      font-family:sans-serif;
      }

         table {
             border: 1px solid black;
             border: thin;
             border-spacing: 10px;
             margin-left:auto; 
             margin-right:auto; 
         }
   
         td {
             border : none;
         }

         button {
              background-color: #4CAF50; /* Green */
              border: 2px;
              color: cadetblue;
              padding: 15px 32px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 36px;
            }
   
   </style>
</head>
<body>
<form id="frmSBORG" runat="server">
        <nav>
            <asp:Label ID="Label1" runat="server" Font-Bold="True" Font-Size="Medium" Font-Names="Gill Sans MT" ForeColor="#003300" Text="Jai Sai Master!!"></asp:Label>
            <br />
            <br />
            <u><asp:Label ID="Label2" runat="server" Font-Bold="True"  Font-Size="Larger"  Font-Names="Gill Sans MT" ForeColor="#003300" Text="Saibharadwaja.org"></asp:Label></u>
            <br /><br />
            <asp:Label ID="Label3" runat="server" Font-Bold="True" Font-Size="Medium"  Font-Names="Gill Sans MT" ForeColor="#003300" Text="Download Shirdi Arathi Files"></asp:Label>
            <br />
            <asp:Label ID="Label7" runat="server" Font-Bold="True"  Font-Size="X-Small"  Font-Names="Gill Sans MT" ForeColor="#003300" Text="Audio files - .mp3 "></asp:Label>
            <br />            
            <asp:Label ID="Label4" runat="server" Font-Bold="True" Font-Size="Small"  Font-Names="Gill Sans MT" ForeColor="#003300" Text="With Slokas Prayer on Parama Pujya Master added"></asp:Label>
            <br />
            <br />

            <asp:Table runat="server">
                <asp:TableRow><asp:TableCell><asp:Button ID="btnKA" runat="server" OnClick="btnKA_Click" Text="KAKADA ARATHI" width="200px"/></asp:TableCell></asp:TableRow>
                <asp:TableRow><asp:TableCell><asp:Button ID="btnMA" runat="server" OnClick="btnMA_Click" Text="MADHYAHNA ARATHI" width="200px"/></asp:TableCell></asp:TableRow>
                <asp:TableRow><asp:TableCell><asp:Button ID="btnDA" runat="server" OnClick="btnDA_Click" Text="DHOOP ARATHI" width="200px"/></asp:TableCell></asp:TableRow>
                <asp:TableRow><asp:TableCell><asp:Button ID="btnSA" runat="server" OnClick="btnSA_Click" Text="SHEJ ARATHI" width="200px"/></asp:TableCell></asp:TableRow>
            </asp:Table>
     

      
    <div>
        <table>
            <tr>
                <td colspan="2">                    
                     <asp:Label ID="Label5" runat="server" Font-Bold="True" Font-Size="Small" Font-Names="Gill Sans MT" ForeColor="#413386" Text="First please Enter the"></asp:Label>
                     <br />
                     <asp:Label ID="Label6" runat="server" Font-Bold="True"  Font-Size="Small"  Font-Names="Gill Sans MT" ForeColor="#413386" Text="Result of below calculation..."></asp:Label>                     
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <asp:Label  runat="server" Font-Bold="True"  Font-Size="Small"  Font-Names="Gill Sans MT" ForeColor="Red" ID="lblStatus"></asp:Label>
                </td>
            </tr>
            <tr>
                <td>
                    <img src="MathsCaptcha/sbMathCaptcha.aspx" alt=""/>
                </td>
                <td>
                    <asp:TextBox runat="server" ID="txtCaptcha"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                </td>
            </tr>
        </table>
    </div>
       </nav>
    </form>
</body>
</html>
