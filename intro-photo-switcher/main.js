// import {filenames} from './filenames.js'
import {chats} from './chats.js'

let MESSAGE_TIMEOUT = 2*1000;
let CHAT_TIMEOUT = 10*1000;
// let i = 0, len = filenames.length;
// let img = document.getElementById("img");

// removeAndAddNextImg();
// function removeAndAddNextImg() {
//     console.log(filenames[i]);
//     img.src = "./img/"+filenames[i];
//     i = (i+1) % len;
//     setTimeout(removeAndAddNextImg, TIMEOUT);
// }

// DOM Elements
const messagesContainer = document.getElementById('messagesContainer');

// Initial Messages Data
let activeChat = Math.floor(Math.random() * chats.length);

// Available Emojis for Reactions
const emojis = ['👍', '❤️', '😂', '😍', '😮', '😢', '👏', '🔥', '🎉', '🤔'];

// Current active emoji picker
let activeEmojiPicker = null;

// Render initial messages
renderMessages();

// Function to render all messages
function renderMessages() {
  const messages = chats[activeChat];
  messagesContainer.innerHTML = '';
  
  function addMessage(id) {
    if (id >= messages.length) {
      let newActiveChat = activeChat;
      while (newActiveChat === activeChat) {
        activeChat = Math.floor(Math.random() * chats.length);
      }
      setTimeout(renderMessages, CHAT_TIMEOUT)
      return;
    }
    const messageEl = createMessageElement(messages[id], (id === 0 || messages[id].isOutgoing !== messages[id-1].isOutgoing));
    console.log(messagesContainer)
    messagesContainer.appendChild(messageEl);
  
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    setTimeout(addMessage.bind(this, id+1), MESSAGE_TIMEOUT);
  }
  addMessage(0);
}

// Function to create a message element
function createMessageElement(message, shouldAddHeader) {
  const messageEl = document.createElement('div');
  messageEl.className = `message ${message.isOutgoing ? 'outgoing' : ''}`;
  messageEl.dataset.id = message.id;
  
  // Avatar
  const avatarEl = document.createElement('div');
  avatarEl.className = 'avatar';
  
  const avatarImg = document.createElement('img');
  let name = ""
  if (message.isOutgoing) {
    name = 'glasses';
  }
  else {
    name = 'curly';
  }
  avatarImg.src = `./avatars/${name}.jpg`;
  avatarEl.appendChild(avatarImg);
  
  // Message content container
  const contentEl = document.createElement('div');
  contentEl.className = 'message-content';
  
  // Message header (sender)
  if (shouldAddHeader) {
    const headerEl = document.createElement('div');
    headerEl.className = 'message-header';
    headerEl.textContent = name;
    contentEl.appendChild(headerEl);
  }
  
  // Message bubble
  const bubbleEl = document.createElement('div');
  bubbleEl.className = 'message-bubble';
  
  if (message.type === 'image') {
    const imgEl = document.createElement('img');
    imgEl.className = 'message-image';
    imgEl.src = message.content;
    imgEl.alt = 'Shared image';
    bubbleEl.appendChild(imgEl);
    
    if (message.caption) {
      const captionEl = document.createElement('div');
      captionEl.textContent = message.caption;
      bubbleEl.appendChild(captionEl);
    }
  } else {
    bubbleEl.textContent = message.content;
  }
  
  contentEl.appendChild(bubbleEl);
  
  // Reactions
  if (message.reactions && message.reactions.length > 0) {
    const reactionsEl = document.createElement('div');
    reactionsEl.className = 'reactions';
    
    const pillsEl = document.createElement('div');
    pillsEl.className = 'reaction-pills';
    
    message.reactions.forEach(emoji => {
      const emojiEl = document.createElement('span');
      emojiEl.textContent = emoji;
      pillsEl.appendChild(emojiEl);
    });
    
    reactionsEl.appendChild(pillsEl);
    contentEl.appendChild(reactionsEl);
  }
  
  // // Add reaction button
  // const reactionBtnEl = document.createElement('button');
  // reactionBtnEl.className = 'reaction-action';
  // reactionBtnEl.textContent = 'Add reaction';
  // reactionBtnEl.addEventListener('click', function(e) {
  //   e.stopPropagation();
    
  //   // Remove any existing emoji picker
  //   if (activeEmojiPicker) {
  //     activeEmojiPicker.remove();
  //     activeEmojiPicker = null;
  //   }
    
  //   // Create emoji picker
  //   const emojiPickerEl = document.createElement('div');
  //   emojiPickerEl.className = 'emoji-picker';
    
  //   // Position the emoji picker
  //   const rect = reactionBtnEl.getBoundingClientRect();
  //   emojiPickerEl.style.position = 'absolute';
    
  //   if (message.isOutgoing) {
  //     emojiPickerEl.style.right = `${window.innerWidth - rect.right}px`;
  //   } else {
  //     emojiPickerEl.style.left = `${rect.left}px`;
  //   }
    
  //   emojiPickerEl.style.top = `${rect.bottom}px`;
    
  //   // Add emoji buttons
  //   emojis.forEach(emoji => {
  //     const emojiBtn = document.createElement('button');
  //     emojiBtn.className = 'emoji-btn';
  //     emojiBtn.textContent = emoji;
  //     emojiBtn.addEventListener('click', function() {
  //       addReaction(message.id, emoji);
  //       emojiPickerEl.remove();
  //       activeEmojiPicker = null;
  //     });
  //     emojiPickerEl.appendChild(emojiBtn);
  //   });
    
  //   document.body.appendChild(emojiPickerEl);
  //   activeEmojiPicker = emojiPickerEl;
  // });
  
  // contentEl.appendChild(reactionBtnEl);
  
  // Append all elements to the message container
  messageEl.appendChild(avatarEl);
  messageEl.appendChild(contentEl);
  
  return messageEl;
}