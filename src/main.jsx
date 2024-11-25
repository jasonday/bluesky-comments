import React from 'react'
import ReactDOM from 'react-dom/client'
import { CommentSection } from './CommentSection'

// Create a function to initialize the comments
console.log('Initializing Bluesky comments');
const initBlueskyComments = async (elementId, author) => {
  const element = document.getElementById(elementId)
  if (element) {
    const currentUrl = window.location.href;
    const apiUrl = `https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts?q=*&url=${encodeURIComponent(currentUrl)}&author=${author}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.posts && data.posts.length > 0) {
        const post = data.posts[0];
        const formattedUri = `at://${post.author.did}/app.bsky.feed.post/${post.cid}`;

        console.log('Rendering Bluesky comments for URI:', formattedUri);
        ReactDOM.createRoot(element).render(
          <React.StrictMode>
            <CommentSection uri={formattedUri} />
          </React.StrictMode>
        )
      } else {
        console.log('No matching post found');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  }
}

export { initBlueskyComments };
