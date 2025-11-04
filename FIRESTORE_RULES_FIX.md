# Firestore Rules Fix

## The Problem

The error "Missing or insufficient permissions" occurs because:
1. The admin page needs to read ALL posts (including unpublished drafts)
2. The original rules only allowed reading published posts: `resource.data.published == true`
3. When querying a collection, Firestore can't check `resource.data` on all documents at once

## The Solution

I've updated the `firestore.rules` file to:
1. Allow authenticated users to read all posts (including drafts)
2. Allow public users to read only published posts
3. Allow authenticated users to query the entire collection

## Deploy the Rules

**IMPORTANT:** After updating the rules, you MUST deploy them:

### Option 1: Deploy via Firebase Console (Recommended)
1. Go to Firebase Console → Firestore Database → Rules tab
2. Copy the updated rules from `firestore.rules` file
3. Paste them into the Rules editor
4. Click "Publish"

### Option 2: Deploy via Firebase CLI
```bash
firebase deploy --only firestore:rules
```

## Verify Rules Are Deployed

1. Go to Firebase Console → Firestore Database → Rules tab
2. Make sure the rules you see match the updated `firestore.rules` file
3. Check the "Last published" timestamp to confirm recent deployment

## Current Rules Structure

```javascript
// Blog posts - public read for published posts, authenticated read/write for all posts
match /blog_posts/{postId} {
  // Allow public to read published posts, authenticated users to read all posts
  allow read: if resource.data.published == true || request.auth != null;
  // Allow authenticated users to write (create, update, delete)
  allow write: if request.auth != null;
}

// Allow authenticated users to query the entire blog_posts collection
match /blog_posts/{document=**} {
  allow read: if request.auth != null;
}
```

## After Deploying

1. Make sure you're logged in with Firebase Auth (not just simple username/password)
2. Refresh the admin page
3. The posts should now load without permission errors

## Troubleshooting

### Still getting permission errors?

1. **Check authentication**: Make sure you're signed in with Firebase Auth
   - Open browser console
   - Check: `firebase.auth().currentUser` should not be null

2. **Verify rules are deployed**:
   - Go to Firebase Console → Firestore Database → Rules
   - Check if rules match what's in `firestore.rules` file
   - If not, copy and paste them, then click "Publish"

3. **Wait a few seconds**: Rules can take a few seconds to propagate

4. **Clear browser cache**: Sometimes cached rules can cause issues

5. **Check Firebase Console for errors**: 
   - Go to Firebase Console → Firestore Database → Rules
   - Look for any syntax errors highlighted in red

