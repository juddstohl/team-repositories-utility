# team-repositories-utility

Output a table listing your teams repositories and if they are frozen.

-  run npm install
-  Tested with node 16
-  Make a copy of .env.example and name .env
-  Set the variables in the newly created .env file
-  To run the application use the following command: node src/app.js

CLI Options:  
-l (list repositories with frozen status)

| Index | RepoName  | IsFrozen |
| ----- | --------- | -------- |
| 0     | 'my-Repo' | false    |

-f (freeze repository)  
-t (thaw repository)  
-r (Single Repo, pass the index from list response)  
-a (All repositories in your .env file)
