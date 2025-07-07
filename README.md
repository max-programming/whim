# Whim - The Secret Sharing App

Whim is a simple and secure app for sharing secret messages anonymously. The messages are encrypted and are vanished after being read. No account required.

You can try it out at [whim.day](https://whim.day)

## Running it locally

### Prerequisites

- [Bun](https://bun.sh/) (for package management and running the app)
> Or Node with NPM, Yarn or PNPM is also fine

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/max-programming/whim.git
cd whim
bun install
```

### Fill in the .env file

```bash
cp .env.sample .env
```

### Run the migrations

```bash
bun run db:migrate
```
### Running the App

Start the development server:

```bash
bun run dev
```

The app will be available at `http://localhost:3000` (or your configured port).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

