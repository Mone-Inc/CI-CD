# 🧪 Guia de Testes para Workflows

Este guia explica como testar alterações nos workflows do CI-CD antes de mergear na branch principal.

## 📋 Visão Geral

Ao desenvolver novos workflows ou fazer alterações nos existentes, é importante testar em uma branch separada antes de mergear na `develop` ou `main`. Isso evita quebrar pipelines de outros projetos que dependem desses workflows.

## 🔄 Fluxo de Teste

```
┌─────────────────────────────────────────────────────────────────┐
│                        CI-CD Repository                         │
├─────────────────────────────────────────────────────────────────┤
│  main ◄──── develop ◄──── feature/typescript-workflows          │
│                                    ▲                            │
│                                    │                            │
│                              (criar branch)                     │
└─────────────────────────────────────────────────────────────────┘
                                     │
                                     │ (apontar workflow)
                                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Projeto de Teste (mone-api)                │
├─────────────────────────────────────────────────────────────────┤
│  .github/workflows/test-ci.yml                                  │
│  uses: Mone-Inc/CI-CD/...@feature/typescript-workflows          │
└─────────────────────────────────────────────────────────────────┘
```

## 📝 Passo a Passo

### Passo 1: Criar Branch de Desenvolvimento no CI-CD

```bash
# No repositório CI-CD
git checkout develop
git pull origin develop
git checkout -b feature/typescript-workflows
```

### Passo 2: Implementar Alterações

Faça as alterações necessárias nos workflows e commit:

```bash
git add .
git commit -m "feat: add TypeScript CI workflows"
git push origin feature/typescript-workflows
```

### Passo 3: Criar Workflow de Teste no Projeto

No projeto que você quer testar (ex: `mone-api`), crie um arquivo de workflow apontando para a branch:

```yaml
# .github/workflows/test-ci.yml
name: Test CI-CD Workflows

on:
  push:
    branches: [test/ci-cd-typescript]
  pull_request:
    branches: [test/ci-cd-typescript]

jobs:
  test-ci:
    # Aponta para a branch específica do CI-CD
    uses: Mone-Inc/CI-CD/.github/workflows/typescript-ci.yml@feature/typescript-workflows
    with:
      working-directory: '.'
      node-version: '20'
      run-tests: false
      run-build: true
      fail-on-warnings: false
```

### Passo 4: Testar o Workflow

1. **Crie uma branch de teste no projeto:**
   ```bash
   # No repositório mone-api
   git checkout -b test/ci-cd-typescript
   git add .github/workflows/test-ci.yml
   git commit -m "test: add CI-CD workflow test"
   git push origin test/ci-cd-typescript
   ```

2. **Crie um Pull Request** para disparar o workflow

3. **Verifique os resultados** na aba "Actions" do GitHub

### Passo 5: Validar Resultados

Verifique se:

- ✅ ESLint executa corretamente
- ✅ Prettier valida formatação
- ✅ Type-check passa (se habilitado)
- ✅ Build completa sem erros (se habilitado)
- ✅ Testes passam (se habilitados)

### Passo 6: Mergear após Validação

Após os testes passarem:

1. **Merge no CI-CD:**
   ```bash
   # Merge feature/typescript-workflows -> develop
   git checkout develop
   git merge feature/typescript-workflows
   git push origin develop
   ```

2. **Atualizar referências no projeto:**
   
   Altere o workflow de `@feature/typescript-workflows` para `@develop` ou `@main`:
   ```yaml
   uses: Mone-Inc/CI-CD/.github/workflows/typescript-ci.yml@main
   ```

3. **Remover workflow de teste:**
   ```bash
   rm .github/workflows/test-ci.yml
   git add .
   git commit -m "chore: remove test workflow"
   git push
   ```

---

## 🔍 Testando Diferentes Cenários

### Teste com Auto-Fix

```yaml
jobs:
  lint-autofix:
    uses: Mone-Inc/CI-CD/.github/workflows/typescript-lint.yml@feature/typescript-workflows
    with:
      auto-fix: true
      working-directory: '.'
```

### Teste com Fail on Warnings

```yaml
jobs:
  lint-strict:
    uses: Mone-Inc/CI-CD/.github/workflows/typescript-lint.yml@feature/typescript-workflows
    with:
      fail-on-warnings: true
      working-directory: '.'
```

### Teste com Testes Habilitados

```yaml
jobs:
  full-ci:
    uses: Mone-Inc/CI-CD/.github/workflows/typescript-ci.yml@feature/typescript-workflows
    with:
      run-tests: true
      test-command: 'npm run test:ci'
      run-build: true
```

---

## ⚠️ Troubleshooting

### Erro: "workflow not found"

**Causa:** A branch especificada não existe ou o arquivo de workflow não está no caminho correto.

**Solução:**
1. Verifique se a branch existe no repositório CI-CD
2. Verifique se o arquivo está em `.github/workflows/`
3. Certifique-se de que a sintaxe do YAML está correta

### Erro: "permission denied"

**Causa:** O repositório CI-CD não é acessível pelo projeto.

**Solução:**
1. Verifique se ambos os repositórios são da mesma organização
2. Configure as permissões de Actions nas configurações do repositório

### Workflow não dispara

**Causa:** O trigger do workflow não corresponde ao evento.

**Solução:**
1. Verifique os triggers (`on:`) no workflow de teste
2. Certifique-se de que a branch do PR corresponde aos triggers

---

## 📚 Referências

- [GitHub Actions: Reusable Workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflows)
- [GitHub Actions: Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
