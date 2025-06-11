# Use a slim OpenJDK base image
FROM openjdk:17-jdk-slim
LABEL authors="johnny"

# Create app directory
WORKDIR /app

# Copy the packaged JAR file and .env into the image
COPY target/ssbu-league.jar app.jar
COPY .env .env

# Expose the port your app runs on
EXPOSE 8080

# Run the JAR with prod profile
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]
