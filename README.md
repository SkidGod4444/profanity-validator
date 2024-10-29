# profanity-validator

![Profanity Validator](https://i.imgur.com/KCJmPOa.png) <!-- Replace with actual image path -->

A lightweight SDK for profanity filtering in forms. This library is designed to prevent bad word spam by validating user input and throwing errors if profanity is detected. Built to be flexible, it can be integrated easily into any HTML or JavaScript framework, including React, Next.js, and many more.

## Features

- **Profanity Filtering:** Automatically detects and validates user input against a predefined list of profane words.
- **Customizable:** Allows users to add their own custom profanity words to the validation.
- **Framework Agnostic:** Works seamlessly across different frameworks and libraries.
- **Error Handling:** Throws validation errors instead of replacing profanity words, preventing form submission.
- **Asynchronous Validation:** Uses an internal API [(profanity.dev)](https://www.profanity.dev/) to check for profanity, Built by [Josh](https://github.com/joschan21) .

## Installation

You can install the SDK via any nodejs package manager:

```bash
npm install profanity-validator
```

```bash
pnpm add profanity-validator
```

```bash
bun add profanity-validator
```

```bash
yarn add profanity-validator
```

## Examples 

We have mentioned few examples with preview and source code:

- **Example 1:** [ Basic Profanity Validation](https://profanity.devwtf.in/examples#basic-example) | [Source](https://github.com/SkidGod4444/profanity-validator/blob/main/www/components/custom/examples/example1.tsx)
- **Example 2:** [Profanity Validation with React Hook Form](https://profanity.devwtf.in/examples/#react-hook-form-example) | [Source](https://github.com/SkidGod4444/profanity-validator/blob/main/www/components/custom/examples/example2.tsx)
- **Example 3:** [Integrating with Zod schema validation](https://profanity.devwtf.in/examples/#zod-schema-example) | [Source](https://github.com/SkidGod4444/profanity-validator/blob/main/www/components/custom/examples/example3.tsx)
- **Example 4:** [Multiple fields and real-time validation](https://profanity.devwtf.in/examples/#real-time-validation-example) | [Source](https://github.com/SkidGod4444/profanity-validator/blob/main/www/components/custom/examples/example4.tsx)

## Change Logs

- **Change Logs:** View the [Change Log](https://github.com/SkidGod4444/profanity-validator/blob/main/CHANGELOG.md) for a detailed history of changes and updates.

## Contributing

We welcome contributions! Please feel free to submit a pull request or open an issue if you have suggestions or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/SkidGod4444/profanity-validator?tab=MIT-1-ov-file) file for details.

## Contact 

For support or inquiries, please reach out to [connect.saidev@gmail.com](https://dub.sh/saidev-twitter) or join our [discord community!](https://l.devwtf.in/discord)