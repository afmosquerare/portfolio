FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY api/src/Portfolio.Api/*.csproj ./api/src/Portfolio.Api/
RUN dotnet restore "api/src/Portfolio.Api/Portfolio.Api.csproj"

COPY api/src/Portfolio.Api/ ./api/src/Portfolio.Api/
WORKDIR /app/api/src/Portfolio.Api
RUN dotnet publish -c Release -o /out
FROM mcr.microsoft.com/dotnet/aspnet:8.0-jammy AS runtime
WORKDIR /app

ENV DOTNET_gcServer=0
ENV DOTNET_Thread_UseAllCpuGroups=0

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

COPY --from=build /out .

ENTRYPOINT ["dotnet", "Portfolio.Api.dll"]
