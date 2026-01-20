# 🚀 CI/CD Workflows Repository

This repository contains reusable GitHub Actions workflows for automating Continuous Integration (CI) and Continuous Deployment (CD) processes across multiple projects. By centralizing workflows, we ensure consistency, maintainability, and efficiency in our development pipeline.

## 🔧 Features

- **Reusable Workflows** – Standardized CI/CD workflows that can be easily integrated into other repositories.
- **Automated Testing** – Run unit tests, integration tests, and lint checks.
- **Build & Deployment** – Automate the build and deployment process for various environments.
- **Security & Code Quality** – Integrate tools for security scanning, linting, and code analysis.
- **Flexible & Configurable** – Workflows support input parameters for customization.

## 📌 Usage

To use a workflow from this repository, reference it in your `.github/workflows` file:

```yaml
jobs:
  ci:
    uses: Mone-Inc/CI-CD/.github/workflows/typescript-ci.yml@main
    with:
      run-tests: true
```

## 📜 Workflows Available

### TypeScript/Node.js Workflows

#### `typescript-lint.yml`

Workflow reutilizável para validação de código TypeScript com ESLint e Prettier.

**Exemplo de uso:**

```yaml
name: Lint

on: [push, pull_request]

jobs:
  lint:
    uses: Mone-Inc/CI-CD/.github/workflows/typescript-lint.yml@main
    with:
      working-directory: '.'
      node-version: '20'
      auto-fix: false
      fail-on-warnings: false
      files-pattern: 'src/**/*.ts'
```

**Parâmetros:**

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `working-directory` | string | `.` | Diretório do projeto |
| `node-version` | string | `20` | Versão do Node.js |
| `auto-fix` | boolean | `false` | Corrigir automaticamente problemas |
| `fail-on-warnings` | boolean | `false` | Falhar em warnings |
| `eslint-config` | string | `eslint.config.js` | Caminho do config ESLint |
| `prettier-config` | string | `.prettierrc` | Caminho do config Prettier |
| `files-pattern` | string | `src/**/*.ts` | Padrão de arquivos para lintar |

---

#### `typescript-ci.yml`

Workflow completo de CI para projetos TypeScript/NestJS incluindo lint, type-check, build e testes.

**Exemplo de uso:**

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  ci:
    uses: Mone-Inc/CI-CD/.github/workflows/typescript-ci.yml@main
    with:
      working-directory: '.'
      node-version: '20'
      run-tests: true
      run-build: true
      fail-on-warnings: false
```

**Parâmetros:**

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `working-directory` | string | `.` | Diretório do projeto |
| `node-version` | string | `20` | Versão do Node.js |
| `run-tests` | boolean | `false` | Executar testes |
| `test-command` | string | `npm test` | Comando de teste |
| `run-build` | boolean | `true` | Executar build |
| `build-command` | string | `npm run build` | Comando de build |
| `fail-on-warnings` | boolean | `false` | Falhar em warnings de lint |
| `eslint-config` | string | `eslint.config.js` | Caminho do config ESLint |
| `prettier-config` | string | `.prettierrc` | Caminho do config Prettier |
| `files-pattern` | string | `src/**/*.ts` | Padrão de arquivos |

---

### Swift/iOS Workflows

#### `Danger.yml`

Workflow para validação de Pull Requests usando Danger e SwiftLint.

#### `Lint.yml`

Workflow para linting de código JavaScript/TypeScript com Reviewdog.

---

## 📁 Configurações Padronizadas

Este repositório também contém configurações padronizadas para ferramentas de qualidade de código em `configs/`:

- **`.prettierrc`** - Configuração padrão do Prettier para TypeScript
- **`eslint.config.js`** - Configuração base do ESLint com suporte a TypeScript

Para usar essas configurações em seus projetos, você pode:

1. Copiar os arquivos para seu projeto:
   ```bash
   cp CI-CD/configs/.prettierrc .prettierrc
   cp CI-CD/configs/eslint.config.js eslint.config.js
   ```

2. Ou usar como referência para criar suas próprias configurações.

---

## 🚀 Getting Started

### Para Projetos TypeScript/Node.js

1. **Configure o workflow no seu projeto:**

   Crie um arquivo `.github/workflows/ci.yml` no seu repositório:

   ```yaml
   name: CI

   on:
     push:
       branches: [main, develop]
     pull_request:
       branches: [main, develop]

   jobs:
     ci:
       uses: Mone-Inc/CI-CD/.github/workflows/typescript-ci.yml@main
       with:
         working-directory: '.'
         node-version: '20'
         run-tests: true
         run-build: true
   ```

2. **Instale as dependências necessárias:**

   Certifique-se de que seu `package.json` inclui:

   ```json
   {
     "devDependencies": {
       "@typescript-eslint/eslint-plugin": "^8.0.0",
       "@typescript-eslint/parser": "^8.0.0",
       "eslint": "^8.0.0",
       "eslint-config-prettier": "^9.0.0",
       "eslint-plugin-prettier": "^5.0.0",
       "eslint-plugin-unused-imports": "^4.1.4",
       "prettier": "^3.0.0"
     }
   }
   ```

3. **Monitore os workflows:**

   Acesse a aba "Actions" no seu repositório para ver os resultados dos workflows.

---

## 🧪 Testando Workflows

Para testar alterações nos workflows antes de mergear, consulte o guia [TESTING.md](TESTING.md).

---

## 📄 Licença

Este repositório é de uso interno da organização.
