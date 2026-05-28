FROM eclipse-temurin:26-jdk-alpine

WORKDIR /app

# Copia o JAR do monitoring gerado pelo Maven
COPY target/*.jar app.jar

# Expõe a porta 8081 pedida para o Monitoring
EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
