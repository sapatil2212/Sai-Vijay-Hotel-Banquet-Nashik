# Deployment Instructions for Hotel Sai Vijay Website

## Deploying to Vercel

Follow these steps to deploy your website to Vercel with the email functionality working correctly:

### 1. Prepare Your Repository

Make sure all your changes are committed to your Git repository:

```bash
git add .
git commit -m "Fixed email functionality for Vercel deployment"
git push
```

### 2. Deploy to Vercel

If you're deploying for the first time:

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "Add New" > "Project"
3. Import your Git repository
4. Configure the project:
   - Framework Preset: Select the appropriate framework (Next.js, React, etc.)
   - Root Directory: ./
   - Build Command: Leave as default or customize if needed
   - Output Directory: Leave as default or customize if needed

If you're redeploying:

1. Go to your Vercel dashboard
2. Select the Hotel Sai Vijay project
3. Click "Deployments" tab
4. Click "Redeploy" on the latest deployment or deploy from a new Git commit

### 3. Configure Environment Variables

This is the most important step for email functionality:

1. In your Vercel project, go to "Settings" > "Environment Variables"
2. Add the following environment variables:

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=saivijaynashik@gmail.com
EMAIL_PASS=tnbhxjgbvevdhxce
EMAIL_FROM=Hotel Sai Vijay <saivijaynashik@gmail.com>
EMAIL_BCC=saptechnoeditors@gmail.com
GOOGLE_SHEET_DEPLOY_URL=https://script.google.com/macros/s/AKfycbxcUn5beNaO6oGlSF4cawDC1ErLLD9zGYXLanMOuqWTYkClmLUA23hdecBqssEVYkb9/exec
```

3. Click "Save" to apply these environment variables
4. Redeploy your application for the changes to take effect

### 4. Test Email Functionality

After deployment, test the email functionality:

1. Visit your deployed site
2. Navigate to `/api/test-email` endpoint in your browser or use a tool like Postman
3. Check the response to verify if emails are being sent successfully
4. If successful, try submitting a form on your website to test the full functionality

### 5. Troubleshooting

If emails are still not being sent:

1. Check Vercel logs for any error messages:
   - Go to your Vercel project dashboard
   - Click on the latest deployment
   - Go to "Functions" tab
   - Look for any errors in the API routes

2. Verify Gmail settings:
   - Make sure the Gmail account allows access from less secure apps, or
   - Set up an App Password if using 2-Step Verification

3. Test locally before deploying:
   - Run `npm run dev` or `yarn dev` locally
   - Test the email functionality
   - Check console logs for any errors

For more detailed instructions, refer to the `VERCEL_SETUP.md` file.

## Maintaining Your Deployment

### Updating Your Site

When you make changes to your site:

1. Commit changes to your Git repository
2. Vercel will automatically deploy the changes (if auto-deploy is enabled)
3. If auto-deploy is disabled, manually trigger a new deployment from the Vercel dashboard

### Monitoring

1. Set up monitoring in Vercel to track your site's performance
2. Regularly check the logs for any errors
3. Test the contact forms periodically to ensure they're working correctly
