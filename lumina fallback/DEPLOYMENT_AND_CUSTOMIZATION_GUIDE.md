# Complete Deployment & Customization Guide
## The Big Fake Indian Wedding Event Setup

---

## 📋 Overview
This guide provides step-by-step instructions for:
1. Updating all "Khalbali" references to "The Big Fake Indian Wedding"
2. Customizing automated email templates
3. Deploying the form to Vercel
4. Setting up the scanner functionality

---

## 🔍 Step 1: Update Event Name References

### A. Apps Script Code Updates (`code.gs`)

**Replace the following lines:**

**Line 459:** Ticket ID Generation
```javascript
// BEFORE:
const baseId = `KHALBALI${rowNumber}${Date.now().toString().slice(-5)}`;

// AFTER:
const baseId = `BIGFAKE${rowNumber}${Date.now().toString().slice(-5)}`;
```

**Line 599:** Pending Email Subject
```javascript
// BEFORE:
const subject = '✅ We\'ve Received Your Ticket Request for Khalbali by UW Lumina!';

// AFTER:
const subject = '✅ We\'ve Received Your Ticket Request for The Big Fake Indian Wedding!';
```

**Line 612:** Pending Email Body
```javascript
// BEFORE:
const body = `Hi ${fullName},\n\nThank you for requesting ${numTickets} ticket(s) for Khalbali! Expected payment: $${expectedAmount.toFixed(2)}.\n\nWe will verify your payment and get back to you shortly. If approved, you'll get another email with your QR code ticket(s).\n\n${paymentInstructions}\nQuestions? Contact luminauw@gmail.com or +1 (629) 217-4809.\n\nCheers,\nUW Lumina`;

// AFTER:
const body = `Hi ${fullName},\n\nThank you for requesting ${numTickets} ticket(s) for The Big Fake Indian Wedding! Expected payment: $${expectedAmount.toFixed(2)}.\n\nWe will verify your payment and get back to you shortly. If approved, you'll get another email with your QR code ticket(s).\n\n${paymentInstructions}\nQuestions? Contact [YOUR_CONTACT_EMAIL] or [YOUR_PHONE].\n\nCheers,\n[YOUR_ORGANIZATION_NAME]`;
```

**Line 628:** Ticket Email Subject
```javascript
// BEFORE:
const subject = '✅ Your Tickets for Khalbali by UW Lumina are Here!';

// AFTER:
const subject = '✅ Your Tickets for The Big Fake Indian Wedding are Here!';
```

**Line 631:** Ticket Email Body Opening
```javascript
// BEFORE:
<p>Hi ${fullName},</p><p>Great news! Your payment has been confirmed. ✅ Please find your ${attendeeNames.length} ticket(s) for Khalbali, UW Lumina's Glow in the Dark party below.</p><p><strong>Important:</strong> Each QR code below represents one entry. Please have them ready for scanning at the door on your phone.</p><hr>`;

// AFTER:
<p>Hi ${fullName},</p><p>Great news! Your payment has been confirmed. ✅ Please find your ${attendeeNames.length} ticket(s) for The Big Fake Indian Wedding below.</p><p><strong>Important:</strong> Each QR code below represents one entry. Please have them ready for scanning at the door on your phone.</p><hr>`;
```

**Line 637:** Event Details Recap
```javascript
// BEFORE:
htmlBody += `<hr><p><strong>Event Details Recap:</strong></p><p>Event: Khalbali by UW Lumina<br>Date: May 17th, 2025<br>Time: 11:00 PM onwards<br>Venue: 1218 10th Avenue, Capitol Hill, Seattle, Washington</p><p>See you on the dance floor!</p><p>Cheers,<br>UW Lumina Team</p></body></html>`;

// AFTER:
htmlBody += `<hr><p><strong>Event Details Recap:</strong></p><p>Event: The Big Fake Indian Wedding<br>Date: [YOUR_EVENT_DATE]<br>Time: [YOUR_EVENT_TIME]<br>Venue: [YOUR_VENUE_ADDRESS]</p><p>See you at the celebration!</p><p>Cheers,<br>[YOUR_ORGANIZATION_NAME]</p></body></html>`;
```

**Line 672:** Scanner Dialog Text
```javascript
// BEFORE:
const html = HtmlService.createHtmlOutput(`<p>Click link to open scanner:</p><p><a href="${webAppUrl}" target="_blank" rel="noopener noreferrer">Open Khalbali Ticket Scanner</a></p><p><small>Allow camera permissions.</small></p><input type="text" value="${webAppUrl}" readonly style="width: 90%; margin-top: 10px;" onclick="this.select();">`).setWidth(450).setHeight(200);

// AFTER:
const html = HtmlService.createHtmlOutput(`<p>Click link to open scanner:</p><p><a href="${webAppUrl}" target="_blank" rel="noopener noreferrer">Open Big Fake Indian Wedding Scanner</a></p><p><small>Allow camera permissions.</small></p><input type="text" value="${webAppUrl}" readonly style="width: 90%; margin-top: 10px;" onclick="this.select();">`).setWidth(450).setHeight(200);
```

**Line 674:** Scanner Dialog Title
```javascript
// BEFORE:
SpreadsheetApp.getUi().showModalDialog(html, 'Khalbali Scanner Link');

// AFTER:
SpreadsheetApp.getUi().showModalDialog(html, 'Big Fake Indian Wedding Scanner');
```

**Line 684:** Scanner Web App Title
```javascript
// BEFORE:
.setTitle('Khalbali Ticket Scanner - UW Lumina')

// AFTER:
.setTitle('The Big Fake Indian Wedding Scanner')
```

### B. Scanner HTML Updates (`Scanner.html`)

**Line 26:** Scanner Page Title
```html
<!-- BEFORE: -->
<h2>Maya Ticket Scanner</h2>

<!-- AFTER: -->
<h2>The Big Fake Indian Wedding Scanner</h2>
```

**Line 40:** Manual Entry Placeholder
```html
<!-- BEFORE: -->
<input type="text" id="manualId" placeholder="e.g., MAYA12345-1">

<!-- AFTER: -->
<input type="text" id="manualId" placeholder="e.g., BIGFAKE12345-1">
```

### C. Documentation Updates

**Update `IMPLEMENTATION_PLAN.md` title:**
```markdown
# BEFORE:
# Custom Frontend Integration Plan for Khalbali Ticket System

# AFTER:
# Custom Frontend Integration Plan for The Big Fake Indian Wedding Ticket System
```

---

## 📧 Step 2: Automated Email Templates Overview

### Email Functions in Apps Script:

1. **`sendPendingEmail()`** - Lines 596-615
   - **Purpose:** Sent immediately after form submission
   - **Trigger:** Automatic on form submit
   - **Content:** Payment instructions and confirmation

2. **`sendTicketEmail()`** - Lines 619-649
   - **Purpose:** Sent after payment verification
   - **Trigger:** Automatic when payment is approved
   - **Content:** QR code tickets and event details

3. **Admin Error Notifications** - Various lines
   - **Purpose:** Alert administrators of system errors
   - **Trigger:** Automatic on errors
   - **Recipients:** Admin email from config sheet

### Customization Points:

**Payment Instructions (Line 601-609):**
```javascript
const paymentInstructions = `
If you haven't sent the payment yet, please do so via:
Zelle: +1 (912) 777-0981
Amount: $${expectedAmount.toFixed(2)}

IMPORTANT: Please try to include your email (${toEmail}) in the payment memo/note if possible.
`;
```

**Contact Information:**
- Update email: `luminauw@gmail.com`
- Update phone: `+1 (629) 217-4809`
- Update organization name: `UW Lumina`

**Event Details:**
- Date: `May 17th, 2025`
- Time: `11:00 PM onwards`
- Venue: `1218 10th Avenue, Capitol Hill, Seattle, Washington`

---

## 🚀 Step 3: Vercel Deployment Guide

### Prerequisites:
- Git repository (GitHub, GitLab, or Bitbucket)
- Vercel account (free tier available)
- Your Next.js application is ready

### Deployment Steps:

1. **Prepare Your Repository:**
   ```bash
   cd /Users/rudragupta/lumina\ fallback/lumina-event-form
   git init
   git add .
   git commit -m "Initial commit - The Big Fake Indian Wedding form"
   git branch -M main
   git remote add origin [YOUR_REPO_URL]
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Configuration (if needed):**
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)
   - **Development Command:** `npm run dev` (auto-detected)

4. **Environment Variables (if any):**
   - Go to Project Settings → Environment Variables
   - Add any required environment variables

5. **Custom Domain (optional):**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Configure DNS settings as instructed

### Post-Deployment:
- Your form will be available at: `https://[project-name].vercel.app`
- Update the form action URL in your Google Form if needed
- Test the complete flow: form submission → email → payment → tickets

---

## 🔧 Step 4: Google Apps Script Setup

### Initial Setup:
1. **Open Google Apps Script:** [script.google.com](https://script.google.com)
2. **Create New Project** or open existing
3. **Paste the updated `code.gs` content**
4. **Create/Link Google Sheet** with proper column headers
5. **Run `setupTriggers()` function** once

### Web App Deployment (for Scanner):
1. **Deploy → New Deployment**
2. **Type:** Web app
3. **Execute as:** Me
4. **Who has access:** Anyone
5. **Copy the Web App URL** for scanner access

### Required Google Sheet Columns:
- Column A: Timestamp
- Column B: Full Name
- Column C: Email Address
- Column D: Number of Tickets
- Column E: Attendee Names
- Column F: Expected Amount
- Column G: Status
- Column H: Ticket IDs
- Column I: Admin Notes
- Column J: Processed Timestamp

---

## 📱 Step 5: Scanner Setup

### Access Methods:
1. **Direct URL:** Use the Web App URL from Apps Script deployment
2. **From Google Sheets:** Use the "Open Scanner" menu option
3. **Mobile-Friendly:** Scanner works on smartphones with camera access

### Scanner Features:
- **QR Code Scanning:** Point camera at ticket QR codes
- **Manual Entry:** Type ticket IDs manually if scanning fails
- **Real-time Updates:** Instantly updates Google Sheet with check-in status
- **Duplicate Prevention:** Prevents double check-ins

---

## ✅ Step 6: Testing Checklist

### Before Going Live:
- [ ] Test form submission from Vercel-deployed site
- [ ] Verify pending email is received
- [ ] Test payment detection (if using Zelle monitoring)
- [ ] Confirm ticket email with QR codes
- [ ] Test scanner with generated QR codes
- [ ] Verify all event details are correct
- [ ] Check all email templates have correct information

### Final Verification:
- [ ] All "Khalbali" references updated
- [ ] Contact information updated
- [ ] Event details updated
- [ ] Payment instructions updated
- [ ] Scanner functionality working
- [ ] Form deployed and accessible

---

## 🆘 Troubleshooting

### Common Issues:

**Form Not Submitting:**
- Check Google Form URL in form action
- Verify field names match Google Form exactly
- Check browser console for errors

**Emails Not Sending:**
- Verify Gmail API permissions
- Check spam folders
- Review Apps Script execution logs

**Scanner Not Working:**
- Ensure camera permissions granted
- Check Web App deployment settings
- Verify QR codes are generated correctly

**Payment Not Detected:**
- Check Zelle email monitoring setup
- Verify email parsing logic
- Review admin notes for processing status

---

## 📞 Support

For technical issues:
1. Check Google Apps Script execution logs
2. Review browser console errors
3. Verify all configuration settings
4. Test with sample data first

---

*Last Updated: January 2025*