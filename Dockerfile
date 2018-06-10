FROM node
ENV NODE_ENV=docker
ADD ./ server
WORKDIR server
RUN yarn
CMD yarn start