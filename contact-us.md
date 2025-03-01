(i am learning how to use appwrite for backend to receive data from website and want to make admin panel for websites like ecommerce) i want to make a admin page to get users data like name, email, mobile no. measseage, photo. help me to create this page using html+tailwind and i want to use appwrite for backend. also make a page for clinets where they can put their data.


╭─lavkush@archlinux ~/Desktop/appwrite/contact-2  
╰─➤  bun init   
bun init helps you get started with a minimal project and tries to guess sensible defaults. Press ^C anytime to quit

package name (contact-2): 
entry point (index.ts): index.js

Done! A package.json file was saved in the current directory.
 + index.js
 + .gitignore
 + jsconfig.json (for editor autocomplete)
 + README.md

To get started, run:
  bun run index.js
╭─lavkush@archlinux ~/Desktop/appwrite/contact-2  
╰─➤  ls
 bun.lock   index.js   jsconfig.json   node_modules   package.json  󰂺 README.md
╭─lavkush@archlinux ~/Desktop/appwrite/contact-2  
╰─➤  bun add appwrite dotenv express cors body-parser

bun add v1.2.0 (b0c5a765)

installed appwrite@17.0.0
installed dotenv@16.4.7
installed express@4.21.2
installed cors@2.8.5
installed body-parser@1.20.3

73 packages installed [1312.00ms]
╭─lavkush@archlinux ~/Desktop/appwrite/contact-2  
╰─➤ 


here is my .env

APPWRITE_ENDPOINT: 'http://localhost/v1',

APPWRITE_PROJECT_ID: '67a9c597d36261ee47d6',

APPWRITE_DATABASE_ID: '67a9c66387cb65848566',

APPWRITE_COLLECTION_ID: '67a9c6760d9badab01e0'

