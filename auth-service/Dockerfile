# Usa a imagem oficial do Eclipse Temurin para o Java 26
FROM eclipse-temurin:26-jdk-alpine

WORKDIR /app

# Copia o JAR do auth gerado pelo Maven
COPY target/*.jar app.jar

# Expõe a porta 8080 pedida para o Auth
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
