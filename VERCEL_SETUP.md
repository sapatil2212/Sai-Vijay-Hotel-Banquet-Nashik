# Vercel Deployment Setup Guide

## Email Configuration for Vercel

To ensure emails are sent correctly from your Vercel deployment, you need to add the following environment variables to your Vercel project:

1. Log in to your Vercel dashboard
2. Select your Hotel Sai Vijay project
3. Go to "Settings" > "Environment Variables"
4. Add the following environment variables:

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=saivijaynashik@gmail.com
EMAIL_PASS=tnbhxjgbvevdhxce
EMAIL_FROM=Hotel Sai Vijay <saivijaynashik@gmail.com>
EMAIL_BCC=saptechnoeditors@gmail.com
GOOGLE_SHEET_DEPLOY_URL=https://script.google.com/macros/s/AKfycbxcUn5beNaO6oGlSF4cawDC1ErLLD9zGYXLanMOuqWTYkClmLUA23hdecBqssEVYkb9/exec
```

5. Click "Save" to apply these environment variables
6. Redeploy your application

## Gmail Security Settings

If emails are still not being sent after adding the environment variables, you may need to adjust your Gmail security settings:

1. Log in to the Gmail account (saivijaynashik@gmail.com)
2. Go to Google Account settings
3. Select "Security" from the left menu
4. Under "Less secure app access", turn on "Allow less secure apps" 
   (Note: Google may have removed this option. If so, follow the next steps)
5. Enable 2-Step Verification for your account
6. Create an "App Password" specifically for this application
7. Use this App Password instead of your regular password in the EMAIL_PASS environment variable

## Troubleshooting

If you're still experiencing issues:

1. Check Vercel logs for any error messages
2. Verify that all environment variables are correctly set
3. Make sure the Gmail account is not blocking the automated emails
4. Test the email functionality locally before deploying to Vercel

For additional help, contact your developer or email support.
