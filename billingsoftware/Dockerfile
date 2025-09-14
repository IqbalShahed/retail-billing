# Use official Java 21 image
FROM eclipse-temurin:21-jdk-jammy as build

# Copy Spring Boot jar from target folder
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

# Expose the port (Render will override with $PORT)
EXPOSE 8080

# Use Render's $PORT environment variable at runtime
ENTRYPOINT ["sh", "-c", "java -Dserver.port=$PORT -jar /app.jar"]
