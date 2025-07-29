import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InvoiceEmailRequest {
  clientEmail: string;
  clientName: string;
  quoteNumber: string;
  websiteType: string;
  total: number;
  validUntil: string;
  calculation: any;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      clientEmail, 
      clientName, 
      quoteNumber, 
      websiteType, 
      total, 
      validUntil,
      calculation 
    }: InvoiceEmailRequest = await req.json();

    console.log("Sending invoice email to:", clientEmail);

    const emailResponse = await resend.emails.send({
      from: "BuildIT <onboarding@resend.dev>",
      to: [clientEmail],
      subject: `Your Website Quote - ${quoteNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">BuildIT</h1>
            <p style="color: #666; margin: 5px 0;">Professional Website Solutions</p>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1e293b; margin-top: 0;">Quote: ${quoteNumber}</h2>
            <p>Dear ${clientName},</p>
            <p>Thank you for your interest in our website development services. Please find your detailed quote below:</p>
          </div>
          
          <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #1e293b; margin-top: 0;">Quote Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">Website Type:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold;">${websiteType}</td>
              </tr>
              ${calculation.addOns && calculation.addOns.length > 0 ? `
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">Add-ons:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${calculation.addOns.map((addon: any) => addon.name).join(', ')}</td>
              </tr>
              ` : ''}
              ${calculation.hostingPlan ? `
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">Hosting:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${calculation.hostingPlan.name}</td>
              </tr>
              ` : ''}
              ${calculation.urgencyLevel ? `
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">Timeline:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${calculation.urgencyLevel.name}</td>
              </tr>
              ` : ''}
              ${calculation.builderType ? `
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">Service Type:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${calculation.builderType.name}</td>
              </tr>
              ` : ''}
              <tr style="font-weight: bold; font-size: 18px;">
                <td style="padding: 15px 0;">Total Amount:</td>
                <td style="padding: 15px 0; color: #2563eb;">KES ${total.toLocaleString()}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
            <p style="margin: 0; color: #92400e;"><strong>⏰ Limited Time Offer</strong></p>
            <p style="margin: 5px 0 0 0; color: #92400e;">This quote is valid until <strong>${validUntil}</strong></p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #666;">Ready to get started? Contact us to schedule your consultation.</p>
            <p style="color: #666;">We'll be in touch within 24 hours to discuss your project details.</p>
          </div>
          
          <div style="text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; color: #666; font-size: 14px;">
            <p>BuildIT - Professional Website Solutions</p>
            <p>Thank you for choosing us for your website project!</p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending invoice email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);