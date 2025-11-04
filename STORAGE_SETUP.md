# Firebase Storage Setup Guide

## Fixing CORS and Authentication Issues

The CORS error you're seeing is because Firebase Storage requires proper authentication. Here's how to fix it:

## Step 1: Create a Firebase User

1. Go to Firebase Console → Authentication
2. Click "Get Started" if not already enabled
3. Go to "Users" tab
4. Click "Add user"
5. Enter an email (e.g., `admin@maclabs.com`) and password
6. Click "Add user"

## Step 2: Set Up Storage Rules

Firebase Storage rules need to be in a separate file. You have two options:

### Option A: Allow authenticated users only (Recommended for production)

Create or update `storage.rules` file:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /blog-images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /author-images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Then deploy the rules:
```bash
firebase deploy --only storage
```

### Option B: Allow unauthenticated uploads (For development/testing only)

**⚠️ WARNING: This is less secure. Only use for development.**

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

## Step 3: Login to Admin Page

When logging in to the admin page:
- Use the email address you created in Firebase (e.g., `admin@maclabs.com`)
- Use the password you set for that user

The login form will now authenticate with Firebase Auth, which will allow image uploads to work.

## Step 4: Verify Storage is Enabled

1. Go to Firebase Console → Storage
2. Make sure Storage is enabled
3. If you see "Get Started", click it and:
   - Choose "Start in test mode" (for development) or "Start in production mode" (for production)
   - Select a location (choose closest to your users)

## Troubleshooting

### Still getting CORS errors?

1. **Check if you're authenticated**: 
   - Open browser console
   - Check if `auth.currentUser` is not null after login

2. **Check Storage Rules**:
   - Go to Firebase Console → Storage → Rules
   - Make sure rules are deployed correctly

3. **Check Storage Bucket**:
   - Go to Firebase Console → Storage
   - Make sure Storage is enabled and the bucket exists

4. **Clear browser cache**:
   - Sometimes cached rules can cause issues
   - Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### If you want to use simple auth (username: admin, password: maclabs2024)

You can temporarily modify the Storage rules to allow unauthenticated uploads (Option B above), but this is **not recommended for production**.

## Current Code Behavior

The code now:
1. Checks if user is authenticated with Firebase Auth before uploading
2. Shows a clear error message if not authenticated
3. Uses Firebase Storage to upload images
4. Sanitizes filenames to avoid special character issues

## Next Steps

1. Create a Firebase user as described in Step 1
2. Set up Storage rules (Option A recommended)
3. Login with the Firebase email/password
4. Try uploading an image - it should work now!

