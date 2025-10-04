# Contributing to Progres

Thank you for considering contributing to **progres**! Every contribution is valuable, whether it's reporting bugs, suggesting improvements, adding features, or refining README.

## Table of Contents

1. [Getting Started](#getting-started)
2. [How to Contribute](#how-to-contribute)
3. [Code Standards](#code-standards)
4. [Pull Request Guidelines](#pull-request-guidelines)
5. [Reporting Issues](#reporting-issues)
6. [Community Guidelines](#community-guidelines)

---

## Getting Started

1. **Fork** the repository.
2. **Clone** your fork:

   ```bash
   git clone https://github.com/your-username/progres.git
   ```

3. **Install dependencies:**

   ```bash
   cd progres
   flutter pub get
   ```

4. **Run the project locally:**

   ```bash
   flutter run 
   ```

5. Create a new branch for your contribution:

   ```bash
   git checkout -b feature/your-feature
   ```

---

## How to Contribute

- **Feature Requests:** Open an issue or start a discussion to discuss the feature before implementation.
- **Bug Fixes:** Provide clear reproduction steps in your issue.
- **Documentation:** Improvements to the documentation (README) are always appreciated.

> **Note:** Pull Requests adding new features without a prior issue or discussion will **not be accepted**.

---

## Code Standards

- Use [dart analyze](https://dart.dev/tools/dart-analyze) to ensure code quality
- Format your code with `dart format`
- Write clean, readable code with proper documentation
- Maintain consistency with the existing project structure

> **Tips!** Before submitting your changes, run the following commands:

```bash
flutter analyze && dart format . && flutter test
```

---

## Pull Request Guidelines

- **Follow the [PR Template](./PULL_REQUEST_TEMPLATE.md):**
  - Description
  - Types of changes
  - Checklist
  - Further comments
  - Related Issue
- Ensure your changes pass **CI checks**.
- Keep PRs **focused** and **concise**.
- Reference related issues in your PR description.

---

## Reporting Issues

- Clearly describe the issue.
- Provide reproduction steps if applicable.
- Include screenshots or code examples if relevant.

---

## Community Guidelines

- Be respectful and constructive.
- Follow the [Code of Conduct](./CODE_OF_CONDUCT.md).
- Stay on topic in discussions.

---

Thank you for helping make **progres** better! 🚀

If you have any questions, feel free to reach out via [Discussions](https://github.com/aliakrem/progres/discussions).
