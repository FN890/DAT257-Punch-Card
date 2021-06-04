Simon Andersson - Xerxz  
Sara Arnesen - saraarnesen  
Viktor Berggren - pillezu  
Victoria Bjørnstad - victoriabjrnstad  
Rasmus Otterlind - RasmusOtterlind  
Filip Nordquist - FN890  
Gustav Wadström - gustavwww   

All documents can be found in the documents folder.

Trello board.  
https://trello.com/b/88GxVRgH/projektkurs-dat257

<h1>How to run the project</h1>
To run this project, the required softwares are: Node & npm, Postgres SQL, Java, Maven.

<h2>Run via jar file</h2>
1. Set up a user in Postgres called "booking".  </br>
2. Create a database called "booking" with password "booking".   </br>
3. Open up a terminal and cd in directory where the jar file is located (DAT257-Punch-Card/).  </br>
4. type "java -jar Booking-System-0.0.1-SNAPSHOT.jar" and press ENTER and the program will run.  </br>
5. Open up a web browser and locate to "http://localhost:8080".  </br>
6. Login with username "admin" and password "admin".  </br>
7. Done  </br>
  

<h2>Run inside an IDE</h2>  

1. Download the project and put it anywhere on your computer.
2. Open the root project folder in Intellij IDEA or any other IDEA.
3. Reload the project with maven to make sure all dependencies are installed.
4. Create a file called application.properties as ``src/main/resources/application.properties`` and paste the following content in the file.

```
spring.datasource.hikari.connectionTimeout=20000
spring.datasource.hikari.maximumPoolSize=5

## PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/booking
spring.datasource.username=booking
spring.datasource.password=booking

spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true

server.error.include-message=always

## Mail Server
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=alingsasvatten@gmail.com
spring.mail.password=hollandaisesasx2000
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

## Spring Security
spring.security.filter.order=10
punchcard.app.jwtSecret=secret
punchcard.app.jwtExpirationMs=1800000
```
Make sure edit the postgres configuration in this file to use the correct preferable database. In this configuration, the database and user is called booking, and has password booking.

```Now make sure your postgres server is set up and running before continuing on to step 5.```

5. Open a terminal and navigate to the frontend folder.
6. Type ```npm install``` to install node dependencies.
7. Run the java project. ```BookingSystemApplication.java```
8. Back in the terminal, type ``npm start`` to start the frontend react application.
9. The main browser should open by itself, if not, open it and go to ``http://localhost:3000``
10. You will be prompted to login. The login credentials are: ``Username: admin Password: admin``
