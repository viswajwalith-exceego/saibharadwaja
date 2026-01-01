using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class pages_Shridi_Arathi_Download : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        
    }

        protected void btnKA_Click(object sender, EventArgs e)
    {
        if (returnCaptchaQualification())
        {
            Response.ContentType = "application/octect-stream";
            Response.AppendHeader("content-disposition", "filename = Kakada_Arathi_SBorg.mp3");
            Response.TransmitFile(Server.MapPath("~/audiovideos/shirdiarathulu/Kakada_Arathi_SBorg.mp3"));
            Response.End();
        }
    }

   
    protected void btnMA_Click(object sender, EventArgs e)
    {
        if (returnCaptchaQualification())
        {
            Response.ContentType = "application/octect-stream";
            Response.AppendHeader("content-disposition", "filename = Madhyahna_Arathi_SBorg.mp3");
            Response.TransmitFile(Server.MapPath("~/audiovideos/shirdiarathulu/Madhyahna_Arathi_SBorg.mp3"));
            Response.End();
        }
    }

    protected void btnDA_Click(object sender, EventArgs e)
    {
        if (returnCaptchaQualification())
        {
            Response.ContentType = "application/octect-stream";
            Response.AppendHeader("content-disposition", "filename =Dhoop_ Arathi_SBorg.mp3");
            Response.TransmitFile(Server.MapPath("~/audiovideos/shirdiarathulu/Dhoop_ Arathi_SBorg.mp3"));
            Response.End();
        }
    }

    protected void btnSA_Click(object sender, EventArgs e)
    {
        if (returnCaptchaQualification())
        {
            Response.ContentType = "application/octect-stream";
            Response.AppendHeader("content-disposition", "filename = Shej_Arathi_SBorg.mp3");
            Response.TransmitFile(Server.MapPath("~/audiovideos/shirdiarathulu/Shej_Arathi_SBorg.mp3"));
            Response.End();
        }
    }


    protected bool returnCaptchaQualification()
    {
        Boolean boolAllowDownload = false;
        try
        {
            string result = txtCaptcha.Text;          
            if (result == Session["CaptchaValue"].ToString())
            {
                lblStatus.Text = "Right..";
                lblStatus.ForeColor = System.Drawing.Color.Green;
                boolAllowDownload = true;
            }
            else
            {
                lblStatus.Text = "Wrong. Try Again..";
                lblStatus.ForeColor = System.Drawing.Color.Red;
            }
            txtCaptcha.Text = "";
        }
        catch { }

        return boolAllowDownload;
    }
}