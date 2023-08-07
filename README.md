# Notes Api

Before starting the server, you need to start the docker container with the database. To do this, open the repository folder and enter the following commands:

```console
cd db
docker build -t <image name> .
docker run -d -p 27017:27017 <image name>
```

To start server in dev mode: 
```console
npm run dev
```

# Endpoints

| Query type     | Endpoint       | Action         |
| -------------- | -------------- | -------------- |
| POST   | /notes   | Create a note object.   |
| PATCH   | /notes/:id   | Remove item.   |
| DELETE   | /notes/:id   | Edit item.   |
| GET   | /notes/:id   | Retrieve item   |
| GET   | /notes   | Get all notes.   |
| GET   | /notes   | Get aggregated data statistics.   |

