# Custom Frontend Integration Plan for The Big Fake Indian Wedding Ticket System

## Overview
This plan outlines how to integrate a custom frontend (React/Next.js) with your existing Google Apps Script ticket management system while preserving all current functionality.

## Current System Analysis

### Existing Architecture
- **Google Form** → **Google Sheets** → **Apps Script Processing**
- **Gmail Integration** for Zelle payment verification
- **QR Code Generation** and email delivery
- **Scanner Web App** for event check-ins
- **Automated triggers** for payment monitoring and timeout handling

### Key Components Identified
1. `onFormSubmit(e)` - Main form processing function
2. `checkZelleEmailsAndVerify()` - Payment verification
3. `generateAndSendTickets()` - Ticket generation and delivery
4. `checkInAttendee()` - Scanner functionality
5. Time-based triggers for automation

## Implementation Strategy

### Phase 1: Apps Script Backend Modifications ✅ COMPLETED

#### 1.1 Add doPost() Endpoint ✅ COMPLETED

The `doPost()` function has been added to your `code.gs` file. This endpoint:
- Accepts JSON POST requests from your custom frontend
- Validates required fields (fullName, email, numTickets, secret)
- Performs security validation using shared secret
- Inserts data into the sheet and triggers existing workflow
- Returns appropriate JSON responses

#### 1.2 Add Helper Functions ✅ COMPLETED

The following helper functions have been added to your `code.gs` file:

- **`getSharedSecret(configSheet)`**: Retrieves the shared secret from Config sheet (cell B3)
- **`insertCustomFormSubmission(...)`**: Inserts form data into the sheet and triggers existing `onFormSubmit` logic

#### 1.3 Configuration Setup Required

**IMPORTANT**: You need to add a shared secret to your Config sheet:

1. Open your Google Sheet
2. Go to the "Config" sheet
3. In cell **B3**, enter a strong shared secret (e.g., `my-super-secret-key-2024`)
4. This secret will be used to authenticate requests from your frontend

### Phase 2: Deploy Web App

1. In Apps Script Editor: **Deploy** → **New deployment**
2. Type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone** (for public form access)
5. Copy the Web App URL for frontend use

#### 2.1 Test the Endpoint

Test using curl or Postman:

```bash
curl -X POST "YOUR_WEB_APP_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "numTickets": 2,
    "attendeeNamesStr": "John Doe, Jane Doe",
    "screenshotUrl": "",
    "secret": "your-shared-secret-here"
  }'
```

### Phase 3: Frontend Implementation ✅ COMPLETED

#### 3.1 Next.js Form Component ✅ COMPLETED

A complete React component (`EventTicketForm.jsx`) has been created with:
- Form validation and error handling
- Responsive design with Tailwind CSS
- Integration with your Apps Script endpoint
- Security token authentication
- User-friendly success/error messages

#### 3.2 Next.js Page ✅ COMPLETED

A complete Next.js page (`page.js`) has been created that:
- Uses the EventTicketForm component
- Provides clear instructions for users
- Explains the registration and payment process
- Includes helpful notes about payment matching

## Deployment Instructions

### Step 1: Configure Apps Script
1. Add your shared secret to Config sheet cell B3
2. Deploy as Web App (Deploy → New Deployment)
3. Set execution as "Me" and access to "Anyone"
4. Copy the Web App URL

### Step 2: Set Up Frontend
1. Create a new Next.js project: `npx create-next-app@latest my-event-form`
2. Install Tailwind CSS: `npm install -D tailwindcss postcss autoprefixer`
3. Copy the provided `EventTicketForm.jsx` and `page.js` files
4. Update the `APPS_SCRIPT_URL` and `SHARED_SECRET` in EventTicketForm.jsx
5. Deploy to Vercel or your preferred platform

### Step 3: Test End-to-End
1. Submit a test form
2. Verify data appears in your Google Sheet
3. Check that existing workflows (email notifications, etc.) still work

## Security Considerations

- Store shared secret in environment variables in production
- Apps Script automatically handles CORS
- Both frontend and backend validation implemented
- Consider rate limiting if needed

## Benefits of This Implementation

✅ **Zero Backend Migration**: All existing Apps Script logic preserved  
✅ **Custom UI**: Full control over form design and user experience  
✅ **Same Data Flow**: Identical sheet structure and processing  
✅ **Security**: Shared secret prevents unauthorized submissions  
✅ **Maintainability**: Frontend and backend can be updated independently  

## Files Created

- `code.gs` - Updated with doPost endpoint and helper functions
- `EventTicketForm.jsx` - React form component
- `page.js` - Next.js page implementation
- `IMPLEMENTATION_PLAN.md` - This comprehensive guide

## Next Steps

1. ✅ Backend modifications completed
2. ✅ Frontend components created
3. 🔄 Deploy Apps Script as Web App
4. 🔄 Set up Next.js project
5. 🔄 Test end-to-end functionality

Your existing Google Forms, Zelle verification, ticket generation, and scanner functionality will continue working exactly as before! 🎉