#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

#Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
#For more information, please see https://aka.ms/containercompat

# FROM stefanscherer/node-windows:12-pure AS base
# WORKDIR /app
# COPY . .
# RUN yarn
# EXPOSE 80
# ENTRYPOINT ["yarn", "start"]

FROM mywrm/windows-node:16
WORKDIR /app
COPY package.json ./
RUN yarn
COPY . .
EXPOSE 3000
ENTRYPOINT cmd.exe
CMD yarn start