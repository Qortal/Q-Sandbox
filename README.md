# Q-Sandbox

**Q-Sandbox** is a developer-focused repository designed to help you explore and experiment with various `qortalRequests` for [Qortal](https://qortal.dev). This sandbox environment allows you to become familiar with the Qortal API, providing a practical space to test and understand its capabilities.

## 🚀 Features

- Test a wide range of `qortalRequests`.
- Experiment in a controlled environment without needing to build your own Q-App.
- Learn the Qortal API in a hands-on way.
- Build confidence and skills for developing on the Qortal ecosystem.

## 📚 Getting Started

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/JustinReact/q-sandbox.git
   cd q-sandbox
   ```

2. **Install Dependencies**:
   Ensure you have all necessary dependencies installed:

   ```bash
   npm install
   ```

3. **Run the Sandbox**:
   Start the sandbox environment:

   ```bash
   npm run dev
   ```

4. **Access the Qortal API**:
   Open the project in your preferred editor, and explore preconfigured API requests in the `src/qortalRequests` directory.

## 📖 How to Use

1. Navigate to the `App.jsx` file to find examples of different API requests.
2. Customize these requests to fit your use case or create new ones to explore the full power of the Qortal API.
3. View responses and debug in real time using the Chrome dev console or Qortal Hub console.

## 🛠 Requirements

- **Qortal Node**: A running Qortal node is required for API requests to work, unless you are using a gateway node.

## 💡 Examples

Here are a few examples of what you can do in Q-Sandbox:

1. Fetch user account details:

   ```javascript
   let account = await qortalRequest({
     action: "GET_USER_ACCOUNT",
   });
   ```

2. Join a group:

   ```javascript
   const response = await qortalRequest({
     action: "JOIN_GROUP",
     groupId: groupId,
   });
   ```

3. Send QORT coin:
   ```javascript
   const response = await qortalRequest({
     action: "SEND_COIN",
     coin: "QORT",
     destinationAddress: destinationAddress,
     amount: amount, // 1 LTC
     fee: 20, // 0.00000020 LTC per byte
   });
   ```

## 🤝 Contributing

Contributions are welcome! If you have ideas for improving the sandbox or additional `qortalRequests` you'd like to see, feel free to open an issue or submit a pull request.

## 🧾 License

This repository is open-source.
