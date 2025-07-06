FROM oven/bun

# set the working directory
WORKDIR /app

# copy package json and lockfile to the container
COPY package.json bun.lock ./

# install dependencies
RUN bun install

# copy the rest of the application code
COPY . .

# build the application
RUN bun run build

# run migrations and start the application
CMD ["sh", "-c", "bun run db:migrate && bun run start"]