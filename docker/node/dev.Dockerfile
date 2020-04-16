# ベースイメージを指定
FROM node:12-alpine

# 環境変数設定
ENV NODE_ENV="development"

# 作業ディレクトリ作成&設定
WORKDIR /scripts

COPY . .

RUN yarn

EXPOSE 3000

CMD ["yarn", "dev"]