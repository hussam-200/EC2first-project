# FROM node:18

# WORKDIR /app

# # copy package manifests first to leverage Docker cache for dependencies
# COPY package.json package-lock.json ./

# ARG NODE_ARG

# RUN if [ "${NODE_ARG}" = "production" ]; then \
# 			npm install --only = production; \
# 		else \
# 			npm install; \
# 		fi
# # copy rest of application
# COPY . .

# ## ENV PORT = 4000 to pass envairomint with docker 

# EXPOSE 4000

# # run the start script defined in package.json
# CMD ["npm","run","start-dev"]

FROM node:20 as base

FROM base as production

WORKDIR /app

# copy package manifests first to leverage Docker cache for dependencies
COPY package.json package-lock.json ./

RUN npm install --only=production
# copy rest of application
COPY . .

## ENV PORT = 4000 to pass envairomint with docker 

EXPOSE 4000

# run the start script defined in package.json
CMD ["npm","start"]

FROM base as development

WORKDIR /app

# copy package manifests first to leverage Docker cache for dependencies
COPY package.json package-lock.json ./

RUN npm install
# copy rest of application
COPY . .

## ENV PORT = 4000 to pass envairomint with docker 

EXPOSE 4000

# run the start script defined in package.json
CMD ["npm","run","start-dev"]










