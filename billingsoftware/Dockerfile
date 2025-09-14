# ========= Stage 1: Build =========
FROM eclipse-temurin:21-jdk AS builder
WORKDIR /app

# Copy Maven wrapper & pom first
COPY mvnw ./
COPY .mvn .mvn
COPY pom.xml .

# Give execute permission to mvnw
RUN chmod +x mvnw

# Pre-download dependencies
RUN ./mvnw dependency:go-offline

# Copy the rest of the source code
COPY src ./src

# Build the jar inside the container
RUN ./mvnw clean package -DskipTests

# ========= Stage 2: Run =========
FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
