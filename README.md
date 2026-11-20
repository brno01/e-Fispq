# e-Fispq

[![ci](https://github.com/brno01/e-Fispq/actions/workflows/ci.yml/badge.svg)](https://github.com/brno01/e-Fispq/actions/workflows/ci.yml)
[![security](https://github.com/brno01/e-Fispq/actions/workflows/security.yml/badge.svg)](https://github.com/brno01/e-Fispq/actions/workflows/security.yml)

Back-end em NestJS (TypeScript) para a FISPQ eletrônica (Ficha de Informações de Segurança de Produtos Químicos). O nome e a descrição do projeto indicam esse objetivo, mas o código atual é só o esqueleto: conexão com PostgreSQL via TypeORM, documentação Swagger e uma entidade base. Ainda não há módulos de negócio nem rotas de FISPQ.

## Estado
Projeto parado. Desenvolvido de 2023 a 2025 e sem manutenção desde então. As dependências estão desatualizadas (Nest 9, TypeScript 4.7) e têm vulnerabilidades conhecidas (`npm audit` aponta itens críticos e altos); por isso a verificação de segurança do GitHub roda em modo só relatório. Não o use em produção sem atualizar as dependências.

## Requisitos e instalação
- Node.js 18 (versão em que o build e os testes foram conferidos).
- PostgreSQL acessível, na porta 5432 (fixa no código).

```bash
npm ci
```

## Configuração
As variáveis são lidas de um arquivo YAML na pasta de onde o processo é iniciado (`src/envs.ts`): `.env.yml` se `NODE_ENV=development`, senão `.env.local.yml`. Nenhum desses arquivos está no repositório. Variáveis usadas em `src/ormconfig.ts`:

- `TYPEORM_HOST`, `TYPEORM_USERNAME`, `TYPEORM_PASSWORD`, `TYPEORM_DATABASE`: conexão com o banco.
- `TYPEORM_SYNCHRONIZE`: `true` sincroniza o esquema com as entidades.
- `TYPEORM_DROPSCHEMA`: `true` apaga o esquema ao iniciar. Cuidado.

## Uso
```bash
npm run start      # inicia a API na porta 3000
npm run :dev       # modo watch
npm run build      # compila para dist/
npm run :prod      # roda dist/main (depois do build)
```
A documentação Swagger fica em `/api` (autenticação Bearer declarada). `AppController` (`GET /`, "Hello World!") existe em `src/`, mas não está registrado no `AppModule`, então não responde.

## Testes e CI
```bash
npm ci
npm run build
npm test           # 1 teste unitário (Jest)
```
O `npm run lint` roda com `--fix` e hoje falha com 2 erros em `src/main.ts` (um `require` e um `;` faltando), por isso não está no CI. O teste e2e (`npm run test:e2e`) precisa de banco e espera uma rota que não está registrada; não foi executado.

No GitHub, todo PR e todo push na `main` rodam dois workflows:
- `ci`: instala com `npm ci`, compila e roda os testes unitários.
- `security`: segredos, dependências vulneráveis, análise estática, shellcheck e os próprios workflows. Neste repositório ele roda com `report-only`: lista os achados e abre uma issue `security-scan`, mas não reprova o job.

O `claude` é o revisor sob demanda: comente `@claude` num PR ou numa issue, ou rode o workflow à mão para uma auditoria que abre issues. Só o dono do repositório consegue acioná-lo.

## Estrutura
- `src/main.ts`: bootstrap (CORS, `ValidationPipe`, Swagger, porta 3000).
- `src/app.module.ts`, `src/ormconfig.ts`, `src/envs.ts`: módulo raiz, conexão TypeORM (PostgreSQL) e leitura das variáveis.
- `src/common/entity/base.entity.ts`: entidade base (`id` uuid, `createdAt`, `updatedAt`, `active`).
- `src/app.controller.ts`, `src/app.service.ts`: exemplo do modelo do Nest.
- `test/`: teste e2e.

## Segurança e cuidados
O histórico do git contém chaves antigas (API do Google/Firebase e um segredo de autenticação de desenvolvimento), já removidas da árvore atual. Estão registradas em `.gitleaksignore` e devem ser consideradas expostas.

## Licença
Todos os direitos reservados; veja `LICENSE`.
