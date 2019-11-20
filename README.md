Run Instructions. <br />

1)Download project <br />
2)Open CardcomC directory -> open file SqlQuery and run this query in your DB for create table Users <br />
3)Install Node.js and angular-cli for run client side <br />
4)Open Client folder and run "npm install" using comand line or PowerShell -> node modules installed <br />
3)Open API.sln with Visual Studio <br />
4)In web config change connection string to your DB <br />
5)Set as StartUp project "Api" and run-> browser was opened <br />
4)Copy url path for example: http://localhost:56902/ <br />
5)Go to Client/proxy.conf.json and replace your url with old url <br />
(This very important because angularjs run on port 4200 and api run on different port -> "CorsPlatform") <br />
6)Open comand line/ powershell in Client directory and run "npm start" -> project and proxy was started <br />
7)Open browser and paste  http://localhost:4200 -> project run <br />

If something is not clear please call me.