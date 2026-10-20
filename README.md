# charla-unne

Infraestructura como código para la charla de redes de datos de la UNNE. La aplicación CDK en TypeScript crea una instancia EC2 pública con Apache y acceso HTTP.

## Requisitos

- Node.js y npm
- AWS CLI con credenciales configuradas
- AWS CDK Toolkit (`npm install -g aws-cdk`), o usar el CLI local con `npx cdk`

## Comandos

```bash
npm install
npm run build
npx cdk synth
npx cdk bootstrap
npx cdk deploy
```

El despliegue crea una VPC con una subred pública y una instancia `t3.micro`. El grupo de seguridad permite ingreso únicamente por el puerto 80; SSH no está habilitado. La instancia obtiene una IP pública y el user data instala, habilita e inicia Apache.

`cdk destroy` elimina los recursos de la pila. Pueden aplicarse cargos de AWS mientras la instancia y otros recursos estén desplegados.
