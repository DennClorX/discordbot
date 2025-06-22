# Aizyl Discord Bot

Aizyl is a multipurpose Discord bot with moderation, fun, and utility commands.  


## Features

- Moderation: Ban, kick, timeout users
- Administration: Announcements, set counting channel, set DM welcome message
- Fun: Random cat and dog images
- Utilities: Ping command

## Commands

### Moderation

- **/ban**  
  Ban a user from the server.  
  Options: `user`, `reason`

- **/kick**  
  Kick a user from the server.  
  Options: `user`, `reason`

- **/timeout**  
  Timeout a user for a specified duration.  
  Options: `user`, `reason`, `duration` (in seconds)

### Administration

- **/announce**  
  Send an announcement to a channel.  
  Subcommands:  
  - `text`: Send a plain text message  
    Options: `channel`, `message`
  - `embed`: Send an embed  
    Options: `channel`, `title`, `description`, `authorname`, `authoricon`, `thumbnail`, `footer`, `color`

- **/setcountingchannel**  
  Set the counting channel for the server.  
  Options: `channel`

- **/setdmwelcomemessage**  
  Set the DM welcome message for new members.  
  Subcommands:  
  - `text`: Plain text message  
    Options: `message`
  - `embed`: Embed message  
    Options: `title`, `authorname`, `authoricon`, `description`, `thumbnail`, `footer`, `color`

### Fun

- **/cat**  
  Get a random cat image.

- **/dog**  
  Get a random dog image.

### Utilities

- **/ping**  
  Check the bot's latency.

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Configure environment variables:**  
   Edit the `.env` file with your Discord bot token, MongoDB URL, and client ID.

3. **Start the bot:**
   ```sh
   npm start
   ```

4. **Choose boot type:**  
   On startup, select either `Bot` (to run the bot) or `Slash` (to register slash commands).

## Configuration

- Edit [`src/bot/config.json`](src/bot/config.json) to customize colors, emojis, and messages.

## Database

- The bot uses MongoDB for storing server-specific settings (see [`src/schemas/index.js`](src/schemas/index.js)).
