FROM node:22-alpine

COPY . /app
WORKDIR /app
RUN ls -alh && du -sh .
RUN npm install --include prod && npm cache clean --force

WORKDIR /app
ENV DEBUG_COLORS=true
CMD ["npm", "run", "prod"]
