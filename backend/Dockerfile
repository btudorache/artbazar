FROM openjdk:11

WORKDIR /app

# Copy maven executable to the image
COPY mvnw .
COPY .mvn .mvn

COPY pom.xml .

# Build all the dependencies in preparation to go offline.
# This is a separate step so the dependencies will be cached unless
# the pom.xml file has changed.
RUN ./mvnw dependency:go-offline -B

COPY src src

# Package the application
RUN ./mvnw package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/artbazar-backend.jar"]
